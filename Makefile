#!/usr/bin/env/make
IMAGE_NAME := counterparty-rsk-bridge

# PHONY: build run shell delete

all: build run logs

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker rm -f $(IMAGE_NAME) ||exit 0 && docker run -tid --name $(IMAGE_NAME) -p8080:8080 -v $(pwd):/opt/local $(IMAGE_NAME)

logs:
	docker logs -f  $(IMAGE_NAME)

shell:
	docker exec -ti $(IMAGE_NAME) bash

delete:
	docker rm -f $(IMAGE_NAME)