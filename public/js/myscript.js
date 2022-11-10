const socket = io('http://localhost:5000');
// const socket=io();
socket.on('message',text=>{
console.log("client",text)
})
document.querySelector("#submit").onclick = ()=>{
const text = document.querySelector("input").value;
const date = document.querySelector("#date").value;
const time = document.querySelector("#time").value;
var toSend = {text:text,date:date,time:time}
console.log(JSON.parse(userData));
userData = JSON.parse(userData);
socket.emit('message',toSend);
socket.emit("uid",userData);
}
socket.on("done",alarm=>{
console.log("done aya msg");
alert("Its time for "+alarm.text);
})
socket.on("ting",text=>{
console.log(text);
})
socket.on("response",text=>{
console.log(text);
})

setInterval(()=>{
    console.log("checking");
    let cooky = document.cookie;
    if(cooky.indexOf("CID")<0){
        console.log(cooky[cooky.indexOf("CID")+4]);
        alert("Session Timed Out");
        window.location.reload();
    }
},10000)
