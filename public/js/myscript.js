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
// var alarms = document.querySelectorAll("#alComp");
// var alRow = document.querySelectorAll("#alRow")
// console.log(alRow);
// var currentdate = new Date(); 
// var today =  currentdate.getFullYear()+"-"+ (currentdate.getMonth()+1)
// if (currentdate.getDate()<10){
//   today = today+ "-0"+currentdate.getDate();
// }
// else{
//   today = today+ "-"+currentdate.getDate();
// }
// let dueToday = []
// console.log(today);
// alarms.forEach(function(alarm,index){
//   alarm = JSON.parse(alarm.value);
//   console.log(alarm.date,today);
//   if (alarm.date===today){
//     let alTime = parseInt(alarm.time[0]+alarm.time[1]);
//     let alTimemin = parseInt(alarm.time[3]+alarm.time[4]);
//     console.log(alTimemin,currentdate.getMinutes());
//     if(alTime<=currentdate.getHours() || alarm.complete==true){
//       if (alarm.complete==true){
//         console.log("in if true")
//         var ptd = document.createElement("td");
//         ptd.innerText = "Done";
//         alRow[index].appendChild(ptd);
//       }
//       else {
//         console.log("in else");
//         if(alTimemin<currentdate.getMinutes()){
//         console.log("in else if");
//         const compRequest = new XMLHttpRequest();
//           compRequest.open("POST","http://localhost:5000/complete");
//           compRequest.setRequestHeader("Content-Type","application/json");
//           // console.log(value);
//             compRequest.send(JSON.stringify({text:alarm.text,complete:alarm.complete}));
          
//           compRequest.addEventListener("load",function(){
//             console.log("bring back after COMPLETE");
//             if (compRequest.status===200){
//               console.log("task completed successfully");
//               window.location.reload();
//           }
//           else{
//             console.log("error in getting all");
//           }
    
//         })
      
//     }
//     else{
//       console.log("in interval");
//       let Id = setInterval(function(){
//         var currentdate = new Date(); 
//         var datetime = currentdate.getHours() + ":"  
//                       + currentdate.getMinutes()
//         if (alarm.time===datetime){
//           alert("Its time for "+alarm.text + " at "+alarm.time);
//           clearInterval(Id);
//           const compRequest = new XMLHttpRequest();
//           compRequest.open("POST","http://localhost:5000/complete");
//           compRequest.setRequestHeader("Content-Type","application/json");
//           // console.log(value);
//             compRequest.send(JSON.stringify({text:alarm.text,complete:alarm.complete}));
          
//           compRequest.addEventListener("load",function(){
//             console.log("bring back after COMPLETE");
//             if (compRequest.status===200){
//               console.log("task completed successfully");
//               window.location.reload();
//           }
//           else{
//             console.log("error in getting all");
//           }
//         })
//       }
//         console.log(alarm.time,datetime);
//       },1000)

//     }

//     }
//     }
//     else{
//       console.log("in interval");
//       let Id = setInterval(function(){
//         var currentdate = new Date(); 
//         var datetime = currentdate.getHours() + ":"  
//                       + currentdate.getMinutes()
//         if (alarm.time===datetime){
//           alert("Its time for "+alarm.text + " at "+alarm.time);
//           clearInterval(Id);
//           const compRequest = new XMLHttpRequest();
//           compRequest.open("POST","http://localhost:5000/complete");
//           compRequest.setRequestHeader("Content-Type","application/json");
//           // console.log(value);
//             compRequest.send(JSON.stringify({text:alarm.text,complete:alarm.complete}));
          
//           compRequest.addEventListener("load",function(){
//             console.log("bring back after COMPLETE");
//             if (compRequest.status===200){
//               console.log("task completed successfully");
//               window.location.reload();
//           }
//           else{
//             console.log("error in getting all");
//           }
//         })
//       }
//         console.log(alarm.time,datetime);
//       },1000)

//     }
    
    

//     console.log(alarm)
//   }
// })





















// // var table = document.querySelector("#table1");
// // const ip = document.getElementById("ip");
// // var strike=false;
// // const save= document.getElementById("save");
// // var fromBut=false;
// // // var heroUrl = "https://todoappexpresswithlogin.herokuapp.com/"
// // var heroUrl = "http://localhost:3000/"  //TODO CHANGE URL BEFORE DEPLOYMENT
// // ip.addEventListener("keypress",function(event){
// //   if(event.key=="Enter"){
// //   fromBut=true;
// //   const value = ip.value;
// //   const request = new XMLHttpRequest();
// //   console.log("Inside save, sending post request");
// //   request.open("POST",heroUrl+"todo");
// //   request.setRequestHeader("Content-Type","application/json");
// //   request.send(JSON.stringify({text:value,strike:strike}));

// //   request.addEventListener("load",function(){
// //     console.log("in request event listener");
// //     if(request.status===200){
// //       taskDisplay(value,fromBut);
// //       ip.value='';

// //       //TODO add request Listener
// //      }
// //     else{
// //       console.log("error occured");
// //     }
// //   })
// // }
// // })


// // const getAllTodoRequests = new XMLHttpRequest();
// // console.log("Sending get request");
// // getAllTodoRequests.open("GET",heroUrl+"todo");
// // getAllTodoRequests.send();

// // getAllTodoRequests.addEventListener("load",function(){
// //   fromBut=false;
// //   console.log("in getAllTodoRequests event listener");
// //   if (getAllTodoRequests.status===200){
// //     var todos = JSON.parse(getAllTodoRequests.responseText);
// //     todos.forEach(function(value){
// //       console.log(value);
// //       taskDisplay(value,fromBut)
// //     })
// //   }
// //   else{
// //     console.log("error in getting all");
// //   }
// // })

// // function taskDisplay(value,fromBut){
// //   var Row = document.createElement("tr");
// //   var celltxt = document.createElement("td");
// //   var celltxt2 = document.createElement("td");
// //   var compButton = document.createElement("button");
// //   var delButton = document.createElement("button");
// //   var editButton = document.createElement("button");
// //   var delIco = document.createElement("i");
// //   var editIco = document.createElement("i");
// //   var compIco = document.createElement("i");

// //   delIco.className="fa fa-trash";
// //   editIco.className="fa fa-pencil";
// //   compIco.className = "fa fa-check";
  
// //   // compButton.innerText = "Done";
// //   // // delButton.innerText = "Delete";
// //   // editButton.innerText = "Edit";
  

// //   if (fromBut){
// //   celltxt.innerText = value;
// //   celltxt.classList.add("p");
// //   }
// //   else{
// //     celltxt.innerText = value.text;
// //     if(value.strike===true){
// //       celltxt.style.textDecoration = "line-through";
// //     }
// //     celltxt.classList.add("p");
// //   }
// //   delButton.appendChild(delIco);
// //   editButton.appendChild(editIco);
// //   compButton.appendChild(compIco);
// //   celltxt2.appendChild(compButton);
// //   celltxt2.appendChild(editButton);
// //   celltxt2.appendChild(delButton);
// //   Row.appendChild(celltxt);
// //   Row.appendChild(celltxt2);
// //   table.appendChild(Row);

// //   // parent.appendChild(elem);
// //   // parent.appendChild(btn);
// //   delButton.addEventListener("click",function(){
// //     deleter(value,fromBut,Row)
// //     });
// //   editButton.addEventListener("click",function(){
// //     editor(value,fromBut,celltxt);
// //   });
// //   compButton.addEventListener("click",function(){
// //     completer(value,fromBut,strike,celltxt);
// //   })
// // }


// // function deleter(value,fromBut,Row){
// //   const delRequest = new XMLHttpRequest();
// //   console.log("inside delete btn event listner");
// //   delRequest.open("POST",heroUrl+"delete");
// //   delRequest.setRequestHeader("Content-Type","application/json");
// //   console.log(value);
// //   if (fromBut){
// //     delRequest.send(JSON.stringify({text:value}));
// //   }
// //   else{
// //   delRequest.send(JSON.stringify({text:value.text}));
// //   }

// //   delRequest.addEventListener("load",function(){
// //     console.log("bring back after delete");
// //     if (delRequest.status===200){
// //     table.removeChild(Row);
    
// //   }
// //   else{
// //     console.log("error in getting all");
// //   }
// // })
// //     // taskDisplay(value,fromBut);
// //     // window.location.reload();
// //  }

// // function editor(value,fromBut,celltxt){
// //   const editRequest = new XMLHttpRequest();
// //   console.log("in edit btn");
// //   editRequest.open("POST",heroUrl+"edit");
// //   editRequest.setRequestHeader("Content-Type","application/json");
// //   console.log(value);
// //   var newValue = prompt("enter new value: ");
// //   if(fromBut){
// //     editRequest.send(JSON.stringify({text:value,ntext:newValue}));
// //   }
// //   else{
// //     editRequest.send(JSON.stringify({text:value.text,ntext:newValue}));
// //   }
// //   editRequest.addEventListener("load",function(){
// //     console.log("bring back after edit");
// //     if (editRequest.status===200){
// //     celltxt.innerText = newValue;
    
// //     }
// //     else{
// //       console.log("error in getting all");
// //     }
// //   })
// // }

// // function completer(value,fromBut,strike,celltxt){
// //   const compRequest = new XMLHttpRequest();
// //   console.log("in Comp button");
// //   compRequest.open("POST",heroUrl+"complete");
// //   compRequest.setRequestHeader("Content-Type","application/json");
// //   console.log(value);
// //   if(fromBut){
// //     compRequest.send(JSON.stringify({text:value,strike:strike}));
// //   }
// //   else{
// //     compRequest.send(JSON.stringify({text:value.text,strike:strike}));
// //   }
// //   compRequest.addEventListener("load",function(){
// //     console.log("bring back after COMPLETE");
// //     if (compRequest.status===200){
// //       celltxt.style.textDecoration = "line-through";
// //   }
// //   else{
// //     console.log("error in getting all");
// //   }
// //   })
// // }

// // //Built By Shubham Vora
