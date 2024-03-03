IMAGE_NAME=registry-vpc.cn-hongkong.aliyuncs.com/chiwei/front-end
IMAGE_TAG=v1.0.1
CONTAINER_NAME=front-end-container
HOST_PORT=3000
CONTAINER_PORT=3000

default: run

# 拉取 Docker 镜像
pull:
	docker pull $(IMAGE_NAME):$(IMAGE_TAG)

# 运行 Docker 容器
run: pull
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker run -d --name $(CONTAINER_NAME) -p $(HOST_PORT):$(CONTAINER_PORT) -v /usr/src/app/node_modules $(IMAGE_NAME):$(IMAGE_TAG)

# 停止并移除 Docker 容器
clean:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# 停止、移除容器并移除镜像
distclean: clean
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG)

# 防止 Makefile 冲突
.PHONY: default pull run clean distclean