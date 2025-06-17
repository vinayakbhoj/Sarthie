# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires a JSON payload with user details. On success, returns the created user (excluding password) and a JWT authentication token.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",      // Required, at least 2 characters
    "lastname": "Doe"         // Optional, if provided at least 2 characters
  },
  "email": "john@example.com", // Required, must be a valid email
  "password": "secret123"      // Required, at least 6 characters
}
```

## Status Codes

- **201 Created**: User registered successfully. Returns user data and token.
- **400 Bad Request**: Validation failed. Returns an array of error messages.

## Example Request

```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

## Example Success Response

```json
{
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  },
  "token": "JWT_TOKEN"
}
```

## Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name at least 2 character required",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## 2. Login User

### Endpoint

`POST /users/login`

### Description

Authenticates a user with email and password. Returns user data (excluding password) and a JWT authentication token if credentials are valid.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john@example.com",   // Required, must be a valid email
  "password": "secret123"        // Required, at least 6 characters
}
```

### Status Codes

- **200 OK**: Login successful. Returns user data and token.
- **400 Bad Request**: Validation failed. Returns an array of error messages.
- **401 Unauthorized**: Invalid email or password.

### Example Request

```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Example Success Response

```json
{
  "user": {
    "_id": "userObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  },
  "token": "JWT_TOKEN"
}
```

### Example Error Response (Validation)

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Example Error Response (Invalid Credentials)

```json
{
  "message": "Invalid email or password"
}
```

---