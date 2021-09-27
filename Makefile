#!/usr/bin/env/make
IMAGE_NAME == Counterparty-RSK-Bridge

PHONY: build run shell delete

all: build run

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -tid --name $(IMAGE_NAME) -p8080:8080 -v $(pwd):/opt/local $(IMAGE_NAME)

shell:
	docker exec -ti $(IMAGE_NAME) bash

delete:
	docker rm -f $(IMAGE_NAME)