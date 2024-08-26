
#!/usr/bin/env fish

# 定义本地和远程路径
set LOCAL_PATH "./src/main/resources"
set REMOTE_PATH "/root/.git/Stirling-PDF/src/main/resources"
set REMOTE_HOST "root@45.117.97.148"

# 执行 rsync 命令
rsync -avz $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH

echo "同步完成!"
