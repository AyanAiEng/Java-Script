/* 
Select the element with id header and change its text to "Welcome!".

const id_header = document.querySelector("h1")
console.dir(id_header)
this can also be done by innertext but it usally goodt use textContent
id_header.textContent = "Welcome!" 

Select all paragraphs (<p>) and change their font color to blue.

const all_para = document.querySelectorAll("p")

all_para.forEach(function(elm){
    elm.style.color = "blue"
})

Create a new <p> element with some text and append it to a <div> with id container.

let p_elm = document.querySelector("p")
let div_elm = document.querySelector("div")
div_elm.append(p_elm)

Add a button that, when clicked, changes the background color of the <body> to a random color.

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Select the button
const btn = document.getElementById("btn");

// When button is clicked, change background color
btn.addEventListener("click", () => {
    document.body.style.backgroundColor = getRandomColor();
});


Remove all list items (<li>) inside a <ul> with id tasks.

const ul = document.getElementById("list")
ul.innerHTML = ""

const ul = document.querySelectorAll("#tasks li")

ul.forEach(function(elm){
    elm.remove()
});
 
*/