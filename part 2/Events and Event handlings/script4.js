// jispe event aayega agar uspar listener nahi hua to humaara event uske parent par listener dhundhega aur aisa krte krte upar ki taraf move karega

/* let child = document.getElementById("child")

child.addEventListener("click",function(){
    alert("clicked")
    }) 
    let ul = document.querySelector("ul")
    
    ul.addEventListener("click",function(dets){
    alert("clicked")
    })
    
    let ul = document.querySelector("ul")
    
    ul.addEventListener("click",function(dets){
        dets.target.classList.toggle("lt")
    })
*/

/* jab bhi aap click krte ho ya koi bhi event raise krte ho to aapka jo event flow do phases mein chalta hai:
phase 1: event top level element se neeche ki taraf aayega
phase 2: event raised element se parent ki taraf jaayega
aur pahle phase 1 hoti hai

let a = document.querySelector("#a")
let b = document.querySelector("#b")
let c = document.querySelector("#c")
let btn = document.querySelector("#btn")


btn.addEventListener("click",function(dets){
    console.log("btn clicked")
})
c.addEventListener("click",function(dets){
    console.log("c clicked")
})
b.addEventListener("click",function(dets){
    console.log("b clicked")
})
a.addEventListener("click", function(dets){
    console.log("a clicked")
}, true) // <-- true means "capture" */

let inp = document.querySelector("input")
let span = document.querySelector("span")

inp.addEventListener("input",function(){
    let leng = 20 - inp.value.length
    span.textContent = leng
    if(leng < 0){
        span.style.color = "red"
    } else{
        span.style.color = "white"
    }
})