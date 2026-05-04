/* 🧠 What is async?

👉 async is a keyword used before a function.
It means:
“This function will always return a Promise.”

 */

async function hello(name) {
    return "hello",name
}

hello("ayan").then((data) => {
    console.log(data)
})

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data 👤");
        }, 2000);
    });
}

async function shoedata() {
    await getData(1)
    await getData(2)
    await getData(3)
    await getData(4)
    await getData(5)
 
}

shoedata()