let startButton = document.querySelector(".start-button");



let colorsObj = {
    1: "green",
    2: "red",
    3: "blue",
    4: "yellow"
}

let level = 0;
let pattern = [];
let taps = 0;
let userPattern = [];




function newColor() {
    let color = colorsObj[Math.floor((Math.random() * 4) + 1)];
    return color;
}

function glow(color) {
    console.log(color)
    let quarter = document.querySelector(`.${color}`);
    quarter.classList.add(`${color}-glow`);

    setTimeout(() => {
        quarter.classList.remove(`${color}-glow`);
    }, 500);
}

function play(pattern, taps) {
    //change start button text
    startButton.innerHTML = "My Turn ...";
    startButton.style.boxShadow = "0px 0px 0px 0px #ff246d"
    startButton.style.backgroundColor = "#ca1313";
    taps = pattern.length
    document.querySelector(".taps").innerHTML = `Taps left: ${taps}`
    userPattern = [];
    pattern.forEach((color, index) => {
        setTimeout(() => {
            glow(color);
        }, (index + 1) * 1000)
    });
    setTimeout(() => {
        console.log(`userclick time`);
        startButton.innerHTML = "Your Turn!";
        startButton.style.boxShadow = "0px 0px 5px 1px #00d351"
        startButton.style.backgroundColor = "#00d351";
        startButton.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
        document.querySelector(".green").addEventListener("click", pushColorToUser);
        document.querySelector(".red").addEventListener("click", pushColorToUser);
        document.querySelector(".blue").addEventListener("click", pushColorToUser);
        document.querySelector(".yellow").addEventListener("click", pushColorToUser);
    }, (pattern.length * 1000) + 2000)


}


function start(level, pattern, userPattern, taps) {
    //remove eventlisterners
    removeListernerandothercrap();

    userPattern = [];
    taps = pattern.length + 1;
    level = pattern.length + 1;
    document.querySelector(".level").innerHTML = level;
    pattern.push(newColor());
    play(pattern, taps);

}

function check(pattern, userPattern) {
    console.log(`checking...`)
    if (pattern.length !== userPattern.length) {
        console.log(`false`)
        return false;
    }
    for (let i = 0; i < pattern.length; i++) {
        if (userPattern[i] !== pattern[i]) {
            console.log(`false`)
            return false;
        }
    }
    console.log(true)
    return true;
}



function pushColorToUser(e) {
    taps = pattern.length - userPattern.length - 1;
    console.log(taps)
    let color = e.target.classList[0];
    console.log(color)
    clicked(color);
    userPattern.push(color);
    document.querySelector(".taps").innerHTML = `Taps left: ${taps}`
    console.log(userPattern);
    if (taps <= 0) {
        let flag = check(pattern, userPattern);
        if (flag === true) {
            setTimeout(() => {
                start(level, pattern, [], taps);
            }, 2000)
            alert();
            console.log(`next level!`)
        }
        else {
            console.log(`wrong pattern`);
            document.querySelector(".level").innerHTML = `0`;
            removeListernerandothercrap();
            loseAlert();
            startButton.style.boxShadow = "0px 0px 10px 2px #df8f27"
            startButton.style.backgroundColor = "#df8f27";
            startButton.innerHTML = `Start Again?`;
            startButton.addEventListener("click", main);
            return;


        }
    }
}


function clicked(color) {

    if (!document.querySelector(`.${color}`).classList.contains("clicked")) {
        document.querySelector(`.${color}`).classList.add(`clicked`)
    }
    setTimeout(()=>{
        unclick();
    }, 200)
}

function unclick() {
    document.querySelector(`.green`).classList.remove("clicked")
    document.querySelector(`.red`).classList.remove("clicked")
    document.querySelector(`.blue`).classList.remove("clicked")
    document.querySelector(`.yellow`).classList.remove("clicked")
}


function removeListernerandothercrap() {

    startButton.removeEventListener("click", main);
    document.querySelector(".green").removeEventListener("click", pushColorToUser);
    console.log(`eventlisteners Removed`);
    document.querySelector(".red").removeEventListener("click", pushColorToUser);
    console.log(`eventlisteners Removed`);
    document.querySelector(".blue").removeEventListener("click", pushColorToUser);
    console.log(`eventlisteners Removed`);
    document.querySelector(".yellow").removeEventListener("click", pushColorToUser);
    unclick();
    console.log(`eventlisteners Removed`);
}

function alert() {
    let alert = document.querySelector(".alert");
    alert.innerHTML = "Correct! Next level..."
    alert.style.backgroundColor = "#FFAE45"
    alert.style.top = `160px`;
    setTimeout(() => {
        alert.style.top = `10px`;
    }, 2500)
}
function loseAlert() {
    let alert = document.querySelector(".alert");
    alert.innerHTML = "Wrong! Try again?"
    alert.style.backgroundColor = "#ff4545"
    alert.style.top = `160px`;
    setTimeout(() => {
        alert.style.top = `10px`;
    }, 2500)
}



//starting the game main function
function main() {
    startButton.innerHTML = `Staring Game...`
    level = 0;
    pattern = [];
    userPattern = [];
    start(level, pattern, userPattern, taps);


}

startButton.addEventListener("click", main);


