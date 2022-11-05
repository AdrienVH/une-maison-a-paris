.PHONY: clean watch start

clean:
		docker-compose down --remove-orphans
		docker image prune -f
		docker volume prune -f

watch:
		docker-compose up --build

start:
		docker-compose up --build -d