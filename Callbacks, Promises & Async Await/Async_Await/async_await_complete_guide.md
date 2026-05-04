# `async` and `await` in JavaScript — The Complete Guide

---

## 1. What Are `async` and `await`?

`async` and `await` are **keywords introduced in ES8 (2017)** that let you write asynchronous code that *looks and reads like synchronous code*. They are **syntactic sugar built on top of Promises** — under the hood, everything is still a Promise.

| Keyword | What It Does |
|---------|-------------|
| `async` | Marks a function as asynchronous. Makes it always return a Promise. |
| `await` | Pauses execution inside an `async` function until a Promise settles. |

```js
// Without async/await (Promises)
function getUser() {
  return fetch("/api/user")
    .then(res => res.json())
    .then(user => user.name);
}

// With async/await — reads like synchronous code
async function getUser() {
  const res = await fetch("/api/user");
  const user = await res.json();
  return user.name;
}
```

Same behavior. The second version is dramatically easier to read.

---

## 2. The `async` Keyword

### What It Does
Placing `async` before a function does two things:
1. The function **always returns a Promise**, no matter what you return inside it
2. It allows the use of `await` inside the function body

```js
async function sayHello() {
  return "Hello!";
}

sayHello().then(val => console.log(val)); // "Hello!"
// The string "Hello!" was automatically wrapped in Promise.resolve("Hello!")
```

### Works on All Function Types

```js
// Regular function
async function fetchData() { ... }

// Arrow function
const fetchData = async () => { ... };

// Method in a class
class UserService {
  async getUser(id) { ... }
}

// Method in an object
const api = {
  async getUser(id) { ... }
};

// Immediately Invoked Function Expression (IIFE)
(async () => {
  const data = await fetchData();
  console.log(data);
})();
```

### Return Values

```js
// Returns a value → Promise.resolve(value)
async function getValue() {
  return 42;
}
getValue().then(v => console.log(v)); // 42

// Returns nothing → Promise.resolve(undefined)
async function doWork() {
  console.log("working...");
}
doWork().then(v => console.log(v)); // undefined

// Throws an error → Promise.reject(error)
async function fail() {
  throw new Error("Something broke");
}
fail().catch(err => console.error(err.message)); // "Something broke"
```

---

## 3. The `await` Keyword

### What It Does
`await` can **only be used inside an `async` function**. It pauses the execution of the function and waits for a Promise to settle, then returns the resolved value.

```js
async function run() {
  console.log("Before await");
  const result = await Promise.resolve("I waited!");
  console.log("After await:", result);
  console.log("Done");
}

run();
// Output:
// Before await
// After await: I waited!
// Done
```

### Awaiting a Promise
```js
async function loadUser(id) {
  const response = await fetch(`/api/users/${id}`); // waits for fetch
  const user = await response.json();               // waits for .json()
  return user;
}
```

### Awaiting Non-Promises
If you `await` a non-Promise value, it just resolves immediately with that value.

```js
async function example() {
  const val = await 42;         // same as await Promise.resolve(42)
  console.log(val);             // 42

  const str = await "hello";
  console.log(str);             // "hello"
}
```

### `await` Pauses Only the `async` Function — Not Everything
The rest of your program keeps running. `await` does NOT block the main thread.

```js
async function fetchData() {
  console.log("2 - fetchData starts");
  const data = await slowAPICall(); // pauses fetchData here
  console.log("4 - got data");      // resumes after slowAPICall resolves
  return data;
}

console.log("1 - before call");
fetchData();
console.log("3 - after call (runs immediately, doesn't wait)");

// Output:
// 1 - before call
// 2 - fetchData starts
// 3 - after call (runs immediately, doesn't wait)
// 4 - got data
```

---

## 4. Error Handling with `try/catch`

The biggest ergonomic win of `async/await` over raw Promises is **using `try/catch` for error handling** — the same pattern used for synchronous code.

### Basic Pattern
```js
async function loadUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    console.log("User:", user.name);
  } catch (err) {
    console.error("Failed to load user:", err.message);
  }
}
```

### Replacing a Promise Chain
```js
// Promise chain with .catch()
function loginUser(email, password) {
  return db.connect()
    .then(conn => conn.findUser(email))
    .then(user => verifyPassword(user, password))
    .then(user => createSession(user.id))
    .catch(err => handleError(err));
}

// Async/await with try/catch
async function loginUser(email, password) {
  try {
    const conn = await db.connect();
    const user = await conn.findUser(email);
    await verifyPassword(user, password);
    const session = await createSession(user.id);
    return session;
  } catch (err) {
    handleError(err);
  }
}
```

### Catching Specific Errors
```js
async function fetchUserProfile(userId) {
  try {
    const user = await getUser(userId);
    const profile = await getProfile(user.id);
    return profile;
  } catch (err) {
    if (err.code === "USER_NOT_FOUND") {
      return createDefaultProfile(userId);  // handle specifically
    } else if (err.code === "NETWORK_ERROR") {
      return getCachedProfile(userId);      // fallback to cache
    } else {
      throw err; // re-throw anything unexpected
    }
  }
}
```

### `finally` Works Too
```js
async function fetchAndRender(url) {
  showSpinner();
  try {
    const data = await fetch(url).then(r => r.json());
    render(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideSpinner(); // always runs — success or failure
  }
}
```

---

## 5. Async/Await vs Promises — Side by Side

### Sequential Operations

```js
// Promises
function getOrderTotal(userId) {
  return getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => calculateTotal(orders))
    .then(total => applyDiscount(total))
    .catch(err => console.error(err));
}

// Async/Await
async function getOrderTotal(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const total = await calculateTotal(orders);
    const finalTotal = await applyDiscount(total);
    return finalTotal;
  } catch (err) {
    console.error(err);
  }
}
```

### Error from Middle of Chain

```js
// Promises — hard to know WHICH step failed
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => getItems(orders[0].id))
  .catch(err => console.error("Something failed:", err)); // which step?

// Async/Await — you can pinpoint exactly where
async function load(id) {
  let user, orders, items;
  try {
    user = await getUser(id);
  } catch (err) {
    console.error("Failed at getUser:", err.message);
    return;
  }
  try {
    orders = await getOrders(user.id);
    items = await getItems(orders[0].id);
  } catch (err) {
    console.error("Failed at orders/items:", err.message);
  }
}
```

---

## 6. Running Promises in Parallel with `async/await`

### The Mistake — Sequential When It Should Be Parallel

```js
// BAD — these are independent but run one after the other (slow!)
async function loadDashboard() {
  const user = await fetchUser();        // wait...
  const posts = await fetchPosts();      // then wait...
  const settings = await fetchSettings(); // then wait...
  // total time = user + posts + settings
}
```

### The Fix — `Promise.all()`

```js
// GOOD — all three run at the same time (fast!)
async function loadDashboard() {
  const [user, posts, settings] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchSettings()
  ]);
  // total time = slowest of the three (not the sum)
  return { user, posts, settings };
}
```

### When to Use Sequential vs Parallel

```js
async function example() {
  // SEQUENTIAL — second depends on first
  const user = await getUser(id);
  const orders = await getOrders(user.id); // needs user.id

  // PARALLEL — independent of each other
  const [profile, settings] = await Promise.all([
    getProfile(user.id),
    getSettings(user.id)
  ]);
}
```

### `Promise.allSettled()` — Don't Fail on One Error

```js
async function loadWidgets() {
  const results = await Promise.allSettled([
    fetchWeather(),
    fetchNews(),
    fetchStocks()
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      renderWidget(i, result.value);
    } else {
      renderErrorWidget(i, result.reason);
    }
  });
}
```

---

## 7. Real-World Practical Examples

### 7.1 Fetch API — GET Request
```js
async function getGithubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (err) {
    console.error("GitHub fetch failed:", err.message);
    throw err; // re-throw so caller can handle
  }
}

// Usage
const user = await getGithubUser("octocat");
console.log(user.name, user.public_repos);
```

### 7.2 Fetch API — POST Request
```js
async function createUser(userData) {
  try {
    const response = await fetch("https://api.example.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Failed to create user");
    }

    const newUser = await response.json();
    console.log("Created user:", newUser.id);
    return newUser;
  } catch (err) {
    console.error("Create user failed:", err.message);
    throw err;
  }
}
```

### 7.3 Node.js File Operations
```js
const fs = require("fs").promises;
const path = require("path");

async function processConfigFile(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const config = JSON.parse(raw);

    config.lastLoaded = new Date().toISOString();

    const outputPath = path.join(__dirname, "config.processed.json");
    await fs.writeFile(outputPath, JSON.stringify(config, null, 2));

    console.log("Config processed and saved.");
    return config;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Config file not found:", filePath);
    } else if (err instanceof SyntaxError) {
      console.error("Invalid JSON in config file");
    } else {
      throw err;
    }
  }
}
```

### 7.4 Database Operations (Express Route)
```js
app.get("/users/:id/orders", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const orderIds = orders.map(o => o._id);
    const items = await Item.find({ orderId: { $in: orderIds } });

    res.json({ user, orders, items });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

### 7.5 Authentication Flow
```js
async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No account with that email");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Incorrect password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    await LoginLog.create({ userId: user._id, timestamp: new Date() });

    return { token, user: { id: user._id, email: user.email, name: user.name } };
  } catch (err) {
    throw err; // let the route handler deal with the response
  }
}
```

### 7.6 Retry Logic
```js
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt === maxRetries) throw err; // last attempt — give up
      await new Promise(resolve => setTimeout(resolve, delay * attempt)); // wait before retry
    }
  }
}

// Usage
try {
  const data = await fetchWithRetry("https://api.example.com/data");
  console.log(data);
} catch (err) {
  console.error("All retries failed:", err.message);
}
```

### 7.7 Async Loop — Processing Items One by One
```js
async function processOrdersSequentially(orders) {
  const results = [];

  for (const order of orders) {
    try {
      const result = await processOrder(order); // waits for each
      results.push({ id: order.id, status: "done", result });
    } catch (err) {
      results.push({ id: order.id, status: "failed", error: err.message });
    }
  }

  return results;
}
```

### 7.8 Async Loop — Processing All Items in Parallel
```js
async function processOrdersInParallel(orders) {
  const promises = orders.map(async order => {
    try {
      const result = await processOrder(order);
      return { id: order.id, status: "done", result };
    } catch (err) {
      return { id: order.id, status: "failed", error: err.message };
    }
  });

  return Promise.all(promises);
}
```

### 7.9 React — Fetching Data on Component Mount
```js
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}
```

---

## 8. `async/await` with Different Promise Combinators

```js
// Promise.all — fail fast if any fails
async function loadAll() {
  const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
  return { a, b, c };
}

// Promise.allSettled — get results of all, even failed ones
async function loadAllSafe() {
  const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
  return results.map(r => r.status === "fulfilled" ? r.value : null);
}

// Promise.race — use whichever resolves first
async function fetchFastest() {
  return await Promise.race([fetchFromServer1(), fetchFromServer2()]);
}

// Promise.any — use first to succeed
async function fetchReliably() {
  return await Promise.any([
    fetch("https://cdn1.example.com/data"),
    fetch("https://cdn2.example.com/data"),
    fetch("https://cdn3.example.com/data")
  ]);
}
```

---

## 9. Top-Level `await`

In modern JavaScript (ES2022) and Node.js (v14.8+ with ES modules), you can use `await` **at the top level of a module** without wrapping it in an `async` function.

```js
// In a .mjs file or with "type": "module" in package.json

const config = await fetch("/config.json").then(r => r.json());
const db = await connectToDatabase(config.dbUrl);

console.log("App ready");

export { db };
```

Before top-level `await`, you had to use an IIFE:
```js
// Old pattern — still valid
(async () => {
  const config = await fetch("/config.json").then(r => r.json());
  console.log("Ready");
})();
```

---

## 10. How `async/await` Works Under the Hood

`async/await` is 100% syntactic sugar over Promises and generators. The JavaScript engine transforms it at compile time.

```js
// What you write
async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  const user = await res.json();
  return user;
}

// What the engine roughly compiles it to
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(user => user);
}
```

This means:
- `async` functions **always return Promises**
- `await` is just `.then()` in disguise
- Error handling via `try/catch` maps to `.catch()`
- Knowing Promises deeply = knowing `async/await` deeply

---

## 11. Common Mistakes

### Mistake 1: Using `await` Outside `async`
```js
// ERROR — await is only valid inside async functions
function loadData() {
  const data = await fetchData(); // SyntaxError!
  return data;
}

// FIX
async function loadData() {
  const data = await fetchData(); // ✓
  return data;
}
```

### Mistake 2: Forgetting to `await`
```js
// BUG — result is a Promise object, not the value!
async function showUser(id) {
  const user = fetchUser(id); // forgot await!
  console.log(user.name);     // undefined — user is a Promise, not a user object
}

// FIX
async function showUser(id) {
  const user = await fetchUser(id); // ✓
  console.log(user.name);
}
```

### Mistake 3: Sequential `await` When Parallel Is Possible
```js
// SLOW — runs one after another (unnecessary)
async function slow() {
  const a = await fetchA(); // 300ms
  const b = await fetchB(); // 300ms
  const c = await fetchC(); // 300ms
  // total: ~900ms
}

// FAST — runs all at once
async function fast() {
  const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
  // total: ~300ms
}
```

### Mistake 4: Using `await` Inside `forEach`
```js
// BUG — forEach does NOT wait for async callbacks
async function processAll(items) {
  items.forEach(async item => {
    await processItem(item); // these all fire at once, forEach doesn't wait
  });
  console.log("done"); // runs BEFORE all items are processed!
}

// FIX — use for...of loop
async function processAll(items) {
  for (const item of items) {
    await processItem(item); // truly sequential
  }
  console.log("done"); // runs AFTER all items are processed ✓
}
```

### Mistake 5: Not Handling Errors
```js
// BAD — unhandled promise rejection
async function loadData() {
  const data = await fetchData(); // if this throws, nobody catches it
  return data;
}

// GOOD
async function loadData() {
  try {
    const data = await fetchData();
    return data;
  } catch (err) {
    console.error("Load failed:", err.message);
    throw err; // or return a fallback
  }
}
```

### Mistake 6: `async` in `Array.map()` Returns Promises, Not Values
```js
// TRICKY — map returns an array of Promises, not values
async function processAll(ids) {
  const results = ids.map(async id => {
    return await fetchItem(id); // each returns a Promise
  });
  console.log(results); // [Promise, Promise, Promise] — not what you want!
}

// FIX — await the Promise.all
async function processAll(ids) {
  const results = await Promise.all(
    ids.map(id => fetchItem(id))
  );
  console.log(results); // [item1, item2, item3] ✓
}
```

---

## 12. Industry Use Cases

| Industry | Scenario | Pattern |
|----------|----------|---------|
| **E-commerce** | Checkout: validate cart → charge card → create order → send email | Sequential `await` |
| **Social Media** | Load feed: user + posts + ads simultaneously | `await Promise.all()` |
| **Banking** | Transfer funds with rollback on failure | `try/catch` with `await` |
| **Healthcare** | Fetch patient + meds + history in parallel | `await Promise.allSettled()` |
| **Gaming** | Load level assets (textures, audio, maps) | `await Promise.all()` |
| **DevOps / CI** | Run test suites in parallel | `await Promise.all()` |
| **Search Engines** | Query multiple data sources, use fastest | `await Promise.race()` |
| **SaaS Dashboards** | Load multiple widgets independently | `await Promise.allSettled()` |
| **IoT** | Poll sensors on interval | `async` + `setInterval` |
| **Mobile Apps** | Sync local DB with remote on app open | Sequential `await` chain |

---

## 13. Quick Reference Card

```
┌────────────────────────────────────────────────────────────────┐
│                    ASYNC / AWAIT CHEATSHEET                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  async function name() { ... }  ← always returns a Promise    │
│  const fn = async () => { ... } ← arrow function variant      │
│                                                                │
│  const result = await somePromise;  ← unwraps the value       │
│  await can ONLY be used inside async functions                 │
│                                                                │
│  ERROR HANDLING:                                               │
│  try {                                                         │
│    const data = await riskyOperation();                        │
│  } catch (err) {                                               │
│    handle(err);                                                │
│  } finally {                                                   │
│    cleanup(); // always runs                                   │
│  }                                                             │
│                                                                │
│  PARALLEL:                                                     │
│  const [a, b] = await Promise.all([fetchA(), fetchB()]);       │
│                                                                │
│  SEQUENTIAL LOOP:                                              │
│  for (const item of items) { await process(item); }           │
│                                                                │
│  PARALLEL LOOP:                                                │
│  await Promise.all(items.map(item => process(item)));          │
│                                                                │
│  DO NOT use await inside .forEach() — use for...of instead    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 14. Summary

| | `async` | `await` |
|--|---------|---------|
| **Type** | Function modifier keyword | Expression keyword |
| **What it does** | Makes function return a Promise | Pauses until Promise settles |
| **Where used** | Before `function` keyword | Inside `async` functions only |
| **Return value** | Always a Promise | The resolved value of the Promise |
| **Error handling** | Via `try/catch` around `await` | Caught by surrounding `try/catch` |
| **Blocks main thread?** | No | No — only pauses the async function |
| **Built on** | Promises | Promises |
| **Introduced** | ES8 / 2017 | ES8 / 2017 |

---

> **Bottom line:** `async/await` is the modern standard for writing async JavaScript. It doesn't replace Promises — it wraps them in a syntax that reads like synchronous code. Use `async/await` for sequential logic and clean error handling. Use `Promise.all()` for parallel operations. Master both and you're equipped to handle any async challenge in JavaScript.
