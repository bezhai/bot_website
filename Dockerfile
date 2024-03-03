# Dockerfile
# 使用Node.js官方提供的基础镜像
FROM node:14
# 在容器中创建一个目录来存放应用代码
WORKDIR /usr/src/app
# 安装应用依赖
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
# 复制应用源代码到容器中
COPY . .
# 为应用服务指定运行的端口
EXPOSE 3000
# 定义容器启动时运行的命令
CMD ["npm", "start"]