console.log(this)

function hey() {
    console.log(this)
}
hey()


let obj = {
    name:"Ayyanali",
    age: 26,
    Say_name: function () {
        console.log(this.name)
    }
}

obj.Say_name()