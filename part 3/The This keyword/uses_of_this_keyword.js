/* 1. Object Methods (MOST COMMON USE)
✔ Use: Access object properties inside methods
const user = {
    name:"Ayan Ali",
    age:26,
    get_info:function() {
        return`${this.name} is ${this.age} years old`
    }
}

console.log(user.get_info())
*/
/* 
2. Reusable Functions Across Objects
✔ Use: one function, multiple objects
 */

/* 
function greet(){
    console.log("Hello" + this.name)
}

const user1 = {name:"Ayan ALi ",greet}
const user2 = {name:"bilal ",greet}


user1.greet()
user2.greet()

🚀 1. Classes (MOST COMMON USE)

This is the #1 place this is used in industry


class Abcd{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    hello(){
        console.log(`hey ${this.name}, how are you? your are ${this.age} years old`)
    }
}

const user_1 = new Abcd("Ayan",26)
user_1.hello()

3. Event Listeners (Frontend)

document.querySelector("h1").addEventListener(
    "click",
    function(){
        console.log(this)
    }
)

✅ Use:
Buttons
Forms
UI interactions

👉 this = element that triggered the event
*/