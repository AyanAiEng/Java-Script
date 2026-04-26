/* now in this the confusing part happens because 

👉 because inner() is called normally, so this is lost.

const obj = {
  name: "Ali",
  greet: function () {
    function inner() {
      console.log(this.name);
    }
    inner();
  } 
};

obj.greet();

🚀 3. Enter Arrow Functions

Arrow functions FIX this problem.
They were designed to not have their own this.
Instead:
👉 they inherit this from the surrounding scope
This is called:
🔥 Lexical this
*/

const obj = {
    name: "Ali",
    greet: function () {
        const inner = () => {
            console.log(this.name);
        };
        inner();
    }
};

obj.greet();





