/* 🧠 What is .then()?

👉 .then() is used when a Promise is successful (resolved).
Simple meaning:
“If everything goes right, do this.”
 */

/* const promise = new Promise((resolve, reject) => {
    resolve("New work")
})

promise.then((result) => {
    console.log(result)
}) */

const get_data = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data ")
        }, 2000);
    })
}


get_data().then((data) => {
    console.log(data)
})

/* 🧠 What is .catch()?

👉 .catch() is used to handle errors (rejected Promises).
Simple meaning:
“Agar kaam fail ho jaye, to yeh code chalao.”
 */
const promise = new Promise((resolve, reject) => {
    resolve("Something went wrong");
});

promise
    .then((data) => {
        console.log("Uuer",data)
    })
    .catch((data) => {
        console.log("Uuer",data)
    })