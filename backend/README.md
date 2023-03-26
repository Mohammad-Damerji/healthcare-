#Installation

Install requirements

```commandline
pip install -r requirements.txt
```

Make migrations

```commandline
cd app
python manage.py makemigrations
python manage.py migrate
```

Crate a superuser
```commandline
python manage.py createsuperuser
```

Run server

```commandline
python manage.py runserver
```