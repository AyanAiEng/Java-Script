/* What is Lexical Scoping?

Lexical scoping is a fundamental concept in JavaScript that defines how variable access is determined by the physical structure of the code (where functions and blocks are written).

📌 Simple Definition

Lexical scoping means a function can access variables from its parent scope based on where it is written in the code, not where it is called.

A function uses variables from where it is defined in the code, not where it is called.

function lexical_scoping() {
    let a = 12;
    function inneer() {
        console.log(a);
    }
    inneer();
}

lexical_scoping();

// dynamic scoping -> kaha se call kr rhe ho uspe depend krega ki kya value milegi
🧠 Does dynamic scoping always use parent variable?
❌ No
It uses:
the most recent variable in the call stack chain
⚡ What Dynamic Scoping means
Dynamic scoping means a function uses variables from its call stack (who called it), not where it was written.


java scipt uses lexical scoping
*/