# `.then()` and `.catch()` in JavaScript Promises — The Complete Guide

---

## 1. What Are `.then()` and `.catch()`?

They are **methods on a Promise object** used to handle the result of an async operation.

| Method | Runs When | Receives |
|--------|-----------|----------|
| `.then()` | Promise is **fulfilled** (success) | The resolved value |
| `.catch()` | Promise is **rejected** (failure) | The error / rejection reason |

```js
somePromise
  .then(value => {
    // runs on SUCCESS
  })
  .catch(error => {
    // runs on FAILURE
  });
```

---

## 2. `.then()` — Deep Dive

### Syntax
```js
promise.then(onFulfilled, onRejected);
```

`.then()` actually takes **two optional arguments**:
- `onFulfilled` — runs if promise succeeds
- `onRejected` — runs if promise fails (rarely used — `.catch()` is preferred)

```js
fetchData()
  .then(
    function(value) { console.log("Success:", value); },  // arg 1
    function(error) { console.log("Failed:", error); }    // arg 2 (optional)
  );
```

In practice, almost everyone uses `.catch()` for errors instead of the second argument to `.then()`. More on why — in section 8.

### Basic Example
```js
const promise = new Promise((resolve, reject) => {
  resolve("Hello from promise!");
});

promise.then(function(value) {
  console.log(value); // "Hello from promise!"
});
```

### `.then()` Always Returns a New Promise
This is the most important thing to understand. No matter what you return inside `.then()`, it **wraps the result in a new Promise** and hands it to the next `.then()` in the chain.

```js
Promise.resolve(5)
  .then(val => val * 2)      // returns 10 — wrapped in a new Promise
  .then(val => val + 3)      // receives 10, returns 13
  .then(val => console.log(val)); // 13
```

---

## 3. What `.then()` Can Return — All 4 Cases

What you return inside `.then()` determines what the next `.then()` receives.

### Case 1: Return a plain value
```js
Promise.resolve(10)
  .then(val => val * 2)       // returns 20 (a number)
  .then(val => console.log(val)); // 20
```
Next `.then()` gets that value directly.

---

### Case 2: Return a new Promise
```js
getUser(1)
  .then(user => getPosts(user.id))   // returns a Promise
  .then(posts => console.log(posts)); // waits for getPosts to resolve
```
Next `.then()` **waits** for that Promise to settle before running.

---

### Case 3: Return nothing (undefined)
```js
Promise.resolve("data")
  .then(data => {
    console.log("Got:", data);
    // no return statement
  })
  .then(val => console.log(val)); // undefined
```
Next `.then()` gets `undefined`. This is a common bug — always return when chaining.

---

### Case 4: Throw an error
```js
Promise.resolve("data")
  .then(data => {
    throw new Error("Something went wrong!");
  })
  .then(val => console.log(val))    // SKIPPED
  .catch(err => console.error(err.message)); // "Something went wrong!"
```
Throwing inside `.then()` immediately jumps to the nearest `.catch()`.

---

## 4. `.catch()` — Deep Dive

### Syntax
```js
promise.catch(onRejected);
```

`.catch(fn)` is exactly the same as writing `.then(undefined, fn)`. It's just cleaner shorthand.

```js
// These two are identical:
promise.then(undefined, err => console.error(err));
promise.catch(err => console.error(err));
```

### Basic Example
```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Network timeout"));
});

promise.catch(function(error) {
  console.error("Caught:", error.message); // "Caught: Network timeout"
});
```

### `.catch()` Also Returns a New Promise
Just like `.then()`, `.catch()` returns a new Promise. This means you can **recover** from an error and continue the chain.

```js
fetchFromPrimary()
  .catch(err => {
    console.warn("Primary failed, using backup...");
    return fetchFromBackup(); // recover — return a new value
  })
  .then(data => process(data)) // continues with backup data
  .catch(err => console.error("Everything failed:", err.message));
```

---

## 5. What `.catch()` Can Return — All 3 Cases

### Case 1: Return a value — recovers the chain
```js
Promise.reject(new Error("oops"))
  .catch(err => {
    console.warn("Handled:", err.message);
    return "default value"; // recovery
  })
  .then(val => console.log(val)); // "default value"
```

### Case 2: Return a new Promise — async recovery
```js
fetchPrimary()
  .catch(() => fetchBackup())       // try backup on failure
  .then(data => render(data));       // render whatever worked
```

### Case 3: Re-throw — pass the error further down
```js
fetch("/api/data")
  .catch(err => {
    logErrorToServer(err); // do something with it
    throw err;             // re-throw so caller knows it failed
  })
  .then(data => process(data))    // SKIPPED
  .catch(err => showErrorUI(err)); // catches the re-thrown error
```

---

## 6. Chaining `.then()` and `.catch()` Together

### The Standard Pattern
```js
fetchUser(userId)
  .then(user => fetchOrders(user.id))
  .then(orders => fetchInvoices(orders[0].id))
  .then(invoice => displayInvoice(invoice))
  .catch(err => showError(err.message));
```

One `.catch()` at the end handles **any error** from any step above it. This is far cleaner than wrapping every callback in a try/catch or checking `if (err)` at every level.

### Flow Diagram

```
fetchUser()
    │
    ▼
 fulfilled? ──► .then(user => fetchOrders)
                    │
                    ▼
                 fulfilled? ──► .then(orders => fetchInvoices)
                                    │
                                    ▼
                                 fulfilled? ──► .then(invoice => display)
                                                    │
        ◄───────────────────────────────────────────┘
        Any rejection anywhere jumps straight to:
        .catch(err => showError)
```

---

## 7. Practical Real-World Examples

### 7.1 Fetch API — GET Request
```js
fetch("https://api.github.com/users/octocat")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    return response.json(); // returns a Promise
  })
  .then(user => {
    console.log("Name:", user.name);
    console.log("Followers:", user.followers);
  })
  .catch(err => {
    console.error("Request failed:", err.message);
  });
```

### 7.2 Fetch API — POST Request
```js
fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" })
})
  .then(response => response.json())
  .then(newUser => {
    console.log("Created user with ID:", newUser.id);
    return sendWelcomeEmail(newUser.email); // chain another async op
  })
  .then(() => console.log("Welcome email sent!"))
  .catch(err => console.error("Failed:", err.message));
```

### 7.3 Node.js File Operations
```js
const fs = require("fs").promises;

fs.readFile("input.txt", "utf8")
  .then(content => {
    const modified = content.toUpperCase();
    return fs.writeFile("output.txt", modified); // returns Promise
  })
  .then(() => console.log("File written successfully"))
  .catch(err => {
    if (err.code === "ENOENT") {
      console.error("File not found:", err.path);
    } else {
      console.error("Unexpected error:", err.message);
    }
  });
```

### 7.4 Database — Find and Update
```js
User.findById(userId)
  .then(user => {
    if (!user) throw new Error("User not found");
    user.lastLogin = new Date();
    return user.save();
  })
  .then(savedUser => {
    console.log("Updated last login for:", savedUser.email);
  })
  .catch(err => {
    console.error("DB operation failed:", err.message);
    res.status(500).json({ error: err.message });
  });
```

### 7.5 Sequential API Calls — Each Depends on Previous
```js
// Step 1: login → Step 2: get profile → Step 3: get recommendations
loginUser(email, password)
  .then(authToken => {
    localStorage.setItem("token", authToken);
    return fetchProfile(authToken); // use token from step 1
  })
  .then(profile => {
    renderHeader(profile.name, profile.avatar);
    return fetchRecommendations(profile.id); // use profile from step 2
  })
  .then(recommendations => {
    renderFeed(recommendations);
  })
  .catch(err => {
    if (err.message === "Invalid credentials") {
      showLoginError("Wrong email or password");
    } else {
      showGenericError("Something went wrong. Please try again.");
    }
  });
```

### 7.6 Retry Logic with `.catch()`
```js
function fetchWithRetry(url, retries = 3) {
  return fetch(url)
    .catch(err => {
      if (retries === 0) throw err; // no more retries, propagate
      console.warn(`Failed, retrying... (${retries} left)`);
      return fetchWithRetry(url, retries - 1); // recurse
    });
}

fetchWithRetry("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("All retries failed:", err.message));
```

### 7.7 Loading State Management (React-style)
```js
function loadUserData(userId) {
  setLoading(true);
  setError(null);

  fetchUser(userId)
    .then(user => {
      setUser(user);
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false); // always stop the spinner
    });
}
```

---

## 8. `.catch()` vs Second Argument of `.then()` — The Key Difference

This is one of the most misunderstood things about Promises.

```js
// Option A — using second argument of .then()
fetchData().then(
  value => process(value),
  error => handleError(error)  // only catches errors from fetchData()
);

// Option B — using .catch()
fetchData()
  .then(value => process(value))
  .catch(error => handleError(error)); // catches errors from BOTH fetchData() AND process()
```

### Why `.catch()` is Almost Always Better

```js
fetchData()
  .then(value => {
    throw new Error("Error inside .then!"); // thrown here
  },
  err => handleError(err)); // does NOT catch the error above — too late

// vs.

fetchData()
  .then(value => {
    throw new Error("Error inside .then!"); // thrown here
  })
  .catch(err => handleError(err)); // DOES catch it ✓
```

The second argument of `.then()` **cannot catch errors thrown by the first argument** of the same `.then()`. `.catch()` placed after can.

---

## 9. Error Types — What Goes into `.catch()`

`.catch()` receives whatever was passed to `reject()` or thrown inside `.then()`.

```js
// Rejecting with an Error object (best practice)
new Promise((_, reject) => reject(new Error("Something failed")))
  .catch(err => console.log(err instanceof Error)); // true

// Rejecting with a string (works but not ideal)
new Promise((_, reject) => reject("failed"))
  .catch(msg => console.log(typeof msg)); // "string"

// Rejecting with an object
new Promise((_, reject) => reject({ code: 404, message: "Not found" }))
  .catch(obj => console.log(obj.code)); // 404

// Error thrown synchronously inside .then()
Promise.resolve()
  .then(() => { throw new TypeError("Bad type"); })
  .catch(err => console.log(err instanceof TypeError)); // true
```

**Best practice:** Always `reject(new Error("message"))` — never reject with raw strings. Error objects carry a `.stack` trace which is invaluable for debugging.

---

## 10. Chaining After `.catch()` — Continued Execution

Since `.catch()` returns a Promise, you can attach more `.then()` calls after it.

```js
Promise.reject(new Error("initial failure"))
  .catch(err => {
    console.warn("Caught:", err.message);
    return "recovered value"; // chain continues
  })
  .then(val => console.log("After catch:", val)) // "After catch: recovered value"
  .catch(err => console.error("Second catch:", err)); // only runs if above throws
```

### Visual Flow

```
Promise.reject(err)
    │
    ▼
 .catch(err => "recovered")   ← handles rejection, returns value
    │
    ▼ (now fulfilled with "recovered")
 .then(val => console.log)    ← runs normally
    │
    ▼
 .catch(err => ...)           ← only runs if something above throws
```

---

## 11. Common Mistakes

### Mistake 1: Swallowing Errors (Empty `.catch()`)
```js
// BAD — errors disappear silently
fetchData()
  .then(process)
  .catch(err => {}); // empty catch = debugging nightmare

// GOOD — at minimum, log it
fetchData()
  .then(process)
  .catch(err => console.error("Error:", err));
```

### Mistake 2: Missing `return` in `.then()`
```js
// BUG — next .then() gets undefined
getUser(id)
  .then(user => {
    getProfile(user.id); // forgot return!
  })
  .then(profile => console.log(profile)); // undefined

// FIX
getUser(id)
  .then(user => {
    return getProfile(user.id); // ✓
  })
  .then(profile => console.log(profile));
```

### Mistake 3: Uncaught Rejection (No `.catch()` at All)
```js
// BAD — unhandled rejection, crashes Node.js in production
fetchData().then(process);

// GOOD — always end with .catch()
fetchData().then(process).catch(handleError);
```

### Mistake 4: Nesting Instead of Chaining
```js
// BAD — nested promises = callback hell all over again
getUser(id).then(user => {
  getOrders(user.id).then(orders => {     // nested!
    getItems(orders[0].id).then(items => { // nested again!
      console.log(items);
    });
  });
});

// GOOD — flat chain
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => getItems(orders[0].id))
  .then(items => console.log(items))
  .catch(err => console.error(err));
```

### Mistake 5: Using `.then()` and `async/await` Together Inconsistently
```js
// CONFUSING — mixing styles in same function
async function loadData() {
  const user = await fetchUser();       // async/await
  return fetchOrders(user.id)
    .then(orders => orders[0]);         // suddenly .then()
}

// CONSISTENT
async function loadData() {
  const user = await fetchUser();
  const orders = await fetchOrders(user.id);
  return orders[0];
}
```

---

## 12. `.then()` and `.catch()` in Industry

| Scenario | Pattern |
|----------|---------|
| REST API call | `.then(res => res.json()).catch(handleError)` |
| Form submission | `.then(showSuccess).catch(showFormError)` |
| Auth token refresh | `.catch(err => refreshToken().then(retry))` |
| File upload progress | Multiple `.then()` steps for each stage |
| Payment processing | Chain of `.then()` — debit → credit → notify, single `.catch()` for rollback |
| Search-as-you-type | Cancel old, start new — `.then()` on latest only |
| Infinite scroll | `.then(appendResults)` on scroll event |
| SSR data fetching (Next.js) | `getServerSideProps` returns chained promises |

---

## 13. `.then()` and `.catch()` with `Promise.all()`

```js
const userPromise = fetchUser(1);
const postsPromise = fetchPosts(1);
const settingsPromise = fetchSettings(1);

Promise.all([userPromise, postsPromise, settingsPromise])
  .then(([user, posts, settings]) => {
    // destructure the array of results
    renderProfile(user);
    renderFeed(posts);
    applySettings(settings);
  })
  .catch(err => {
    // if ANY of the 3 promises fail, we land here
    console.error("Dashboard load failed:", err.message);
    showErrorPage();
  });
```

---

## 14. Quick Reference Card

```
┌──────────────────────────────────────────────────────────┐
│                    PROMISE CHAIN FLOW                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  somePromise                                             │
│    .then(value => { ... return newValue; })              │
│    │   ↑ runs on SUCCESS                                 │
│    │   ↑ return value passes to next .then()             │
│    │   ↑ throw error jumps to nearest .catch()           │
│    │                                                     │
│    .then(newValue => { ... return anotherValue; })       │
│    │   ↑ chained — runs after previous .then()           │
│    │                                                     │
│    .catch(error => { ... return recovery; })             │
│    │   ↑ runs on ANY rejection from above                │
│    │   ↑ return value — chain continues (recovered)      │
│    │   ↑ throw error — jumps to next .catch()            │
│    │                                                     │
│    .finally(() => { ... })                               │
│        ↑ always runs — success OR failure                │
│        ↑ perfect for cleanup (hide spinner, close db)    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 15. Summary

| | `.then()` | `.catch()` |
|--|-----------|------------|
| **Runs when** | Promise fulfills (success) | Promise rejects (failure) |
| **Receives** | Resolved value | Error / rejection reason |
| **Returns** | New Promise | New Promise |
| **Can recover?** | N/A | Yes — return a value to continue |
| **Can re-throw?** | Yes — `throw err` | Yes — `throw err` |
| **Shorthand for** | `.then(fn, undefined)` | `.then(undefined, fn)` |
| **Catches errors from** | — | All previous `.then()` calls |

---

> **Bottom line:** `.then()` is how you use the result of a successful async operation. `.catch()` is how you handle anything that goes wrong — anywhere in the chain. Together, they give you clean, flat, readable async code with centralized error handling. Master these two methods and you've mastered the Promise API.
