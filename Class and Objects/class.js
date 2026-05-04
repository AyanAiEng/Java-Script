/* the one of the basic example of how to use the class made for your explanat/ion
class toyota {
    start(){
        console.log("the car is started")
    }
    stop(){
        console.log("the car is stopped")
    }
}

it is import to use the new keyword in js except it wil give an console.error
it is not like python:)

new_car = new toyota()
new_car.start()
*/


class user{
    constructor(name,email){
        this.name = name
        this.email = email
    }
    login(){
        console.log(`Be carefull! ${this.name} logging with the email ${this.email}`)
    }

}

ayan_ali = new user("Ayan Ali","ayan@gmail.com")
ayan_ali.login()

