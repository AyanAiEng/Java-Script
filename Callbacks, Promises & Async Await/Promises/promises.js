/*
Read the .md file 

 the meaning of prmises is like i am doing a promise with you that i will done the work but there is aslo possible that it can not be happen, this situation is called reject in js but it can also have some chnaces to be done,this situation is called resolve

you order something form daraz or from amamzona and it is showing that the order has placed this is called pending becuase you can just wait and still you have not recieved it or if the order is delieverd to your home this mean that everything goes prefect in programming this is called resolve but if there is a problem like of heavy rain or something else like this was a fraud or something else so this is called reject in programming 

Read the abpve text it is very important

🧠 Definition (Technical)

A Promise in JavaScript is:
👉 An object that represents the eventual result (success or failure) of an asynchronous operation.

⚙️ Promise States (Very Important)

A Promise has 3 states:

Pending → still working ⏳
Fulfilled → success ✅
Rejected → error ❌

the simple example of it is 


const promises = new Promise((resolve, reject) => {
    console.log("I am a promis")
})

// this is the example which will clear your most of the concepts

const my_prmosi = new Promise((resolve, reject) => {
    let success = true
    
    if (success) {
        resolve("Success")
    } else {
        reject("Error ho gaya")
}
})

const getdata = new Promise((reject, resolve) => {
    setTimeout((dataid, next_data) => {
        console.log("hey", dataid)
        resolve("success")
        if (next_data) {
            next_data()
        }
    }, 2000);
})
*/

