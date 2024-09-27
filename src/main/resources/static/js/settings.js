/** @format */

// Get the download option from local storage, or set it to 'sameWindow' if it doesn't exist
var downloadOption = localStorage.getItem('downloadOption') || 'sameWindow'

// Set the selected option in the dropdown
document.getElementById('downloadOption').value = downloadOption

// Save the selected option to local storage when the dropdown value changes
document.getElementById('downloadOption').addEventListener('change', function () {
	downloadOption = this.value
	localStorage.setItem('downloadOption', downloadOption)
})

// Get the zipThreshold value from local storage, or set it to 0 if it doesn't exist
var zipThreshold = parseInt(localStorage.getItem('zipThreshold'), 10) || 4

// Set the value of the slider and the display span
document.getElementById('zipThreshold').value = zipThreshold
document.getElementById('zipThresholdValue').textContent = zipThreshold

// Save the selected value to local storage when the slider value changes
document.getElementById('zipThreshold').addEventListener('input', function () {
	zipThreshold = this.value
	document.getElementById('zipThresholdValue').textContent = zipThreshold
	localStorage.setItem('zipThreshold', zipThreshold)
})

var boredWaiting = localStorage.getItem('boredWaiting') || 'disabled'
document.getElementById('boredWaiting').checked = boredWaiting === 'enabled'

document.getElementById('boredWaiting').addEventListener('change', function () {
	boredWaiting = this.checked ? 'enabled' : 'disabled'
	localStorage.setItem('boredWaiting', boredWaiting)
})

var cacheInputs = localStorage.getItem('cacheInputs') || 'disabled'
document.getElementById('cacheInputs').checked = cacheInputs === 'enabled'

document.getElementById('cacheInputs').addEventListener('change', function () {
	cacheInputs = this.checked ? 'enabled' : 'disabled'
	localStorage.setItem('cacheInputs', cacheInputs)
})

window.addEventListener('message', event => {
	if (
		['http://localhost:3001', 'http://localhost:3000', 'https://www.my-pdf-tools.com'].includes(
			event.origin
		)
	) {
		const { user: userData, token, deviceId, baseUrl } = event.data
		// 处理接收到的用户数据
		console.log('Received user data:', userData)
		console.log('%c [  ]-55', 'font-size:13px; background:pink; color:#bf2c9f;', event.data)
		localStorage.setItem('user', JSON.stringify(userData))
		localStorage.setItem('token', token)
		localStorage.setItem('deviceId', deviceId)
		localStorage.setItem('baseUrl', baseUrl)
	}
})

function serialize(params) {
	const urlParams = new URLSearchParams()
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			urlParams.append(key, params[key])
		}
	}
	return urlParams.toString()
}
window.serialize = serialize

async function consumeCredits() {
	const user = localStorage.getItem('user')
	if (!user || user === 'null') {
		window.parent.postMessage('/pricing', '*') // 发送消息到父窗口
		return false
	} else {
		try {
			const baseHeaders = new Headers()
			baseHeaders.append('Accept-Language', 'en')
			baseHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
			baseHeaders.append('X-Request-With', 'XMLHttpRequest')
			const token = localStorage.getItem('token')
			const uuid = localStorage.getItem('deviceId')
			const baseUrl = localStorage.getItem('baseUrl')
			baseHeaders.append('x-device-id', uuid)
			baseHeaders.append('Authorization', token)
			const res = await fetch(baseUrl + '/users/me/equities' + '?locale=en', {
				method: 'POST',
				mode: 'cors', // 设置为 CORS 模式
				headers: baseHeaders,
				body: serialize({
					locale: 'en',
					bizType: 'editor',
				}),
			}).then(res => res.json())
			if (res.errorCode === 302) {
				window.parent.postMessage('/pricing', '*') // 发送消息到父窗口
				return false
			}
		} catch (error) {
			alert(error)
			return false
		}
	}
	return true
}
window.consumeCredits = consumeCredits
