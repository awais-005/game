import { switchMode, latestMove, startPolling, expert, startbtn } from "./script.js"
import { randomMove } from "./skills.js";

export const player_ID = Math.floor(Math.random() * 1000000000);
export let playerType = undefined;
export let roomID = undefined;

export async function getRoomDetails() {
    let response = await fetch(`http://127.0.0.1:8000/getroomdetails/${roomID}`);
    if (response.ok) {
        response = await response.json();
        //console.log("In getRoomDetails();", response);
        return response;
    }
}

async function statusUpdate(waitForFriend) {
    getRoomDetails().then((response) => {
        let roomNewState = response.roomDetails.status;
        if (roomNewState === "in progress" && playerType === "creator") {
            resText.innerText = "Your friend has joined the room.";
            startbtn.disabled = false;  
            startbtn.innerText = "Start";
            clearInterval(waitForFriend);
            console.log("Stopped Calling StatusUpdate()");
        }
    });
    getRoomDetails().catch(() => {
        resText.innerText = "Caught response: " + response;
    });
}

async function reqServerToCreateRoom() {
    let response = await fetch(`http://127.0.0.1:8000/newroom/${roomID}/${player_ID}`);
    if (response.ok) {
        response = await response.json();
        resText.innerText = `${response.status}\n${response.roomDetails.status}`;
        let waitForFriend = setInterval(async () => {
            await statusUpdate(waitForFriend);
            console.log("Called statusUpdate()");
        }, 1000);
    }
    else {
        resText.innerText = `Could not create room: ${response}`;
    }
}

export function createRoom() {
    playerType = "creator";
    roomID = Math.floor(Math.random() * 10000000);
    setupForOnline();
    reqServerToCreateRoom();
}

function hideOfflineStuff() {
    document.getElementById("toss").style.display = 'none';
    update.style.display = 'flex';
    update.style.transform = "scale(1) translate(0%)";
    update.innerText = ""
    expert.style.display = "none";
    document.getElementById("mode").style.justifyContent = "center";
    document.getElementById("mode").innerText = "vs @user";
    document.getElementById("exit").style.display = "block";
}

function setupForOnline() {
    const playOnline = document.querySelector('.playOnline');
    playOnline.style.transform = 'translate(200%, -90%) scale(0)';
    setTimeout(() => {
        playOnline.style.display = 'none'
    }, 300);
    document.querySelector(".joinCreateResponse").style.display = "flex";
    requestAnimationFrame(() => {
        document.querySelector(".joinCreateResponse").style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

const update = document.getElementById('update');
async function reqServerToJoinRoom() {
    setupForOnline();
    let response = await fetch(`http://127.0.0.1:8000/addplayer/${roomID}/${player_ID}`)
    if (response.ok) {
        resText.innerText = "You have joined the room. Wait until creator starts the Match.";
        document.querySelector(".play").style.display = "none";
        let waitForStart = setInterval(async () => {
            await startMatch(waitForStart);
            console.log("Called StartMatch();");
        }, 1000);
    }
    else {
        resText.innerText = `Failed to join! ${response}`;
        console.log(response);
        response = await response.json();
        resText.innerText = `Failed to join! ${response}`;
    }
}

export async function startMatch(waitForStart) {
    let response = await fetch(`http://127.0.0.1:8000/start/${roomID}/${playerType}`);
    if (response.ok) {
        response = await response.json();
        // console.log(response);
        let start = response.roomDetails.startMatch;
        if (playerType === "invited") {
            if (start) {
                switchMode();
                hideOfflineStuff();
                if (response.roomDetails.currentTurn === "creator") {
                    await startPolling();
                } else {
                    update.innerText = "You go first!!!"
                }
                resText.innerText = "Match has been started.";
                clearInterval(waitForStart);
                // bring animation of hide response popup
                document.querySelector(".joinCreateResponse").style.display = 'none';
            }
        }
        else if (playerType === "creator") {
            if (start) {
                switchMode();
                hideOfflineStuff();
                resText.innerText = "The Match has started.";
                document.querySelector(".joinCreateResponse").style.display = 'none';
                let first = Math.floor(Math.random()*100) % 2 == 0 ? "creator" : "invited" ;
                if(first === "invited") {
                    await startPolling();
                } else {
                    update.innerText = "You go first!!!"
                }
                await reqServerToSetTurn(first, 0);
            } else {
                resText.innerText = "Something went wrong.";
            }
        }
    }
    else {
        resText.innerText = `Response isn't ok! ${response}`;
    }
}

const resText = document.querySelector(".resText");
export function joinRoom(room) {
    playerType = "invited";
    roomID = room; // storing room Id as global variable from user input
    reqServerToJoinRoom();
}

export async function reqServerToSetTurn(currentTurn, move = 0) { // Send current move each time.
    if (latestMove !== 0) {
        move = latestMove;
    }
    let response = await fetch(`http://127.0.0.1:8000/setturn/${roomID}/${currentTurn}/${move}`); // roomID is globally defined.
    if (response.ok) {
        response = await response.json();
        return response;
    } else {
        console.log(`http://127.0.0.1:8000/setturn/${roomID}/${currentTurn}/${move}`);
        console.log("setTurn failed.");
    }
}