
#!/usr/bin/env fish

# 定义本地和远程路径
set LOCAL_PATH "./src/main/resources"
set REMOTE_PATH "/root/.git/Stirling-PDF/src/main"
set REMOTE_HOST "root@165.22.246.78"

# 执行 rsync 命令
rsync -avzP --delete $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH

echo "同步完成!"
