# CryptoBank API Reference

## Introduction

The CryptoBank API provides a set of endpoints for interacting with the CryptoBank decentralized banking platform. This documentation outlines the available API endpoints, their functionalities, and how to use them.

## Base URL

All API requests are made to the following base URL:

```
https://api.cryptobank.io/v1
```

## Authentication

Most API endpoints require authentication. You can obtain an API key by registering on the CryptoBank platform. Include the API key in the request headers as follows:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### 1. User Registration

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Description**: Registers a new user on the CryptoBank platform.

#### Request

```http
POST /users/register
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

#### Body

```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Response

```json
{
  "message": "User  registered successfully.",
  "userId": "123456"
}
```

### 2. User Login

- **Endpoint**: `/users/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns an access token.

#### Request

```http
POST /users/login
Content-Type: application/json
```

#### Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Response

```json
{
  "token": "YOUR_ACCESS_TOKEN",
  "userId": "123456"
}
```

### 3. Create Savings Account

- **Endpoint**: `/accounts/savings`
- **Method**: `POST`
- **Description**: Creates a new savings account for the authenticated user.

#### Request

```http
POST /accounts/savings
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

#### Body

```json
{
  "initialDeposit": 1000
}
```

#### Response

```json
{
  "message": "Savings account created successfully.",
  "accountId": "789012"
}
```

### 4. Deposit to Savings Account

- **Endpoint**: `/accounts/savings/{accountId}/deposit`
- **Method**: `POST`
- **Description**: Deposits funds into a specified savings account.

#### Request

```http
POST /accounts/savings/{accountId}/deposit
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

#### Body

```json
{
  "amount": 500
}
```

#### Response

```json
{
  "message": "Deposit successful.",
  "newBalance": 1500
}
```

### 5. Apply for Loan

- **Endpoint**: `/loans/apply`
- **Method**: `POST`
- **Description**: Submits a loan application for the authenticated user.

#### Request

```http
POST /loans/apply
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

#### Body

```json
{
  "amount": 5000,
  "term": 12,
  "purpose": "Home Renovation"
}
```

#### Response

```json
{
  "message": "Loan application submitted successfully.",
  "applicationId": "345678"
}
```

### 6. Get Account Balance

- **Endpoint**: `/accounts/savings/{accountId}/balance`
- **Method**: `GET`
- **Description**: Retrieves the balance of a specified savings account.

#### Request

```http
GET /accounts/savings/{accountId}/balance
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### Response

```json
{
  "accountId": "789012",
  "balance": 1500
}
```

### 7. Get Loan Status

- **Endpoint**: `/loans/{applicationId}/status`
- **Method**: `GET`
- **Description**: Retrieves the status of a specified loan application.

#### Request

```http
GET /loans/{applicationId}/status
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### Response

```json
{
  "applicationId": "345678",
  "status": "Approved",
  "amount": 5000,
  "term": 12
}
```

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. Common error responses include:

- **400 Bad Request**: The request was invalid or malformed.
- **401 Unauthorized**: Authentication failed or API key is missing.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

## Rate Limiting

To ensure fair usage of the API, rate limits are enforced. Each API key is limited to a certain number of requests per minute. Exceeding this limit will result in a `429 Too Many Requests` response.

## Conclusion

This API reference provides a comprehensive guide to interacting with the CryptoBank platform. For further assistance or to report issues, please contact the CryptoBank support team or visit the [CryptoBank Community Forum](https://forum.cryptobank.io).
