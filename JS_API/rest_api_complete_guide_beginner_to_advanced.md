# REST API — Complete Guide (Beginner to Advanced)

## 1. Introduction

A **REST API** (Representational State Transfer API) is a way for different software systems to communicate over the internet using HTTP.

It allows a client (frontend, mobile app) to talk to a server (backend) and exchange data.

---

## 2. What is an API?

API stands for:

```
Application Programming Interface
```

It is a bridge between two systems.

Example:
- Frontend (React)
- Backend (Node.js / Django)

They communicate using APIs.

---

## 3. What is REST?

REST is a set of rules for designing APIs.

A REST API uses HTTP methods like:

- GET → Read data
- POST → Create data
- PUT → Update data
- DELETE → Remove data

---

## 4. REST API Principles

A good REST API follows these rules:

### 1. Stateless
Each request is independent.
Server does not remember previous requests.

### 2. Client-Server Architecture
Frontend and backend are separate.

### 3. Uniform Interface
Same structure for all endpoints.

### 4. Resource-Based
Everything is treated as a resource:

Example:
```
/users
/posts
/products
```

---

## 5. What is an Endpoint?

An endpoint is a URL where API is accessed.

Example:
```
https://api.example.com/users
```

---

## 6. HTTP Methods (CRUD)

| Method | Meaning | Action |
|------|--------|--------|
| GET | Read | Get data |
| POST | Create | Add new data |
| PUT | Update | Replace data |
| PATCH | Update | Partial update |
| DELETE | Delete | Remove data |

---

## 7. JSON Data

Most APIs send data in JSON format.

Example:
```json
{
  "id": 1,
  "name": "Ayan",
  "email": "ayan@example.com"
}
```

---

## 8. Example API (Testing)

We use fake APIs for learning:

entity["software","JSONPlaceholder","free fake REST API for testing"]

Example endpoint:
```
https://jsonplaceholder.typicode.com/users
```

---

## 9. Fetch API Example

### GET Request
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
```

### Async/Await Version
```js
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json()
  console.log(data)
}
```

---

## 10. POST Request (Create Data)

```js
async function createUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Ayan",
      email: "ayan@example.com"
    })
  })

  const data = await res.json()
  console.log(data)
}
```

---

## 11. DELETE Request

```js
async function deleteUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    method: "DELETE"
  })

  console.log(res.status)
}
```

---

## 12. PUT / PATCH Request

### PUT (Replace full data)
```js
async function updateUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Updated Name"
    })
  })

  const data = await res.json()
  console.log(data)
}
```

---

## 13. Status Codes

| Code | Meaning |
|------|--------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## 14. Headers

Headers send extra information:

Example:
```
Content-Type: application/json
Authorization: Bearer TOKEN
```

---

## 15. API Key vs Token

### API Key
- Simple key
- Used to access API

### Token (JWT)
- More secure
- Used after login

---

## 16. Authentication

Used to verify user identity.

Types:
- API Key Auth
- JWT Auth
- OAuth

---

## 17. Error Handling

```js
try {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("API Error")
  }
  const data = await res.json()
} catch (error) {
  console.log(error)
}
```

---

## 18. Pagination

Used when data is large:

```
/users?page=1&limit=10
```

---

## 19. Rate Limiting

Prevents too many requests.

Example:
- 100 requests per minute

---

## 20. Caching

Stores responses to improve speed.

---

## 21. Idempotency

Same request → same result

Example:
- DELETE is idempotent

---

## 22. CORS

Cross-Origin Resource Sharing

Allows frontend to call backend from different domain.

---

## 23. Advanced Concepts

- Microservices APIs
- GraphQL (alternative to REST)
- WebSockets (real-time APIs)

---

## 24. REST vs GraphQL

| REST | GraphQL |
|------|--------|
| Multiple endpoints | Single endpoint |
| Fixed data | Flexible data |

---

## 25. Summary

A REST API is:

- A way to communicate between client and server
- Based on HTTP methods
- Uses JSON for data