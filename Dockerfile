# 使用Node.js官方提供的基础镜像
FROM node:14 AS build-stage
# 在容器中创建一个目录来存放应用代码
WORKDIR /app
# 安装应用依赖
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
# 复制应用源代码到容器中
COPY . .
# 构建应用
RUN npm run build
# 使用Nginx官方提供的基础镜像
FROM nginx:stable-alpine as production-stage
# 从构建阶段复制构建结果到Nginx的服务目录
COPY --from=build-stage /app/build /usr/share/nginx/html
# 为应用服务指定运行的端口
EXPOSE 80
# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]