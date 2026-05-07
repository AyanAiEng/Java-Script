# API vs API Key — Beginner Explanation

## Your Question

```js
fetch("https://jsonplaceholder.typicode.com/users")
```

You asked:

> “This is a URL but we are teaching it as an API key. What is the problem?”

The answer is:

That is **NOT an API key**.

It is an **API endpoint URL**.

---

# What This Code Means

```js
fetch("https://jsonplaceholder.typicode.com/users")
```

Here:

| Part | Meaning |
|---|---|
| `fetch()` | JavaScript function used to send a request |
| `https://jsonplaceholder.typicode.com/users` | API endpoint URL |

---

# What is an API?

API stands for:

```text
Application Programming Interface
```

An API is a system/server that provides data or services.

Example:

```text
https://jsonplaceholder.typicode.com/users
```

This API returns fake users data.

---

# What is an API Endpoint?

An endpoint is a specific URL inside an API.

Example:

```text
https://jsonplaceholder.typicode.com/users
```

- `jsonplaceholder.typicode.com` → API server
- `/users` → specific endpoint

This endpoint gives user data.

---

# What is an API Key?

An API key is like a password or identity card.

It tells the server:

> “I am allowed to use this API.”

Example:

```js
fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=MY_API_KEY")
```

Here:

```text
appid=MY_API_KEY
```

is the API key.

---

# Why JSONPlaceholder Does NOT Need an API Key

JSONPlaceholder is a fake API made only for:

- learning
- testing
- practice

So it does not require:

- login
- authentication
- billing
- API key

Official website:

https://jsonplaceholder.typicode.com/

---

# Real APIs Usually Require API Keys

Examples:

- OpenAI API
- Weather APIs
- Google Maps APIs
- Stripe APIs

These often require:

- account creation
- authentication
- API keys
- rate limits
- billing

---

# Simple Real-World Analogy

| Technical Thing | Real-World Example |
|---|---|
| API | Restaurant |
| Endpoint | Food counter |
| API key | Membership card |
| fetch() | Asking for food/data |

---

# Complete Flow of fetch()

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
```

## Step-by-Step Flow

### Step 1

JavaScript sends a request to the server.

### Step 2

The server receives the request.

### Step 3

The server sends JSON data.

### Step 4

`.then()` handles the response.

### Step 5

`response.json()` converts JSON into a JavaScript object.

### Step 6

`console.log(data)` prints the final data.

---

# Important Beginner Confusion

Many beginners think:

```js
"https://something.com"
```

means API key.

But:

- URL ≠ API key
- Endpoint ≠ API key

An API key is usually:

- secret
- random-looking
- long text string

Examples:

```text
sk-abc123...
AIzaSy...
hf_xxx...
```

Those are real API keys/tokens.

---

# Final Conclusion

```js
fetch("https://jsonplaceholder.typicode.com/users")
```

contains:

- a URL
- an API endpoint
- NOT an API key

Your teacher most likely meant:

> “We are calling an API”

not:

> “This is an API key”

