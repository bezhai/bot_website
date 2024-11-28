# 定义变量
APP_NAME = chiwei-web
DOCKER_IMAGE = $(APP_NAME)-image
DOCKER_CONTAINER = $(APP_NAME)-container
DOCKERFILE = Dockerfile
PORT = 80

# 默认目标
.PHONY: all
all: build run

# 构建 Docker 镜像
.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE) -f $(DOCKERFILE) .

# 启动 Docker 容器
.PHONY: run
run:
	docker run --name $(DOCKER_CONTAINER) -p $(PORT):80 -d $(DOCKER_IMAGE)

# 停止并删除容器
.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER) || true
	docker rm $(DOCKER_CONTAINER) || true

# 清理 Docker 镜像和容器
.PHONY: clean
clean: stop
	docker rmi $(DOCKER_IMAGE) || true

# 查看容器日志
.PHONY: logs
logs:
	docker logs -f $(DOCKER_CONTAINER)

# 重新启动（清理并重新运行）
.PHONY: restart
restart: clean build run