clean-backend:
	rm -rf backend/app/app/__pycache__
	rm -rf backend/app/user_managment/migrations/__pycache__
	rm -rf backend/app/user_managment/__pycache__

clean-frontend:
	rm -rf frontend/node_modules
	rm -rf frontend/.angular

clean: clean-backend clean-frontend

serve:
	cd frontend && npm install
	cd frontend && npm run ng serve

.PHONY: backend

backend:
	cd backend && pip3 install -r requirements.txt
	cd backend/app && python manage.py makemigrations
	cd backend/app && python manage.py migrate
	cd backend/app && python manage.py runserver

conn-check:
	nc -z localhost 8000
	nc -z localhost 4200
