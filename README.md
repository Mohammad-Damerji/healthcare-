# Healthcare

## Install & Run in Developement

In order to run the application you need to have two terminal windows open,
one for the backend, on for the frontend.

This is completly fine due to the system's design. It allows that the a stronger
more secure server should serve the backend and the model, while a more light-weight
server can serve the frontend.

To install and start the backend:
```
make backend
```

To install and start the frontend:
```
make frontend
```
Now you can navigate to: `localhost:4200` you can check that you're running both servers
with `make conn-check`, for this you will need `netcat`