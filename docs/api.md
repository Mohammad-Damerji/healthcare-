# Health Care Application API documentation

## Login
`POST /api/auth/login`
**Auth: no**
```ts
{
    username: string,
    password: string
}
```

Response
```ts
{
    success: boolean,
    message: string
}
```


## Sign up
`POST /api/auth/signup`
**Auth: no**
```ts
{
    username: string,
    password: string,
    phone_number: string
}
```

Response
```ts
{
    success: boolean,
    message: string
}
```


## Get users
`GET api/users/list`
**Auth: basic**
**NO BODY**

Response:
```ts
{
    success: false,
    data: string
} 
|
{
    success: true
    data: [{username: string}]
}
```

## Send disease features

`POST api/health/predict`
**Auth: basic**
```ts
{
   gender: "male" | "female"
}
```

Response:
```ts
{
    success: boolean
} 
```