let userScore = 0;
let Compscore = 0;

const choices = document.querySelectorAll(".choice")
const msg = document.querySelector("#msg")
const userscore = document.querySelector("#user-score")
const compscore = document.querySelector("#comp-score")


const draw_game = () => {
    console.log("Game is draw")
    msg.innerText = "Game is draw"
    msg.style.backgroundColor = "yellow"

}

const genComputerchoice = () => {
    const option = ["rock", "paper", "scissors"]
    const randIDX = Math.floor(Math.random() * 3)
    return option[randIDX]
}

const show_winner = (userwin, userchoice, compchoice) => {
    if (userwin) {
        userScore++
        userscore.innerText = userScore
        console.log("you win")
        msg.innerText = `You win! ${userchoice} beats ${compchoice}`
        msg.style.backgroundColor = "green"

    }
    else {
        Compscore++
        compscore.innerText = Compscore
        console.log("you lose")
        msg.style.backgroundColor = "red"
        msg.innerText = `You lose! ${compchoice} beats ${userchoice}`

    }
}

const playgame = (user_choice) => {
    console.log(`You choosed ${user_choice}`)

    const computer_choice = genComputerchoice()

    console.log(`Computer Chooses ${computer_choice}`)

    if (user_choice === computer_choice) {
        draw_game()
    } else {
        let userwin = true
        if (user_choice === "rock") {
            userwin = computer_choice === "paper" ? false : true
        } else if (user_choice === "paper") {
            userwin = computer_choice === "scissors" ? false : true
        } else {
            userwin = computer_choice === "rock" ? false : true
        }
        show_winner(userwin, user_choice, computer_choice)
    }
}

choices.forEach(function (choice) {
    choice.addEventListener("click", function () {
        const userchoice = choice.getAttribute("id")
        playgame(userchoice)
    })
})