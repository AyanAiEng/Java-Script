/* // this will print the complete window

console.log(this)

// this will print the complete window


function hey(){
    console.log(this)
}
hey() */

// this will print the info or the obj you can say

/* let obj = {
    name:"Ayan",
    age:26,
    show_hey:function(){
        console.log(this)
    }
}

obj.show_hey() */

/* this will print the window because

🧠 One-line answer
👉 Your code prints window because arrow function takes this from global scope, not from the object that calls it

this will print the window

const obj2 = {
    name:"Ayan Ali",
    show:() => {
        console.log(this)
    }
}
obj2.show()

this will print the obj
let obj3 = {
    name:"Ayan ALi",
    showing:function(){
        const func2 = () =>{
            console.log(this)
        }
        func2()
    } 
}
obj3.showing() 



this will print the window

document.querySelector("h1").addEventListener(
    "click",
    () => {
        console.log(this)
    }
)

this will print the h1

document.querySelector("h1").addEventListener(
    "click",
    function(){
        console.log(this)
    }  
)    

*/

