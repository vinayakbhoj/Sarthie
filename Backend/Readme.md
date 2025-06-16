# User Registration Endpoint Documentation


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