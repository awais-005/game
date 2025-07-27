import { brain_of_comp } from "./skills.js"
import { joinRoom, createRoom, startMatch, playerType, reqServerToSetTurn, getRoomDetails, roomID, player_ID } from "./serverReqs.js"
let boardState = ['', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
let turn = 0;
let wins = 0, losts = 0, draws = 0;
let gameMode = "offline";

export function switchMode() {
    if (gameMode === "online") {
        gameMode = "offline";
    } else {
        gameMode = "online";
    }
}

function checkResult(curr) {
    if (checkWin()) {
        let msg = "got default cuz something is off!"
        if (curr === playerType) {
            msg = "You won!";
            document.getElementById('nwon').innerText = ++wins;
        } else {
            msg = "You lost!";
            document.getElementById('nlost').innerText = ++losts;
        }
        document.getElementById("result").innerText = msg;
        document.querySelector('.gameover').style.display = 'flex';
        requestAnimationFrame(() => {
            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
        }, 100);
        return true;
    }
    if (gameover(turn)) {
        return true; // Stop further processing if the game is over
    }

}

function resetBoxes() {
    let boxes = document.querySelectorAll('.box')
    let i = 1;
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = '';
        box.textContent = `${i}`;
        box.style.backgroundColor = '#3E5F44';
        boardState[i] = ' ';
        i++;
    }
}

export function checkWin() {
    if ((boardState[1] == 'X' && boardState[2] == 'X' && boardState[3] == 'X') || (boardState[4] == 'X' && boardState[5] == 'X' && boardState[6] == 'X')
        || (boardState[7] == 'X' && boardState[8] == 'X' && boardState[9] == 'X') || (boardState[1] == 'X' && boardState[4] == 'X' && boardState[7] == 'X')
        || (boardState[2] == 'X' && boardState[5] == 'X' && boardState[8] == 'X') || (boardState[3] == 'X' && boardState[6] == 'X' && boardState[9] == 'X')
        || (boardState[1] == 'X' && boardState[5] == 'X' && boardState[9] == 'X') || (boardState[3] == 'X' && boardState[5] == 'X' && boardState[7] == 'X')) {
        return true;
    }
    else if ((boardState[1] == 'O' && boardState[2] == 'O' && boardState[3] == 'O') || (boardState[4] == 'O' && boardState[5] == 'O' && boardState[6] == 'O')
        || (boardState[7] == 'O' && boardState[8] == 'O' && boardState[9] == 'O') || (boardState[1] == 'O' && boardState[4] == 'O' && boardState[7] == 'O')
        || (boardState[2] == 'O' && boardState[5] == 'O' && boardState[8] == 'O') || (boardState[3] == 'O' && boardState[6] == 'O' && boardState[9] == 'O')
        || (boardState[1] == 'O' && boardState[5] == 'O' && boardState[9] == 'O') || (boardState[3] == 'O' && boardState[5] == 'O' && boardState[7] == 'O')) {
        return true;
    }
    else {
        return false;
    }
}

function displayboard(clickedBox, turn, position) {
    if (turn % 2 === 0) {
        clickedBox.innerHTML = '<i class="fa-solid fa-check fa-2xl" style="color: #ffffff;"></i>';
        clickedBox.style.backgroundColor = '#42af54';
        boardState[position] = 'O';
    } else {
        clickedBox.innerHTML = '<i class="fa-solid fa-xmark fa-2xl" style="color: #ffffff;"></i>';
        clickedBox.style.backgroundColor = '#ff5858';
        boardState[position] = 'X';
    }
    clickedBox.disabled = true;
}

export function gameover(turn) {
    if (turn >= 9) {
        document.querySelector('.gameover').style.display = "flex";
        requestAnimationFrame(() => {
            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
        }, 100);
        console.log(boardState);
        document.getElementById('ndrawn').innerText = ++draws;
        return true; // Indicate that the game is over
    }
    else {
        return false; // Game is not over yet
    }
}

let ref = 0;
let pattern = Math.floor(Math.random() * 10) % 3;
let tossWinner = 0; // 0 for computer, 1 for player
let tossResult = '';
let godMode = false
let toggled = false;
export const expert = document.getElementById("hard"); // Expert mode ON/Off
const showResult = document.getElementById('update'); // A container in status(the very outer one), in we print updates
const toss = document.getElementById("toss"); // A div that contains three dots and text="Click here to toss"
const threeDot = document.querySelector(".threeDot"); // button user want to on autoToss
const _state = document.getElementById('state'); // ON/OFF text inside toggle 
const tossToggle = document.querySelector('.outer'); // outer container of toggle
const faces = document.querySelectorAll('.faces'); // List of faces heads and tails
const backArrow = document.querySelector('.back'); // back arrow in autoToss container
const tossBlock = document.querySelector('#status'); // A widget that shows different thing like AutoToss, PleaseToss, Faces and Updates 
const board = document.querySelector('.main'); // Board container
const rematch = document.getElementById("rematch") // play again button after match ends

function offlineEvent(box) {
    if (showResult.innerText === 'Updates') {
        toss.style.transform = 'scale(1.2)';
        setTimeout(() => { toss.style.transform = 'scale(1)' }, 300);
        toss.style.fontSize = "1rem";
        return false; // returning because toss is not done.
    }
    else if (tossWinner % 2 === 0) {
        return false; // If it's the computer's turn, ignore player clicks
    }

    turn++;
    tossWinner++;

    // Reading the clicked box by position
    let position = Number(box.textContent);
    if (position == 5 && turn == 1) {
        ref == 1;
    }
    if (position == 5 && turn == 2) {
        ref = 5;
    }
    box.textContent = ''; // Clear any existing text
    displayboard(box, turn, position); // Display the board in the clicked box, also storing position

    if (checkWin()) {
        document.getElementById("result").innerText = "You won!";
        document.getElementById('nwon').innerText = ++wins;
        document.querySelector('.gameover').style.display = 'flex';
        requestAnimationFrame(() => {
            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
        }, 100);
        return false;
    }
    if (gameover(turn)) {
        return false; // Stop further processing if the game is over
    }
    startComputerTurn();
    return true;
}

threeDot.addEventListener('click', function () {
    if (gameMode === "online") {
        return;
    }
    toss.style.transform = "scale(0) translate(110%)";
    setTimeout(() => {
        toss.style.display = "none";
        document.querySelector('.autoToss').style.display = 'flex';
        setTimeout(() => {
            requestAnimationFrame(() => {
                document.querySelector('.autoToss').style.transform = 'scale(1) translate(0%)';
            });
        }, 100);
    }, 300);
});

tossToggle.addEventListener('click', function () {
    autoTossHandler();
});

function autoTossHandler() {
    console.log("Toss toggle clicked"); // For debugging purposes
    let innerCircle = document.querySelector('.inner');
    innerCircle.style.position = 'absolute';
    if (!toggled) {
        toggled = true;
        innerCircle.style.left = 'calc(100% - 1.75rem - 2.5px)';
        innerCircle.style.backgroundColor = '#ffee00ff';
        innerCircle.style.boxShadow = '0px 0px 10px 2px #ffee00ff';
        _state.innerText = 'On';
        _state.style.position = 'absolute';
        _state.style.left = '65%';
        console.log("Toggled to ON"); // For debugging purposes
        return;
    }
    else {
        toggled = false;
        innerCircle.style.left = '2.5px';
        innerCircle.style.backgroundColor = '#E8FFD7';
        innerCircle.style.boxShadow = '-5px -5px 10px 0px rgba(0, 0, 0, 0.404) inset';
        _state.innerText = 'Off';
        _state.style.position = 'absolute';
        _state.style.left = '85%';
        console.log("Toggled to OFF"); // For debugging purposes
        return;
    }
}

backArrow.addEventListener('click', function () {
    console.log("Back arrow clicked"); // For debugging purposes
    const autoToss = document.querySelector('.autoToss');
    autoToss.style.transform = "scale(0) translate(-110%)";
    setTimeout(() => { autoToss.style.display = "none" }, 300);
    if (toggled) {
        tossfunc('', toggled); // Call tossfunc with toggled state
        showResult.style.display = "flex";
        showResult.style.padding = "0 10px 0 25px";
        showResult.style.fontSize = "1rem";
        setTimeout(() => {
            requestAnimationFrame(() => {
                showResult.style.transform = "scale(1) translate(0%)";
            });
        }, 300);
    }
    else {
        toss.style.display = "flex";
        setTimeout(() => {
            requestAnimationFrame(() => {
                toss.style.transform = "scale(1) translate(0%)";
            });
        }, 300);
    }
});

toss.addEventListener('click', function (details) {
    if (gameMode === "online") {
        return;
    }
    else if (details.target.className === 'threeDot' || details.target.className === 'ri-more-2-fill') {
        return; // Ignore clicks on the three-dot icon
    }
    console.log(details.target.className, "\n", details.target); // For debugging purposes
    toss.style.transform = "scale(0) translate(-110%)";
    setTimeout(() => {
        toss.style.display = "none";
        faces.forEach((val) => {
            val.style.transform = "scale(0) translate(110%)";
            val.style.display = "block";
            setTimeout(() => {
                requestAnimationFrame(() => {
                    val.style.transform = "scale(1) translate(0%)";
                });
            }, 100);
        });
    }, 300);
});

function tossfunc(choice = '', toggled = false) {
    if (toggled && choice === '') {
        choice = Math.floor(Math.random() * 10) % 2 === 0 ? 'Heads' : 'Tails';
    }
    let res = Math.floor(Math.random() * 10) % 2 === 0 ? 'Heads' : 'Tails';
    if (choice === res) {
        tossResult = 'You won the toss!';
        tossWinner = 1; // Player wins the toss
    } else {
        tossResult = 'You lost the toss!';
        tossWinner = 0; // Computer wins the toss
        startComputerTurn(); // Start computer's turn immediately
    }

    if (!toggled) {
        faces.forEach((val) => {
            val.style.transform = "scale(0) translate(-110%)";
            setTimeout(() => {
                val.style.display = "none";
            }, 300);
        });
    }
    showResult.style.padding = "0 10px 0 25px";
    showResult.style.fontSize = "1.2rem";
    showResult.innerText = tossResult;
    showResult.style.display = "flex";
    setTimeout(() => {
        requestAnimationFrame(() => {
            showResult.style.transform = "scale(1) translate(0%)";
        });
    }, 300);
    setTimeout(() => {
        showResult.innerText = "Go!";
        showResult.style.fontSize = "1.7rem";
    }, 2000);
}

tossBlock.addEventListener('click', function (details) {
    let choice = details.target;
    if (choice.className !== 'faces') {
        return; // Ensure we only handle clicks on the faces (heads/tails)
    }
    choice = choice.innerText; // Get the text of the clicked face (heads/tails)
    tossfunc(choice);
});

export async function startPolling() {
    let pollingInterval = setInterval(async () => {
        let resp = await getRoomDetails();
        let size = resp.roomDetails.currentMove.length;
        if (size > turn) {
            const box = document.getElementById(`box${resp.roomDetails.currentMove[size - 1]}`);
            turn++;
            displayboard(box, turn, resp.roomDetails.currentMove[size - 1]);
            let pass = "";
            if (playerType === 'creator') {
                pass = "invited";
            } else {
                pass = "creator";
            }
            if (checkResult(pass)) {
                let rp = await fetch(`http://127.0.0.1:8000/resetroom/${roomID}`)
                if (rp.ok) {
                    showResult.innerText = "GameOver";
                } else {
                    showResult.innerText = "Failed to reset";
                }
                // Stop polling because it is your turn.
                clearInterval(pollingInterval);
                return;
            } else {
                showResult.innerText = "Now it's your turn";
                clearInterval(pollingInterval);
                // Stop polling because it is your turn.
                return;
            }
        } else {
            showResult.innerText = "Wait for @user";
        }
    }, 300);
}

// Fetching move from board.
board.addEventListener('click', async function (details) {
    if (details.target.className != 'box' || details.target.textContent == '') {
        console.log("ignored!")
        return ; // Ensure we only handle clicks on the boxes those aren't clicked yet
    }
    if (gameMode === "offline") {
        if (!offlineEvent(details.target)) {
            return;
        }
    }
    else if (gameMode === "online") {
        let curr_turn = undefined; // player turn on server.
        let movesList = [];
        let resp = await getRoomDetails();
        if (resp.roomDetails.currentMove.length >= 0) { // this condition would only work when response will be ok
            curr_turn = resp.roomDetails.currentTurn;
            movesList = resp.roomDetails.currentMove;
            turn = movesList.length;
        }
        else {
            document.querySelector(".resText").innerText = "Something went wrong: " + resp;
            document.querySelector(".joinCreateResponse").style.display = "flex";
            requestAnimationFrame(() => {
                document.querySelector(".joinCreateResponse").style.transform = 'scale(1) translate(-50%, -50%)';
            });
            return;
        }
        if (curr_turn !== playerType) {
            console.log("Wrong ignored!")
            return;
        }
        else {
            latestMove = Number(details.target.textContent);
            let flag = false;
            movesList.forEach((val) => {
                if (latestMove == val) {
                    flag = true;
                    return;
                };
            });
            if (flag) return;
            turn++;
            displayboard(details.target, turn, latestMove);

            // upload user's move on server
            await reqServerToSetTurn(playerType, latestMove);

            if (checkResult(curr_turn)) {
                showResult.innerText = "GameOver";
                return;
            }

            // keep on checking if opponent have played his move. 
            await startPolling();
        }
    }
});

// Computer's turn
function startComputerTurn() {
    if (tossWinner % 2 === 0) {
        setTimeout(function () {
            if (showResult.innerText === 'Updates') {
                return;
            }
            turn++;
            tossWinner++;
            let repeat = true;

            while (repeat && turn < 10) {
                let compMove = brain_of_comp(boardState, turn, ref, pattern, godMode);
                const C_box = document.getElementById('box' + compMove);
                console.log(
                    "computer:", compMove,
                    "\nLength of text:", C_box.textContent.length
                );
                if (C_box.textContent.length === 1) {
                    displayboard(C_box, turn, compMove);

                    if (checkWin()) {
                        document.getElementById("result").innerText = "Computer won!";
                        document.getElementById('nlost').innerText = ++losts;
                        document.querySelector('.gameover').style.display = 'flex';
                        requestAnimationFrame(() => {
                            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
                        }, 100);
                        return;
                    }
                    else if (gameover(turn)) {
                        console.log("I stopped it from line 283");
                        return; // Stop further processing if the game is over
                    }
                    repeat = false; // Stop the loop after a valid board
                    break; // Exit the loop once a valid board is made
                }
            }
        }, 300);
    }
}

expert.addEventListener('click', function () {
    if (gameMode === "online") {
        return;
    }
    else if (expert.innerText === 'Off') {
        godMode = true;
        expert.innerText = 'On';
        expert.style.backgroundColor = '#ffee00ff';
        expert.style.boxShadow = '0px 0px 10px 2px #ffee00ff';
    }
    else {
        godMode = false;
        expert.innerText = 'Off';
        expert.style.boxShadow = '0px 0px 0px 0px #ffee00ff';
        expert.style.backgroundColor = '#E8FFD7';
    }
});

function offlineRematch() {
    document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => {document.querySelector('.gameover').style.display = "none"}, 200);
    tossWinner = 0; // Reset toss winner
    if (!toggled) {
        showResult.innerText = 'Updates';
        showResult.style.transform = "scale(0) translate(110%)";
        setTimeout(() => { showResult.style.display = "none" }, 300);
        toss.style.display = "flex";
        requestAnimationFrame(() => {
            toss.style.transform = "scale(1) translate(0%)";
        });
    } else {
        tossfunc('', toggled); // Reset toss function with toggled state
    }
}

async function rematchPolling() {
    let checkForOpponent = setInterval(async () => {
        let response = await getRoomDetails();
        if (response.roomDetails.status === "in progress") {
            if (playerType === "creator") {
                let first = Math.floor(Math.random() * 100) % 2 === 0 ? "creator" : "invited";
                await reqServerToSetTurn(first, 0);
            }
            let e = await getRoomDetails(); // just to check current turn on server;
            if( e.roomDetails.currentTurn === playerType) {
                showResult.innerText = "You go first!!!";
            } 
            else { 
                showResult.innerText = "Wait for @user";
                startPolling();
            }
            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(0)";
            setTimeout(() => {
                document.querySelector('.gameover').style.display = "none";
                document.getElementById('result').innerText = "Match is Drawn!";
                document.getElementById("rematch").style.display = "block";
                document.getElementById("exit").style.display = "block";
            }, 200);
            clearInterval(checkForOpponent);
        }
    }, 300);
}

async function onlineRematch() {
    document.getElementById("exit").style.display = "none";
    document.getElementById("rematch").style.display = "none";
    let response = await fetch(`http://127.0.0.1:8000/addplayer/${roomID}/${player_ID}`);
    if (response.ok) {
        document.getElementById("result").innerText = "Waiting for opponent!";
        await rematchPolling();
    } else {
        document.querySelector(".joinCreateResponse").style.display = "flex";
        document.querySelector(".joinCreateResponse").style.transform = 'scale(1) translate(-50%, 50%)';
        document.querySelector(".resText").innerText = "Something went wrong: " + response.detail;
        
    }
    // player1 one player2 khali kr
    // screen pa button dikha play again and Exit
    // ak player Exit kra to dosry na bata dy k unna exit mar diya
}

rematch.addEventListener('click', async function () {
    turn = 0; // number of current turn
    if (gameMode === "offline") {
        offlineRematch();
    } else {
        onlineRematch();
    }
    resetBoxes();
});

// online section
export let latestMove = 0;
const playOnline = document.querySelector('.playOnline'); // Play Online Session
const menu = document.querySelector("#menuCon"); // menu in navbar
const sideBar = document.querySelector('.sidebar'); // the sidebar

sideBar.style.display = 'none';
menu.addEventListener('click', function () {
    if (sideBar.style.display === 'none') {
        sideBar.style.display = 'flex';
        requestAnimationFrame(() => {
            sideBar.style.transform = 'translate(0%, 0%)';
            menu.innerHTML = '<i class="fa-solid fa-xmark fa-sm"></i>'
        });
        requestAnimationFrame(() => { playOnline.style.transform = 'translate(200%, -90%) scale(0)'; });
        setTimeout(() => {
            playOnline.style.display = 'none';
        }, 300);
    } else {
        sideBar.style.transform = 'translate(150%, 0%)';
        setTimeout(() => {
            sideBar.style.display = 'none';
            menu.innerHTML = '<i class="fa-solid fa-bars" id="menu"></i>';
        }, 300);
    }
});

sideBar.addEventListener('click', function (details) {
    if (details.target.value === 'Online') {
        playOnline.style.display = "flex";
        requestAnimationFrame(() => {
            playOnline.style.transform = "translate(-50%, -50%) scale(1)";
        });
        sideBar.style.transform = 'translate(150%, 0%)';
        setTimeout(() => {
            sideBar.style.display = 'none';
            menu.innerHTML = '<i class="fa-solid fa-bars" id="menu"></i>';
        }, 300);
    }
});

const join = document.querySelector(".joinBtn");
join.addEventListener("click", async function () {
    const getRoom = document.querySelector('.roomInput');
    if (getRoom.value === "") {
        return;
    } else {
        joinRoom(getRoom.value);
    }
});

const create = document.querySelector(".createBtn");
create.addEventListener('click', function () {
    createRoom();
});

const exitBtn = document.getElementById("exit");
exitBtn.addEventListener('click', async () => {
    let rp = await fetch(`http://127.0.0.1:8000/leave/${roomID}/${player_ID}`);
    if (rp.ok) {
        location.reload();
    } else {
        console.log(rp);
    }
});

export const startbtn = document.querySelector('.play');
startbtn.disabled = true;
startbtn.addEventListener('click', async () => {
    await startMatch();
});

const dismissMsgPopup = document.querySelector('.joinCreateResponse');
dismissMsgPopup.addEventListener('click', function (dets) {
    if (dets.target.className !== "dismissMsg" && dets.target.className !== "fa-solid fa-xmark") {
        return;
    }
    dismissMsgPopup.style.transform = 'translate(-200%, -90%) scale(0)';
    setTimeout(() => { dismissMsgPopup.style.display = 'none' }, 300);
});

const dismissPopup = document.querySelector(".dismissBtn");
dismissPopup.addEventListener('click', function () {
    playOnline.style.transform = 'translate(200%, -90%) scale(0)';
    setTimeout(() => { playOnline.style.display = 'none' }, 300);
});