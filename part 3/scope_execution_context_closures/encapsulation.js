/* Encapsulation in programming means bundling data (variables) and the methods (functions) that operate on that data into a single unit, and restricting direct access to some of that data.

In simple words:
👉 “Hide internal details and only expose what is necessary.”

🧠 Real-life analogy

Think of a capsule (medicine) 💊
You don’t see what’s inside or how it works — you just use it.

Same in programming:
You don’t touch internal variables directly, you interact through controlled methods.

🔒 Encapsulation in JavaScript

JavaScript doesn’t have strict “private” like some languages, but it provides ways to achieve encapsulation. 
*/

function iimit_checker() {
    let click = 0;
    return function () {
        if (click < 5) {
            click++
            console.log(`clicked ${click} times`)
        }
        else {
            console.error('limit excedeed,try again after soem time')
        }
    }
}

let abcd = iimit_checker()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()
abcd()