all: run

run: watch-client runserver

runserver:
	python manage.py runserver

watch-client:
	npm run watch &

build: requirements collectstatic migrate

requirements:
	pip install -r requirements.txt

collectstatic:
	python manage.py collectstatic

migrate:
	python manage.py migrate

makemigrations:
	python manage.py makemigrations

shell:
	python manage.py shell