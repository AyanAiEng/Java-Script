let boxes = document.querySelectorAll(".box")
let reset_btn = document.getElementById("reset-btn")
let trun0 = true
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#winner")
let newgame_btn = document.querySelector("#newgame-btn")

const winningPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal \
    [2, 4, 6]  // diagonal /
];

function check_winner() {
    for (let patterns of winningPatterns) {
        let Posval1 = boxes[patterns[0]].innerText
        let Posval2 = boxes[patterns[1]].innerText
        let Posval3 = boxes[patterns[2]].innerText

        if (Posval1 != "" && Posval2 != "" && Posval3 != "") {
            if (Posval1 === Posval2 && Posval2 === Posval3) {
                console.log("you are the winner of the game", Posval1)
                showWinner(Posval1)
            }
        }

    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabled_boxes()
}

const disabled_boxes = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

const enabled_boxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText = ""
    }
}

const reset_game = () => {
    trun0 = true
    enabled_boxes()
    msgContainer.classList.add("hide");


}

boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        console.log("the button was clicked");
        if (trun0 === true) {
            box.innerText = "O"
            trun0 = false
        } else {
            box.innerText = "X"
            trun0 = true
        }
        box.disabled = true

        check_winner()
    })
})

newgame_btn.addEventListener("click",reset_game)
reset_btn.addEventListener("click",reset_game)
/*         console.log(patterns[0],patterns[1],patterns[2])
        console.log(boxes[patterns[0]],boxes[patterns[1]],boxes[patterns[2]])
        


        console.log(
            boxes[patterns[0]].innerText,
            boxes[patterns[1]].innerText,
            boxes[patterns[2]].innerText
        )
        */