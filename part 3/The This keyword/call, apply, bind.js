


function greet(city){
    console.log(this.name + " live in this " + city)
}

const user = {name : "Ayan"}

greet.call(user,"karachi") 
