/* this is how when you will click only forst time it ill change teh color

let p = document.querySelector("p")
p.addEventListener("click", function () {
    p.style.color = "red"
})


    in this you must have to write dblclick to makeit work

let p = document.querySelector("p");

p.addEventListener("dblclick", function () {
    p.style.color = "orange";
});

to remove the existing event listener we have to do this 

let p = document.querySelector("p")

we have to save the function and use it then to the same event listener function if we give both the different fucntion how it will not work

function handleclick() {
    p.style.color = "orange";
}

p.addEventListener("click", handleclick);
p.removeEventListener("click", handleclick);

let h = document.querySelector("input")
h.addEventListener("input", function () {
    console.log("typed")
})

let h = document.querySelector("input")
h.addEventListener("input", function (info) {
    console.log(info)

    if (info.data !== null) {
        console.log(info.data)

    }
})
let sel = document.querySelector("select")
sel.addEventListener("change", function (dels) {
    console.log(dels.target.value)
})
this will change the select device into selected device
let sel = document.querySelector("select")
let h1 = document.querySelector("#select_device")

sel.addEventListener("change", function (elm) {
    h1.textContent = "Device selected"
})
let sel = document.querySelector("select")
let h1 = document.querySelector("#select_device")

sel.addEventListener("change", function (elm) {
    h1.textContent = `${elm.target.value} selected`
})

this will show that when click space bar

let p = document.querySelector("p")
window.addEventListener("keydown", function (dels) {
    if (dels.key === " ") {
        p.textContent = "space"
    } else {
        p.textContent = dels.key
    }


})


let file_input = document.getElementById("input_file")
let btn = document.getElementById("btn")
    
btn.addEventListener("click",function(){
    file_input.click()
})

file_input.addEventListener("change",function(dets){
    btn.textContent = dets.target.files[0].name
});

this is better approch
no if we will cnacel the file after choosing it wll not give us an error
let file_input = document.getElementById("input_file")
let btn = document.getElementById("btn")

btn.addEventListener("click",function(){
    file_input.click()
})

file_input.addEventListener("change",function(dets){
    const file  = dets.target.files[0]
    if(file){
        btn.textContent = file.name
    }
});
*/