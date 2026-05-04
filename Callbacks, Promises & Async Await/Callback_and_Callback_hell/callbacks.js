/* 
🔹 1. What a callback REALLY is(simple memory trick)

👉 A callback = a function you give to another function to run later
Think like this:
“Hey function, I’m busy now… when you finish, call me back.”

const hello = (name,callback) =>{
    console.log(name)
    callback()
}

const byebye = () => {
    console.log("Bye Bye.....")
}

hello("Ayan",byebye)
*/


/* 
🔹 2. Why callbacks exist (IMPORTANT)

JavaScript is asynchronous (non-blocking)
That means
👉 It doesn’t wait for slow tasks (API, DB, file, timer)
So we use callbacks to say:
“When task is done → then do this”
setTimeout(() => {
    console.log("hey")
    
}, 2000); // mean 2 sec


call_back word ma hi matlab ha jab rrady ho joy mujhe bula la na 

const order_pizza = (callback) => {
    console.log("Pizza ban raha ha ")
    
    setTimeout(() => {
        console.log("Pizza tayar ho gaya ha a kar la goy")
        callback()
    }, 2000);
}

const call_me_when_pizza_is_ready = () => {
    console.log("Mujhe call aya pizza la lo")
}

order_pizza(call_me_when_pizza_is_ready)
*/


function get_data(dataid, next_data) {
    setTimeout(() => {
        console.log("Data_id", dataid)
        if (next_data) {
            next_data()
        }
    }, 2000);
}


get_data(1, () => {
    get_data(2, () => {
        get_data(3, () => {
            get_data(4, () => {
                get_data(5)
            })
        })
    })
})


