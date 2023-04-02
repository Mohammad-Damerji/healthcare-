clean-backend:
	rm -rf backend/app/app/__pycache__
	# rm -rf backend/app/user_managment/migrations/__pycache__
	rm -rf backend/app/user_managment/__pycache__

clean-frontend:
	rm -rf frontend/node_modules

clean: clean-backend clean-frontend

serve:
	cd frontend && ng serve

.PHONY: backend

backend:
	cd backend && pip3 install -r requirements.txt
	cd backend/app && python3 manage.py makemigrations
	cd backend/app && python3 manage.py migrate
	cd backend/app && python3 manage.py runserver
