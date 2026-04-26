/* used in very old js

let h1 = document.querySelector("h1")
console.dir(h1)
it will select the h1 which is on the top

it is used in old js
it can select all the Element

let h2 = document.querySelectorAll('h1')
console.dir(h2)

it is used in modern js 
it just select the class
let h3 = document.getElementsByClassName("abcd")
console.dir(h3)

it is used in modern js 
it just select the class
let h4 = document.getElementById("bcds")
console.dir(h4)
let h5  = document.getElementsByClassName("abcd")
for (let els of h5){
    els.textContent = "ma thik tum suno"
    
    }
let h6 = document.getElementById('bcds')
h6.innerHTML = "<i>tum suno</i>"
console.dir(h6)

let h7 = document.getElementById("bcds")
h7.innerText = "meri halat but haragbd ha" 
let a = document.querySelector("a")
console.dir(a)


a.href = "https://www.google.com"
let link = document.querySelector("a")
link.setAttribute("href","https://www.instagram.com")
let img = document.querySelector("img")
img.setAttribute("src", "img/premium_photo.avif");

let img = document.querySelector("img")
const hey = img.setAttribute("alt","beautifull")
console.log(hey)
const img = document.getElementById("myImage");

// Remove the "title" attribute
img.removeAttribute("title");

// Check if the attribute exists

console.log(img.getAttribute("title")); // Output: null
let para = document.createElement("p")
para.textContent = "hello my name is ayanali"
console.log(para)


const container = document.getElementById("container")
container.appendChild(para)

it will remove the class child 
const list1 = document.getElementById("myList");
const list2 = document.getElementById("item2");
list1.removeChild(list2)

const hmlo = document.getElementsByClassName("container")[0]
const para = document.createElement("p")
para.textContent = "hey i am the first paragraph"
hmlo.prepend(para)

this is how you can change the css in js


const fh1 = document.querySelector('h1')
fh1.style.color = "blue"
fh1.style.backgroundColor = "purple"

hey i can di abythings i am the aster no one can juge me i can build appps i ca built produt and i can scale them no one can do anything exept allahallah willbhelp me i eveythg no problem 

this will add the class 

const class_change= document.querySelector("h1")
class_change.classList.add("hulu")

we an also remove the exsiting class

const class_change= document.querySelector("h1")
class_change.classList.remove("abcd")

toggle ma ya hota ha ka agar lagi hui hoti ha tu haat deta ha or agar nahi lagi hui hoti to laga deta 

const class_change= document.querySelector("h1")
class_change.classList.toggle("abcd")
 */


