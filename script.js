const API_URL =
"https://script.google.com/macros/s/AKfycbz4Br-4zfdg8jXEcWckE7PSSypFoXspLX-mApjpirJOnL8aDlZepH110XT-HJLNrPCWoQ/exec";

let SETTINGS = {
upi: "avnish.dev@ptyes",
whatsapp: "919455030291"
};

/* DATE FORMAT */

function formatDate(dateString){

if(!dateString) return "";

let date = new Date(dateString);

if(isNaN(date)) return dateString;

return date.toLocaleDateString('hi-IN',{

day:'numeric',
month:'long',
year:'numeric'

});

}

async function fetchData(){

try{

const response =
await fetch(API_URL);

const data =
await response.json();

loadSettings(data.settings || []);

loadPayments(data.payments || []);

loadExpenses(data.expenses || []);

loadNews(data.news || []);

loadTopNews(data.news || []);

loadDocuments(data.documents || []);

}catch(error){

console.log(error);

}

}

/* SETTINGS */

function loadSettings(settings){

for(let i=1; i<settings.length; i++){

let row = settings[i];

SETTINGS[row[0]] = row[1];

}

}

/* PAYMENTS */

function loadPayments(payments){

let table =
document.getElementById("paymentTable");

table.innerHTML = "";

let totalExpense = 0;
let totalReceived = 0;

for(let i=1; i<payments.length; i++){

let row = payments[i];

let name = row[0] || "";

let total =
Number(row[1]) || 0;

let paid1 =
Number(row[2]) || 0;

let paid2 =
Number(row[3]) || 0;

let paid3 =
Number(row[4]) || 0;

let paid =
paid1 + paid2 + paid3;

let remaining =
total - paid;

let status =
remaining <= 0
? "Advance"
: "Pending";

totalExpense += total;
totalReceived += paid;

let button =
remaining <= 0

? `<button class="paybtn uploadbtn">
Paid
</button>`

: `
<button class="paybtn"
onclick="openPayPopup(${remaining})">

Pay ₹${remaining}

</button>
`;

table.innerHTML += `

<tr>

<td>${name}</td>

<td>₹${total}</td>

<td class="green">
₹${paid}
</td>

<td class="${remaining > 0 ? 'red':'green'}">
₹${remaining}
</td>

<td>

<span class="status
${remaining <= 0 ? 'advance':'pending'}">

${status}

</span>

</td>

<td>

${button}

<br><br>

<button class="paybtn uploadbtn"
onclick="openForm('${name}','${remaining}')">

Screenshot

</button>

</td>

</tr>

`;

}

document.getElementById("receivedAmount")
.innerText =
`₹${totalReceived}`;

document.getElementById("remainingAmount")
.innerText =
`₹${totalExpense - totalReceived}`;

}

/* EXPENSES */

function loadExpenses(expenses){

let table =
document.getElementById("expenseTable");

table.innerHTML = "";

let total = 0;

for(let i=1; i<expenses.length; i++){

let row = expenses[i];

let amount =
Number(row[2]) || 0;

total += amount;

table.innerHTML += `

<tr>

<td>${formatDate(row[0])}</td>

<td>${row[1]}</td>

<td class="red">
₹${amount}
</td>

<td>${row[3]}</td>

</tr>

`;

}

document.getElementById("totalExpense")
.innerText =
`₹${total}`;

}

/* NEWS */

function loadNews(news){

let container =
document.getElementById("newsContainer");

container.innerHTML = "";

for(let i = news.length - 1; i >= 1; i--){

let row = news[i];

container.innerHTML += `

<div class="news-card">

<div class="news-date">
${formatDate(row[0])}
</div>

<div class="news-text">
${row[1]}
</div>

</div>

`;

}

}

/* TOP NEWS */

function loadTopNews(news){

let marquee =
document.getElementById("topNews");

let latestNews = [];

for(let i = news.length - 1; i >= 1; i--){

latestNews.push(news[i][1]);

if(latestNews.length == 2){
break;
}

}

marquee.innerHTML =
latestNews.join(" ⚫ ");

}

/* DOCUMENTS */

function loadDocuments(documents){

let container =
document.getElementById("documentContainer");

container.innerHTML = "";

for(let i=1; i<documents.length; i++){

let row = documents[i];

let title = row[0];
let link = row[1];

container.innerHTML += `

<div class="doc-card">

<div class="doc-icon">
📄
</div>

<h4>
${title}
</h4>

<a href="${link}"
target="_blank">

Open Document

</a>

</div>

`;

}

}

/* PAYMENT POPUP */

function openPayPopup(amount){

document.getElementById("payPopup")
.style.display = "flex";

document.getElementById("upiInput")
.value = SETTINGS.upi;

document.getElementById("upiPayBtn")
.href =
`upi://pay?pa=${SETTINGS.upi}&pn=CourtPayment&am=${amount}&cu=INR`;

}

function closePayPopup(){

document.getElementById("payPopup")
.style.display = "none";

}

function copyUPI(){

let input =
document.getElementById("upiInput");

input.select();

document.execCommand("copy");

alert("UPI ID Copied");

}

/* SCREENSHOT POPUP */

function openForm(name, amount){

document.getElementById("popup")
.style.display = "flex";

document.getElementById("name")
.value = name;

document.getElementById("amount")
.value = amount;

}

function closeForm(){

document.getElementById("popup")
.style.display = "none";

}

/* CLOSE POPUP */

window.onclick = function(event){

let popup =
document.getElementById("popup");

let payPopup =
document.getElementById("payPopup");

if(event.target == popup){

popup.style.display = "none";

}

if(event.target == payPopup){

payPopup.style.display = "none";

}

}

/* WHATSAPP */

function sendWhatsApp(){

let name =
document.getElementById("name").value;

let amount =
document.getElementById("amount").value;

let comment =
document.getElementById("comment").value;

let msg =
`Payment Done

नाम: ${name}

Amount: ₹${amount}

Comment: ${comment}

Screenshot attach कर रहा हूँ।`;

window.open(
`https://wa.me/${SETTINGS.whatsapp}?text=${encodeURIComponent(msg)}`,
'_blank'
);

}

/* START */

fetchData();

/* AUTO REFRESH */

setInterval(fetchData,30000);
