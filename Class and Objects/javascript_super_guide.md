# JavaScript `super` Keyword - Complete Guide

## 🔥 What is `super`?

`super` is a special keyword in JavaScript classes used to access and
call functions from a parent (base) class.

It is mainly used in inheritance.

------------------------------------------------------------------------

## 🧠 Simple Meaning

> `super` = "Call or access parent class"

------------------------------------------------------------------------

## 🔹 Why do we use `super`?

We use `super` for two main reasons:

### 1. Call Parent Constructor

When a child class inherits from a parent class, `super()` is used to
initialize the parent class.

``` javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

class Admin extends User {
  constructor(name, role) {
    super(name); // call parent constructor
    this.role = role;
  }
}
```

👉 Without `super()`, JavaScript throws an error because `this` is not
initialized.

------------------------------------------------------------------------

### 2. Call Parent Methods

We can also reuse parent methods using `super.methodName()`.

``` javascript
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // call parent method
    console.log("Dog barks");
  }
}
```

------------------------------------------------------------------------

## 🔥 What problem does `super` solve?

Without `super`: - You cannot access `this` in child constructor - You
cannot reuse parent logic - You must rewrite code (bad practice)

------------------------------------------------------------------------

## 🧠 Simple Mental Model

  Keyword          Meaning
  ---------------- -------------------------
  extends          Connect child to parent
  super()          Initialize parent
  super.method()   Reuse parent method

------------------------------------------------------------------------

## 🏭 Real Industry Use Cases

### 1. User Roles System

``` javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

class Admin extends User {
  constructor(name) {
    super(name);
  }
}
```

### 2. API Service Layers

``` javascript
class ApiService {
  fetchData() {
    console.log("Fetching...");
  }
}

class UserService extends ApiService {
  fetchData() {
    super.fetchData();
    console.log("Processing user data...");
  }
}
```

------------------------------------------------------------------------

## ⚠️ Important Rules

-   `super()` must be called before using `this`
-   Only used in classes with `extends`
-   Must be inside child class constructor or method

------------------------------------------------------------------------

## 💬 Interview Definition

`super` is a JavaScript keyword used in classes to call the constructor
and methods of a parent class. It ensures proper initialization and
allows reuse of parent functionality in child classes.

------------------------------------------------------------------------

## 🧠 Final Summary

-   `super()` → initializes parent class
-   `super.method()` → uses parent method
-   Required in inheritance
-   Prevents code duplication and errors
