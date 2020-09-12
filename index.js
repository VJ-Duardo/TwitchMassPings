var channelInput = document.getElementById('channel');
var nameNumInput = document.getElementById('nameNum');
var chatterTypes = document.getElementsByClassName('chatterType');
var outputArea = document.getElementById('output');

var startButton = document.getElementById('startButton');
startButton.onclick = start;

async function start(){
    if (typeof channelInput.value === 'undefined' || channelInput.value === "")
        return;

    let chatterObj;

    try{
        let response = await fetch('https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/group/user/'+channelInput.value.toLowerCase()+'/chatters');
        chatterObj = await response.json();
    } catch(e) {
        outputArea.value = "Something went wrong";
        return;
    }
    
    let nameList = [];
    for (let i=0; i<chatterTypes.length; i++){
        if (chatterTypes[i].checked)
            nameList = nameList.concat(chatterObj.chatters[chatterTypes[i].value]);
    }
    outputArea.value = nameList.sort(() => Math.random() - 0.5).slice(0, parseInt(nameNumInput.value)).join(' ');
}
