# Promises — The Complete Guide

---

## 1. What Is a Promise?

A **Promise** is an object that represents the **eventual result** of an asynchronous operation. It's a placeholder for a value that doesn't exist yet but will exist in the future — or will fail trying.

Think of it like ordering food at a restaurant:
- You place the order → the promise is **created**
- You wait → the promise is **pending**
- Food arrives → the promise is **fulfilled**
- Kitchen runs out of ingredients → the promise is **rejected**

```js
const promise = new Promise(function(resolve, reject) {
  // do something async...
  const success = true;

  if (success) {
    resolve("Here is your result!"); // fulfilled
  } else {
    reject(new Error("Something went wrong")); // rejected
  }
});
```

---

## 2. Why Do Promises Exist?

Before Promises, JavaScript relied entirely on callbacks for async work. That led to:

- **Callback hell** — deeply nested, unreadable code
- **Inversion of control** — you had to *trust* third-party code to call your callback correctly
- **No standard error handling** — every library had its own error convention
- **No way to chain** sequential steps cleanly

Promises were introduced in **ES6 (2015)** to solve all of this with a unified, chainable, predictable interface.

---

## 3. The Three States of a Promise

A Promise is always in **exactly one** of these states:

| State | Meaning | Can it change? |
|-------|---------|----------------|
| `pending` | Operation has not completed yet | Yes → to fulfilled or rejected |
| `fulfilled` | Operation completed successfully | No — final |
| `rejected` | Operation failed | No — final |

Once a promise moves from `pending` to either `fulfilled` or `rejected`, it is **settled** and its state never changes again.

```
         resolve(value)
pending ────────────────► fulfilled
   │
   └── reject(error) ───► rejected
```

---

## 4. Creating a Promise

```js
const myPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    const randomNum = Math.random();

    if (randomNum > 0.5) {
      resolve(randomNum); // success
    } else {
      reject(new Error("Number too small: " + randomNum)); // failure
    }
  }, 1000);
});
```

The function passed to `new Promise()` is called the **executor**. It runs immediately and synchronously. `resolve` and `reject` are functions provided by JavaScript — you call exactly one of them.

---

## 5. Consuming a Promise: `.then()`, `.catch()`, `.finally()`

### `.then(onFulfilled, onRejected)`
Runs when the promise **succeeds**.

```js
myPromise.then(function(value) {
  console.log("Success:", value);
});
```

### `.catch(onRejected)`
Runs when the promise **fails**.

```js
myPromise.catch(function(error) {
  console.error("Failed:", error.message);
});
```

### `.finally(onSettled)`
Runs when the promise **settles** (either way — success or failure). Perfect for cleanup.

```js
myPromise.finally(function() {
  hideLoadingSpinner(); // always runs
});
```

### Combined — The Full Pattern

```js
fetchUserData(userId)
  .then(function(user) {
    console.log("Got user:", user.name);
    return user;
  })
  .catch(function(err) {
    console.error("Error:", err.message);
  })
  .finally(function() {
    setLoading(false); // always hide the spinner
  });
```

---

## 6. Promise Chaining — The Killer Feature

The biggest advantage of Promises over callbacks is **chaining**. `.then()` always returns a new Promise, so you can chain sequential async steps in a flat, top-to-bottom manner.

### Callback Hell (Before)
```js
getUser(id, function(err, user) {
  getPosts(user.id, function(err, posts) {
    getComments(posts[0].id, function(err, comments) {
      getLikes(comments[0].id, function(err, likes) {
        console.log(likes); // 4 levels deep
      });
    });
  });
});
```

### Promise Chain (After)
```js
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => getLikes(comments[0].id))
  .then(likes => console.log(likes))
  .catch(err => console.error(err));
// Flat. Linear. Beautiful.
```

### How Chaining Works

Each `.then()` can:
1. Return a **plain value** → next `.then()` receives it directly
2. Return a **new Promise** → next `.then()` waits for it to resolve
3. **Throw an error** → jumps to the nearest `.catch()`

```js
Promise.resolve(1)
  .then(val => val + 1)         // returns 2 (plain value)
  .then(val => val * 10)        // returns 20
  .then(val => {
    if (val > 10) throw new Error("Too big!");
    return val;
  })
  .catch(err => console.error(err.message)); // "Too big!"
```

---

## 7. Real-World Practical Examples

### 7.1 Fetch API (HTTP Requests)
The most common real-world use of Promises.

```js
fetch("https://api.example.com/users/1")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }
    return response.json(); // also returns a Promise
  })
  .then(user => {
    console.log("User:", user.name);
    document.getElementById("username").textContent = user.name;
  })
  .catch(err => {
    console.error("Fetch failed:", err.message);
  })
  .finally(() => {
    document.getElementById("loader").style.display = "none";
  });
```

### 7.2 Reading Files in Node.js
```js
const fs = require("fs").promises;

fs.readFile("config.json", "utf8")
  .then(data => JSON.parse(data))
  .then(config => {
    console.log("App name:", config.appName);
    return fs.writeFile("log.txt", "Config loaded at " + new Date());
  })
  .then(() => console.log("Log written successfully"))
  .catch(err => console.error("File operation failed:", err.message));
```

### 7.3 Database Query (MongoDB)
```js
User.findOne({ email: "alice@example.com" })
  .then(user => {
    if (!user) throw new Error("User not found");
    return Order.find({ userId: user._id });
  })
  .then(orders => {
    console.log("Orders:", orders.length);
  })
  .catch(err => res.status(404).json({ error: err.message }));
```

### 7.4 Authentication Flow
```js
function loginUser(email, password) {
  return db.connect(config)
    .then(connection => connection.query(
      "SELECT * FROM users WHERE email = ?", [email]
    ))
    .then(user => {
      if (!user) throw new Error("User not found");
      return bcrypt.compare(password, user.passwordHash)
        .then(isMatch => {
          if (!isMatch) throw new Error("Invalid password");
          return user;
        });
    })
    .then(user => session.create(user.id))
    .then(token => ({ success: true, token }))
    .catch(err => ({ success: false, error: err.message }));
}
```

### 7.5 Image Loading
```js
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load: " + url));
    img.src = url;
  });
}

loadImage("https://example.com/photo.jpg")
  .then(img => document.body.appendChild(img))
  .catch(err => console.error(err.message));
```

---

## 8. Promise Static Methods

### `Promise.resolve()` and `Promise.reject()`
Create instantly settled promises.

```js
Promise.resolve(42).then(v => console.log(v)); // 42
Promise.reject(new Error("oops")).catch(e => console.error(e.message)); // oops
```

---

### `Promise.all()` — Wait for ALL to succeed

Runs multiple promises in **parallel**. Resolves when ALL succeed. Rejects immediately if ANY one fails.

```js
const p1 = fetch("/api/users");
const p2 = fetch("/api/products");
const p3 = fetch("/api/orders");

Promise.all([p1, p2, p3])
  .then(([users, products, orders]) => {
    console.log("All data loaded!");
    renderDashboard(users, products, orders);
  })
  .catch(err => console.error("One request failed:", err.message));
// If ANY of the 3 fail, catch runs immediately
```

**Industry use:** Loading a dashboard that needs data from multiple APIs simultaneously.

---

### `Promise.allSettled()` — Wait for ALL, regardless of outcome

Like `Promise.all()` but **never rejects**. Waits for every promise to settle and tells you which succeeded and which failed.

```js
const requests = [
  fetch("/api/service-a"),
  fetch("/api/service-b"),
  fetch("/api/service-c") // this might be down
];

Promise.allSettled(requests)
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        console.log(`Service ${i} OK:`, result.value);
      } else {
        console.warn(`Service ${i} failed:`, result.reason.message);
      }
    });
  });
```

**Industry use:** Health checks, sending to multiple analytics services where partial failure is acceptable.

---

### `Promise.race()` — First one wins

Resolves or rejects with whichever promise settles **first**.

```js
const dataFetch = fetch("/api/data");
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Request timed out")), 5000)
);

Promise.race([dataFetch, timeout])
  .then(data => console.log("Got data:", data))
  .catch(err => console.error(err.message)); // "Request timed out" if slow
```

**Industry use:** Implementing request timeouts.

---

### `Promise.any()` — First SUCCESS wins

Resolves with the **first successful** promise. Only rejects if **ALL** fail.

```js
// Try multiple CDN mirrors — use whoever responds first
Promise.any([
  fetch("https://cdn1.example.com/lib.js"),
  fetch("https://cdn2.example.com/lib.js"),
  fetch("https://cdn3.example.com/lib.js")
])
  .then(response => response.text())
  .then(script => eval(script))
  .catch(() => console.error("All CDNs failed"));
```

**Industry use:** Redundant API fallbacks, CDN failover, geo-redundant servers.

---

## 9. Error Handling in Depth

### Errors Propagate Down the Chain
```js
step1()
  .then(r1 => step2(r1))   // if this throws...
  .then(r2 => step3(r2))   // this is SKIPPED...
  .then(r3 => step4(r3))   // this is SKIPPED...
  .catch(err => {           // ...and we land here
    console.error("Something in step 1-3 failed:", err.message);
  });
```

### Recovering From Errors Mid-Chain
```js
fetchPrimaryData()
  .catch(err => {
    console.warn("Primary failed, trying backup...");
    return fetchBackupData(); // recover and continue
  })
  .then(data => process(data)) // runs with backup data
  .catch(err => console.error("Both sources failed:", err.message));
```

### Always End Chains with `.catch()`
```js
// BAD — unhandled rejection, silently swallows errors
fetchData().then(process);

// GOOD — always handle the failure case
fetchData().then(process).catch(handleError);
```

### Unhandled Promise Rejections
In Node.js, unhandled promise rejections will **crash the process** in modern versions.

```js
// Node.js — globally catch unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Browser — globally catch unhandled rejections
window.addEventListener("unhandledrejection", function(event) {
  console.error("Unhandled promise rejection:", event.reason);
});
```

---

## 10. Common Mistakes and Pitfalls

### Mistake 1: Forgetting to Return in a Chain

```js
// BUG — next .then() receives undefined
getUserData(id)
  .then(user => {
    getProfile(user.id); // forgot return!
  })
  .then(profile => console.log(profile)); // profile is undefined

// FIX
getUserData(id)
  .then(user => {
    return getProfile(user.id); // ✓
  })
  .then(profile => console.log(profile));
```

### Mistake 2: Nesting Promises (Recreating Callback Hell)

```js
// BAD — nested promises, the anti-pattern
getUser(id).then(user => {
  getPosts(user.id).then(posts => {    // nested!
    getComments(posts[0].id).then(comments => { // nested again!
      console.log(comments);
    });
  });
});

// GOOD — flat chain
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments));
```

### Mistake 3: Creating Unnecessary Promises

```js
// BAD — wrapping a promise in a promise
function getUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/users/${id}`)       // fetch already returns a Promise!
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
}

// GOOD — just return the promise
function getUser(id) {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

### Mistake 4: Using `.then()` After `async/await`

```js
// CONFUSING — mixing styles
async function fetchAndProcess() {
  const data = await fetchData(); // async/await style
  return processData(data)
    .then(result => saveResult(result)); // now switching to .then()
}

// CONSISTENT — pick one style
async function fetchAndProcess() {
  const data = await fetchData();
  const result = await processData(data);
  return await saveResult(result);
}
```

---

## 11. Industry Use Cases

| Industry | Use Case | Promise Method |
|----------|----------|----------------|
| **E-commerce** | Load product + reviews + inventory simultaneously | `Promise.all()` |
| **Banking** | Transfer money: debit → credit → notify, any failure rolls back | Promise chain + `.catch()` |
| **Healthcare** | Query multiple lab systems, use first response | `Promise.race()` |
| **Media Streaming** | Pre-fetch next video segment while current plays | Chained Promises |
| **Social Media** | Post to Twitter + Facebook + Instagram, track each | `Promise.allSettled()` |
| **Maps / Navigation** | Fetch map tiles from multiple CDNs, use fastest | `Promise.any()` |
| **CI/CD Pipelines** | Run tests in parallel, fail build if any test fails | `Promise.all()` |
| **IoT** | Poll multiple sensors, process as each reports | Individual Promises |
| **Gaming** | Load assets (textures, audio, levels) in parallel | `Promise.all()` |

---

## 12. Promises vs Callbacks vs Async/Await

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| Readability | Poor | Good | Excellent |
| Error handling | Per-callback | Single `.catch()` | `try/catch` |
| Chaining | Pyramid of doom | Flat `.then()` chain | Linear code |
| Parallel ops | Complex | `Promise.all()` | `await Promise.all()` |
| Debugging | Hard | Moderate | Easy |
| Return values | Impossible | Yes — thenable | Yes — `await` unwraps |
| Cancel support | No | No (native) | No (native) |
| Introduced | Always | ES6 (2015) | ES8 (2017) |

---

## 13. Promise Internals — How It Actually Works

Promises are microtasks. When a promise resolves, its `.then()` callbacks are queued in the **microtask queue**, which has higher priority than the macrotask queue (setTimeout, I/O).

```js
console.log("1 - sync");

setTimeout(() => console.log("4 - macrotask (setTimeout)"), 0);

Promise.resolve()
  .then(() => console.log("3 - microtask (promise)"));

console.log("2 - sync");

// Output order:
// 1 - sync
// 2 - sync
// 3 - microtask (promise)     ← microtasks run before macrotasks
// 4 - macrotask (setTimeout)
```

This is why Promises are more predictable than `setTimeout`-based callbacks.

---

## 14. Promisifying Callbacks

Many older Node.js APIs use callbacks. You can **promisify** them — wrap them in a Promise — to use modern patterns.

### Manual Promisification
```js
function readFilePromise(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise("data.txt")
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Node.js `util.promisify`
```js
const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);

readFile("data.txt", "utf8")
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Modern Node.js — `fs.promises`
```js
// Node.js 10+ — built-in promise versions of all fs methods
const fs = require("fs").promises;

fs.readFile("data.txt", "utf8")
  .then(console.log)
  .catch(console.error);
```

---

## 15. Summary

| Concept | One Line |
|---------|----------|
| **Promise** | Object representing a future value — success or failure |
| **pending** | Not yet settled |
| **fulfilled** | Resolved with a value |
| **rejected** | Failed with an error |
| **`.then()`** | Handles success, returns a new Promise |
| **`.catch()`** | Handles failure |
| **`.finally()`** | Runs always — for cleanup |
| **Chaining** | Flat sequential async steps — the cure for callback hell |
| **`Promise.all()`** | All must succeed, runs in parallel |
| **`Promise.allSettled()`** | Wait for all, collect every outcome |
| **`Promise.race()`** | First to settle wins |
| **`Promise.any()`** | First to succeed wins |
| **Microtask queue** | Promises run before setTimeout — predictable order |

---

> **Bottom line:** Promises are the backbone of modern async JavaScript. Async/await is built on top of them — you're always working with Promises whether you see them or not. Master Promises and you master async JavaScript.
