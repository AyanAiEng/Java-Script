// for more details read the .md file

/* 
🔥 What is Callback Hell ?

👉 Callback Hell = too many nested callbacks(functions inside functions) that make code messy and hard to understand

🔹 Callback Hell kya hota hai?

👉 Simple line yaad rakhna:
Callback Hell = jab bohat saare callbacks ek ke andar ek nest ho jate hain aur code unreadable ho jata hai 😵

//this is one of the example of callback hell this is one of the biggest problem with call back hell for this we use another approch callled Promises now we will study that in detail

the few problems are:

1. Read karna mushkil
Code left se right nahi — upar se niche zig - zag ho jata hai

2. Debug karna hard
Error kahan hai ? samajhna mushkil

3. Maintain karna difficult
Team project mein koi bhi confuse ho jata hai 
*/

const get_data = (dataid, next_data) => {

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
