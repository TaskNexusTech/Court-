const API_URL =
"https://script.google.com/macros/s/AKfycbz4Br-4zfdg8jXEcWckE7PSSypFoXspLX-mApjpirJOnL8aDlZepH110XT-HJLNrPCWoQ/exec";

const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

/* LOGIN */

function login(){

let user =
document.getElementById("username").value;

let pass =
document.getElementById("password").value;

if(
user === ADMIN_USER &&
pass === ADMIN_PASS
){

document.getElementById("loginBox")
.style.display = "none";

document.getElementById("adminPanel")
.style.display = "block";

}else{

alert("Wrong Login");

}

}

/* ADD NEWS */

async function addNews(){

let date =
document.getElementById("newsDate").value;

let text =
document.getElementById("newsText").value;

if(!date || !text){

alert("Date aur news likho");

return;

}

await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

type:"news",

date:date,

text:text

})

});

alert("News Added");

document.getElementById("newsText").value="";
}

/* ADD EXPENSE */

async function addExpense(){

let date =
document.getElementById("expenseDate").value;

let title =
document.getElementById("expenseTitle").value;

let amount =
document.getElementById("expenseAmount").value;

let details =
document.getElementById("expenseDetails").value;

await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

type:"expense",

date:date,

title:title,

amount:amount,

details:details

})

});

alert("Expense Added");

}

/* ADD DOCUMENT */

async function addDocument(){

let title =
document.getElementById("docTitle").value;

let link =
document.getElementById("docLink").value;

await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

type:"document",

title:title,

link:link

})

});

alert("Document Added");

}
