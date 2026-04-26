/* // scope functional scope, global scope and block scope
// function scope function ke andar hi youse ho sakti hai
// global scope poore code mein kahi bhi youse ho skti hai
// block scope {} curly braces mein hi youse ho sakti hai

// this is function scope

// function abcd(){
//     var a  = 11;
// }

// console.log(a)

// this is block scope 
// the var ignore the block and the let and const donot ignore it
//



//{
//    var b = 12;
//    let c = 13;
//    const d = 14;
    
// }


console.log(b)
console.log(c)
console.log(d)
// this is global scope which mean it can be accessed any where

const name  = "ayanaali";

function name(){
    console.log(name)
}

console.log(name)

// execution context

// js sabse pahle jaise hi aapka function dekhta hai sabse pahle js banaata hai execution context, ye ek process hai jo ki do different phases mein chalta hai, memory phase and doosre ka naam hai execution phase


🧠 1. Definition of Execution Context

An Execution Context (EC) is the environment in which JavaScript code is executed.
It contains everything needed to run code:

Variables and constants
Functions
cope (lexical environment)
this binding
Code execution state

👉 In simple terms:

Executio



3. Types of Execution Context

There are 3 main types:

1️⃣ Global Execution Context (GEC)
📌 Definition:

Created automatically when JS starts running.

📌 Characteristics:
Only ONE in a program
Represents global scope
Always at bottom of Call Stack

below is the code

var x = 5;

function test() {
    console.log("hellow")
    console.log("hellow")
    console.log("hellow")
}

test()

2️⃣ Function Execution Context (FEC)
📌 Definition:

Created EVERY time a function is called.

📌 Characteristics:
Can be multiple
Temporary (destroyed after execution)
Has its own scope


2️⃣ Function Execution Context (FEC)
📌 Definition:

Created EVERY time a function is called.

📌 Characteristics:
Can be multiple
Temporary (destroyed after execution)
Has its own scope
Example:
function add(a, b) {
    return a + b;
}

add(2, 3);

👉 When add() runs:
JS creates a new EC:

FEC for add():
a = 2
b = 3
return 5

3️⃣ Eval Execution Context (rare / outdated)
📌 Definition:

Created when using eval() function.

eval("var x = 100");
⚠️ Characteristics:
Executes string as code
Uses current scope
Unsafe → rarely used today
*/