//--------------------------------------------------- HTTP REQUEST --------------------------------------------------------
//  WILL NEVER THROW ERROR IN THE EXTENSION'S SIDE BUT ONLY ALLOW 1 WAY COMMUNNICATION

function SendDataHTTP(JsonizedString){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://127.0.0.1:80/'); //	The only usable port for Http request
	xhr.setRequestHeader("Content-Type", "application/json"); 
	xhr.send(JsonizedString);
}

async function asyncCall() {
	var delaysec = 10;
	var VidID = document.location.toString().substring(document.location.toString().indexOf("watch?v=") + 8);

	data = {                            //  Message Format, the order of the data is non-exchangeable
		"Act": 'MChad-Entry',           //  DON'T CHANGE THIS
		"UID": 'Youtube ' + VidID,      //  NOT USED AT THE MOMENT, BUT MIGHT BE USED LATER FOR IN-APP FILTERING
		"Tag": '',                      //  TAGS TO HELP IN-APP FILTERING
		"Stime": 'STIME 1',             //  TIMESTAMP IN HH:mm:ss FORMAT
		"Stext": 'HTTP REQ STEXT 1',    //  MAIN TEXT MESSAGE
		"CC": 'CF1111',                 //  COLOUR FOR THE CHARACTERS IN RGB HEX FORMAT WITHOUT THE #
		"OC": '0041A8'                  //  COLOUR FOR THE OUTLINE OF THE CHARACTERS IN RGB HEX FORMAT WITHOUT THE #
	};

	SendDataHTTP(JSON.stringify(data));
	console.log("HTTP SENDING1")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 2';
	data.Stext = 'HTTP REQ STEXT 2';
	data.CC = '';
	data.OC = '';
	SendDataHTTP(JSON.stringify(data));
	console.log("HTTP SENDING2")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 3';
	data.Stext = 'HTTP REQ STEXT 3';
	data.CC = '256ECE';
	data.OC = '209324';
	SendDataHTTP(JSON.stringify(data));
	console.log("HTTP SENDING3")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 4';
	data.Stext = 'HTTP REQ STEXT 4';
	data.CC = 'AD1AB2';
	data.OC = 'EA4E19';
	SendDataHTTP(JSON.stringify(data));
	console.log("HTTP SENDING4")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 5';
	data.Stext = 'HTTP REQ STEXT 5';
	data.CC = 'EFDD1A';
	data.OC = 'EF1A56';
	SendDataHTTP(JSON.stringify(data));
	console.log("HTTP SENDING5")
	await new Promise(resolve => setTimeout(resolve, delaysec));
}
//=====================================================================================================================





//----------------------------------------------- WebSocket Send ------------------------------------------------------
//  MORE PRONE TO ERROR BUT ALLOWS 2 WAY COMMUNICATION

async function asyncCall2() {
	var delaysec = 10;
	var VidID = document.location.toString().substring(document.location.toString().indexOf("watch?v=") + 8);

    data = {                            //  Message Format, the order of the data is non-exchangeable
		"Act": 'MChad-Entry',           //  DON'T CHANGE THIS
		"UID": 'Youtube ' + VidID,      //  NOT USED AT THE MOMENT, BUT MIGHT BE USED LATER FOR IN-APP FILTERING
		"Tag": '',                      //  TAGS TO HELP IN-APP FILTERING
		"Stime": 'STIME 1',             //  TIMESTAMP IN HH:mm:ss FORMAT
		"Stext": 'Websocket STEXT 1',   //  MAIN TEXT MESSAGE
		"CC": 'CF1111',                 //  COLOUR FOR THE CHARACTERS IN RGB HEX FORMAT WITHOUT THE #
		"OC": '0041A8'                  //  COLOUR FOR THE OUTLINE OF THE CHARACTERS IN RGB HEX FORMAT WITHOUT THE #
	};

	ws.send(JSON.stringify(data));
	console.log("WS SENDING1")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 2';
	data.Stext = 'WebSocket STEXT 2';
	data.CC = '';
	data.OC = '';
	ws.send(JSON.stringify(data));
	console.log("WS SENDING2")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 3';
	data.Stext = 'WebSocket STEXT 3';
	data.CC = '256ECE';
	data.OC = '209324';
	ws.send(JSON.stringify(data));
	console.log("WS SENDING3")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 4';
	data.Stext = 'WebSocket STEXT 4';
	data.CC = 'AD1AB2';
	data.OC = 'EA4E19';
	ws.send(JSON.stringify(data));
	console.log("WS SENDING4")
	await new Promise(resolve => setTimeout(resolve, delaysec));

	data.Stime = 'STIME 5';
	data.Stext = 'WebSocket STEXT 5';
	data.CC = 'EFDD1A';
	data.OC = 'EF1A56';
	ws.send(JSON.stringify(data));
	console.log("SENDING5")
	await new Promise(resolve => setTimeout(resolve, delaysec));
}
//=============================================================================================================





//--------------------------------------------   TIME SEEKER   ------------------------------------------------
//   LATCH MESSAGE TRIGGER TO THE MAIN VIDEO PLAYER WHEN SEEKED (INCLUDED WHEN YOU PRESS LEFT OR RIGHT), IT ALSO IGNORE ADS

function LatchToVideo() {
    var MainVid = document.getElementsByTagName('video');
    for (let i = 0; i < MainVid.length; i++){
        if (MainVid[i].className == "video-stream html5-main-video"){
            MainVid[i].onseeked = function() {
                console.log(MainVid[i].currentTime); //   It's in seconds.miliseconds format
                // SEND THIS TO APP
			};
			MainVid[i].onpause = function() {
				console.log("VIDEO PAUSE")
				// SEND THIS TO APP
			};
			MainVid[i].onplay = function() {
				console.log("VIDEO PLAY")
				// SEND THIS TO APP
			};

			alert("Time Seeker Latched");
            break;
        }
    }
}
//=============================================================================================================





//--------------------------------------------   TIME SETTER   ------------------------------------------------
//   SET TIME WITH A NUMBER IN SECONDS

function SetTime() {
    if (timeinpt.valueAsNumber != NaN){
        if (timeinpt.valueAsNumber > 0){
			var MainVid = document.getElementsByTagName('video');
            for (let i = 0; i < MainVid.length; i++){
                if (MainVid[i].className == "video-stream html5-main-video"){
                    if (MainVid[i].duration > timeinpt.valueAsNumber){
                        MainVid[i].currentTime = timeinpt.valueAsNumber;
                    } else {
                        if (!MainVid[i].ended){
							MainVid[i].currentTime = MainVid[i].duration;
							/*
							MainVid[i].pause();	--> PROGRAMMATICALLY PAUSED THE VIDEO
							MainVid[i].play();	--> PROGRAMMATICALLY PLAY THE VIDEO
							*/
                        }
                    }
                    break;
                }
            }
        }
    }
}
//	REPLACE TIMEINPT.VALUE WITH INCOMING DATA FROM APP
//=============================================================================================================





//---------------------------------------   BOUNCING TRANSLATION   -------------------------------------------
//   BOUNCING INCOMING MESSAGE TO THE LIVE CHAT SUBMITTER 

function SendTextEnter(){
    var iframeChat = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframeChat.length; i++){
        if (iframeChat[i].id == "chatframe"){
			var sendBtn = iframeChat[i].contentDocument.querySelector("#send-button button",); 
			var ChatText = iframeChat[i].contentDocument.querySelector("#input.yt-live-chat-text-input-field-renderer",);
			ChatText.textContent = textinpt.value;
			ChatText.dispatchEvent(new InputEvent("input"));
			sendBtn.click();

			break;
        }
	}
}
//	REPLACE TEXTINPT.VALUE WITH INCOMING DATA FROM APP
//=============================================================================================================





//-------------------------------------   LISTEN TO LIVE CHAT BOX   -----------------------------------------
//   READING LIVE CHAT BOX NODE CHANGE
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
			mutation.addedNodes.forEach(element => {
				// console.log(element.innerText.split("\n")[0])			--> GET AUTHOR NAME
				// console.log(element.innerText.split("\n")[1]);			--> GET MESSAGE TEXT
				// console.log(element.getAttribute("author-type"));		--> GET MEMBER/ORDINARY PEEP/MOD etc....
				// SEND THEM TO APP OR FILTER FIRST BEFORE SENDING
			});
        }
    }
}
const config = { childList: true, subtree: false };
const observer = new MutationObserver(callback);

function ChatListener(){
    var iframeChat = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframeChat.length; i++){
        if (iframeChat[i].id == "chatframe"){
			var target = iframeChat[i].contentDocument.getElementsByClassName("style-scope yt-live-chat-item-list-renderer");
			for (let j = 0; j < target.length; j++){
				if (target[j].id == "items"){
						observer.observe(target[j], config);
					break;
				}
			}
			break;
        }
	}
}
//=============================================================================================================





var ws;
var btn1 = document.createElement('button');	//	TEST SENDING MESSAGE TO APP
btn1.onclick = TestSend;
btn1.textContent = "Test Message";
var btn2 = document.createElement('button');	//	TEST TRIGGER WHEN MAIN VIDEO IS PLAYED, PAUSED, CURRENT TIME CHANGED
btn2.onclick = LatchToVideo;
btn2.textContent = "Latch To Video";
var btn3 = document.createElement('button');	//	SET THE CURRENT TIME OF THE PLAYER
btn3.onclick = SetTime;
btn3.textContent = "Set Vid Time";
var timeinpt = document.createElement('input');	//	INPUT BOX TO SET THE MAIN VIDEO TIME
timeinpt.type = 'number';
var btn4 = document.createElement('button');	//	TEST SENDING MESSAGE TO THE LIVE CHAT
btn4.onclick = SendTextEnter;
btn4.textContent = "Send Text";
var textinpt = document.createElement('input');	//	INPUT BOX TO MESSAGE TO LIVE CHAT
var btn5 = document.createElement('button');	//	TEST CHAT BOX LISTENER
btn5.onclick = ChatListener;
btn5.textContent = "Chat Listener";

function TestSend() {
	if (document.location.toString().indexOf("www.youtube.com/watch?v=") != -1){
        ws = new WebSocket("ws://localhost:20083/"); //	This one is fixed, host 2008 for Mio's birthday 20 Aug and 3 for "Mi" in Mio
		ws.onopen = function (event) {
			asyncCall2();
		    };
        
        ws.onclose = function (event) {
            // TELL THE MESSENGER TO STOP SENDING DATA WITH A BOOLEAN HERE.
            };
		
		ws.onmessage = function (event) {
			//event.data.toString()
			// READ INCOMING MESSAGE AND REACT ACCORDINGLY DEPENDING ON THE "Act"
			//
			//
			//
			//
		};
		
		asyncCall();
		alert('DATA SENT');
	} else {
		alert('NOT IN YOUTUBE WATCH');
	}
}

function LoadButtons() {
	var target = document.getElementsByTagName("ytd-video-primary-info-renderer");
	var ExtContainer = document.createElement('div');
	ExtContainer.id = "Extcontainer";
	target[0].prepend(ExtContainer);
	ExtContainer.appendChild(btn1);
	ExtContainer.appendChild(btn2);
	ExtContainer.appendChild(btn3);
	ExtContainer.appendChild(timeinpt);
	ExtContainer.appendChild(btn4);
	ExtContainer.appendChild(textinpt);
	ExtContainer.appendChild(btn5);
}

async function WaitUntilLoad(){
	while (true){
		var target = document.getElementsByTagName("ytd-video-primary-info-renderer");
		if (target.length != 0){
			if (document.getElementById("Extcontainer") != null){
				var Extcontainer = document.getElementById("Extcontainer");
				Extcontainer.parentNode.removeChild(Extcontainer);
			}
			LoadButtons();
			break;
		} else {
			console.log("Not loaded yet");
		}
		await new Promise(resolve => setTimeout(resolve, 1000));
	}
}

WaitUntilLoad();