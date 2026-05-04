/* class Parent{
    parent(){
        console.log("hello")
    }
}
class child extends Parent{}

let obj = new child()

obj.parent
 */


class simple_person {
    constructor(name) {
        console.log(`the person name is ${name}`)
    }
    eat() {
        console.log("eat")
    }
    sleep() {
        console.log("sleep")
    }
    work() {
        console.log("Do nothing ")
    }
}


class Engineer extends simple_person {
    constructor(name) {
        super(nsme)
    }
    work() {
        console.log("Solve problem and build something")
    }
}

let Ayan_ali = new Engineer("Ayan Ali")

