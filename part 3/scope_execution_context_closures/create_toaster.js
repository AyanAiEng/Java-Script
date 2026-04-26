function create_toaster(config) {
    return function (str) {
        let div = document.createElement("div");
        div.textContent = str;

        div.className = `inline-block ${
            config.theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
        } px-6 py-3 rounded shadow-lg pointer-events-none`;

        document.querySelector(".parent").appendChild(div);

        setTimeout(() => {
            document.querySelector(".parent").removeChild(div);
        }, config.duration * 1000);
    };
}

let toaster = create_toaster({
    positionX: "right",
    positionY: "left",
    theme: "light",
    duration: 3,
});

toaster("Download done");

setTimeout(() => {
    toaster("your request is rejected");
}, 6000); // manually set delay