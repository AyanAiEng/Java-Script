/* 🔥 2. What super() does

👉 super() actually:

runs the parent constructor
initializes this properly
sets up parent properties 

for more details reaad the super_js_guide
*/

class user{
    constructor(name,email){
        this.name = name
    }
}

class admin extends user{
    constructor(name,role){
        super(name)
        this.role = role
    }
}

admins = new admin("Ayan Ali",'Engineer')
