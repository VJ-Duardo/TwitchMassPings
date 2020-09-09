var channelInput = document.getElementById('channel');
var nameNumInput = document.getElementById('nameNum');
var chatterTypeSelect = document.getElementById('chatterType');
var outputArea = document.getElementById('output');

var startButton = document.getElementById('startButton');
startButton.onclick = start;

async function start(){
	if (typeof channelInput.value === 'undefined' || channelInput.value === "")
		return;

	let chatterObj;

	try{
		let response = await fetch('https://tmi.twitch.tv/group/user/'+channelInput.value+'/chatters');
		chatterObj = await response.json();
	} catch(e) {
		outputArea.value = "Something went wrong";
		return;
	}
	
	outputArea.value = chatterObj.chatters[chatterTypeSelect.value].sort(() => Math.random() - 0.5).slice(0, parseInt(nameNumInput.value)).join(' ');
}