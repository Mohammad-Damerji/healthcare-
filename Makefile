clean-backend:
	rm -rf backend/app/app/__pycache__
	# rm -rf backend/app/user_managment/migrations/__pycache__
	rm -rf backend/app/user_managment/__pycache__

clean-frontend:
	rm -rf frontend/node_modules

clean: clean-backend clean-frontend

serve:
	cd frontend && ng serve