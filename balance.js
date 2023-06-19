const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

// Get the parent div to append the history entries
var historyDiv = document.getElementById("history");

// Parse the storedAccount string into an object
const account = localStorage.getItem('loggedAccount');
const accountInfo = JSON.parse(account); // Parse the JSON string into an object
const accountHistory = accountInfo.operations;

// Get the div element with the id "accInfo"
const divElement = document.getElementById("accountBalanceInfo");
// Set the innerHTML of the div to display the HTML string
divElement.innerHTML = `<h3>Account Information</h3>
                        <b>Name: </b>${accountInfo.name}<br>
                        <b>Account Number: </b>${accountInfo.accountNumber}<br>
                        <b>Agency: </b>${accountInfo.agency}<br>
                        <b>Balance: $ </b>${accountInfo.balance}`;

// Add the title
const titleH2 = document.createElement("h3");
titleH2.textContent = "Transactions";
historyDiv.appendChild(titleH2);

// Create a new div element
var entryDiv = document.createElement("div");
// Set the text content of the div to the deposit/withdraw value and timestamp

const table = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");

const headRow = tableHead.insertRow();
const typeHead = document.createElement("th");
typeHead.textContent = "Type";
headRow.appendChild(typeHead);
const amountHead = document.createElement("th");
amountHead.textContent = "Amount";
headRow.appendChild(amountHead);
const dateHead = document.createElement("th");
dateHead.textContent = "Date";
headRow.appendChild(dateHead);

// Loop through each object in the array and create a new div element for each entry
accountHistory.forEach(function(entry) {
  const row = tableBody.insertRow();
  const typeCell = row.insertCell();
  const amountCell = row.insertCell();
  if (entry.depositValue !== undefined) {
    typeCell.textContent = "Deposited";
    amountCell.textContent = "$" + entry.depositValue;
  } else if (entry.withdrawValue !== undefined) {
    typeCell.textContent = "Withdrawal";
    amountCell.textContent = "$" + entry.withdrawValue;
  } else if (entry.transferValue !== undefined) {
  typeCell.textContent = "Transferred to the account number " + entry.destinationAccountNumber;
  amountCell.textContent = "$" + entry.transferValue;
} else if (entry.recieveValue !== undefined) {
  typeCell.textContent = "Transferred from account number " + entry.sourceAccountNumber;
  amountCell.textContent = "$" + entry.recieveValue;
}
  
  const dateCell = row.insertCell();
  dateCell.textContent = entry.timestamp;

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  historyDiv.appendChild(table);
  // Append the new div element to the parent div
  historyDiv.appendChild(entryDiv);
  // Set text alignment
  typeCell.style.textAlign = "left";
  amountCell.style.textAlign = "right";
  dateCell.style.textAlign = "right";
});
