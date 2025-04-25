# NodeDrive API Documentation

This API provides a set of endpoints to manage user authentication and file upload functionality.

## Base URL

[http://localhost:5000/api/v1](http://localhost:5000/api/v1)

## Endpoints Overview

1. **GET /** - Index
2. **POST /user/register** - Register a new user
3. **POST /user/login** - User login
4. **POST /upload** - Upload a file
5. **GET /upload** - Get uploaded files
6. **DELETE /upload** - Delete uploaded files
7. **POST /user/logout** - Logout the user

---

## Test Results Overview

**Test Summary:**

- Total Tests Run: 7
- Total Passed: 7
- Total Failed: 0
- Total Time Taken: 4582ms

### Test Details:

#### 1. **Index Endpoint**

- **URL**: `/`
- **Method**: `GET`
- **Response Code**: `200 OK`
- **Time Taken**: `104ms`
- **Test Results**:
  - No specific tests defined.

#### 2. **Register Endpoint**

- **URL**: `/user/register`
- **Method**: `POST`
- **Response Code**: `201 Created`
- **Time Taken**: `338ms`
- **Tests**:
  - **Success field in the response is true**: Passed
  - **User is registered successfully**: Passed

#### 3. **Login Endpoint**

- **URL**: `/user/login`
- **Method**: `POST`
- **Response Code**: `200 OK`
- **Time Taken**: `182ms`
- **Tests**:
  - **Response status code is 200**: Passed
  - **User is login successfully**: Passed

#### 4. **Upload File Endpoint**

- **URL**: `/upload`
- **Method**: `POST`
- **Response Code**: `201 Created`
- **Time Taken**: `3300ms`
- **Tests**:
  - **Response has the required fields - success, message, and data**: Passed
  - **File uploaded successfully**: Passed

#### 5. **Get Files Endpoint**

- **URL**: `/upload`
- **Method**: `GET`
- **Response Code**: `200 OK`
- **Time Taken**: `94ms`
- **Tests**:
  - **Response Content-Type is application/json**: Passed
  - **Response body has 'success' field as true**: Passed
  - **Response body has 'data' field as an array**: Passed
  - **Each object in the 'data' array has required fields**: Passed

#### 6. **Delete Files Endpoint**

- **URL**: `/upload`
- **Method**: `DELETE`
- **Response Code**: `200 OK`
- **Time Taken**: `558ms`
- **Tests**:
  - **Response status code is 200**: Passed
  - **Files deleted successfully message is received**: Passed

#### 7. **Logout Endpoint**

- **URL**: `/user/logout`
- **Method**: `POST`
- **Response Code**: `200 OK`
- **Time Taken**: `6ms`
- **Tests**:
  - **Response status code is 200**: Passed
  - **User is logout successfully**: Passed

---

## Authentication

This API requires no authentication for basic operations like registration, login, and file uploads.

---

## Response Format

### Successful Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [ ... ]
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```
