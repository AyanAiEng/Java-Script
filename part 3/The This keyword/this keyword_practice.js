const form = document.querySelector("form")

const nameInput = document.getElementById("name")
const roleInput = document.getElementById("role")
const bioInput = document.getElementById("bio")
const photoInput = document.getElementById("photo")

const user_manager = {
    user: [],

    init: function () {
        form.addEventListener("submit", this.submitForm.bind(this))
    },

    submitForm: function (e) {
        e.preventDefault()
        this.adduser()
    },

    adduser: function () {
        this.user.push({
            name: nameInput.value,
            role: roleInput.value,
            bio: bioInput.value,
            photo: photoInput.value
        })

        form.reset()
        console.log(this.user)
    },
        renderUI:function() {
            this.user.forEach(function (user) {
                const cardsContainer = document.querySelector(".cards")

                function createCard() {
                    const card = document.createElement("div")
                    card.classList.add("card")

                    const img = document.createElement("img")
                    img.src = user.photo
                    const h3 = document.createElement("h3")
                    h3.innerText = user.name

                    const role = document.createElement("p")
                    role.innerText = user.role

                    const bio = document.createElement("p")
                    bio.innerText = user.bio

                    // append inside card
                    card.append(img, h3, role, bio)

                    // append card to container
                    cardsContainer.appendChild(card)
                }

                createCard()
            })
        }
}

user_manager.init()