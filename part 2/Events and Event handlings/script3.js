/* let box = document.querySelector(".main")

box.addEventListener("mousemove", function () {
    box.style.background = "red"
})

box.addEventListener("mouseout", function () {
    box.style.background = "black"
})

window.addEventListener("mousemove",function(dets){
    console.log(dets.clientX,dets.clientY)
})


let div = document.querySelector("div")


window.addEventListener("mousemove", function(dets){
    div.style.left = (dets.clientX - 225) + "px"
    div.style.top = (dets.clientY - 225) + "px"
})
*/

let input = document.querySelector("#myInput");

input.addEventListener("keyup", function(e) {
    console.log("Current value:", input.value);
});