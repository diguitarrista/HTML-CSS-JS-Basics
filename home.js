const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

// ACCOUNT
const accounts = {}

// Define the Account class
class Account {
  constructor(name, password, accountNumber, agency, balance) {
    this.name = name;
    this.password = password;
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
  }
}
// Function to create a new account with random values
function createAccount(name, password) {
  // Generate random account number and agency
  const accountNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const agency = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

  // Create a new Account object with the input values and random values
  const account = new Account(name, password, accountNumber, agency, 0);

  // Store the account information in a dictionary
  const accountInfo = {
    name: account.name,
    password: account.password,
    accountNumber: account.accountNumber,
    agency: account.agency,
    balance: account.balance
  };
  // Return the account information
  return accountInfo;
}

// Get the form elements and add event listeners to the submit and reset buttons
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

submitBtn.addEventListener('click', function() {
  // Get the input values from the form
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // Call the createAccount() function with the input values
  const newAccount = createAccount(name, password);
  accounts[newAccount.accountNumber] = newAccount;

  // Access the div element to display the created account information
  const accountInfoDiv = document.getElementById('accountInfo');

  // Create a new paragraph element to display the account number and agency
  accountInfoDiv.innerHTML = `
      <br>
      <h3>Account information</h3><br>
      <p><b>Account number: </b>${newAccount.accountNumber}</p><br>
      <p><b>Agency number: </b>${newAccount.agency}</p><br>
    `;

  alert("Account created!");

  // Reset the form
  document.getElementById('name').value = '';
  document.getElementById('password').value = '';
});

resetBtn.addEventListener('click', function() {
  // Reset the form
  document.getElementById('name').value = '';
  document.getElementById('password').value = '';
});

// VERIFY ACCOUNT

// Add click event listener to submitAccBtn button
document.getElementById("submitAccBtn").addEventListener("click", function() {
  // Call verify() function to check account information
  verify();
  resetForm();
});

// Function to handle form reset
function resetForm() {
  document.getElementById("accountNumber").value = "";
  document.getElementById("agency").value = "";
  document.getElementById("password").value = "";
}

var loggedInAccount = null; // Variable to store the logged-in account
var acc = null; // Variable to store the instance of Operations

function verify() {
  // Retrieve input field values
  var accountNumberStr = document.getElementById("verifyAccNumber").value;
  var agencyStr = document.getElementById("verifyAgency").value;
  var password = document.getElementById("verifyPassword").value;

  // Convert accountNumber and agency to numbers
  var accountNumber = parseInt(accountNumberStr);
  var agency = parseInt(agencyStr);

  // Check if the entered account number exists in the accounts dictionary
  if (accountNumber in accounts) {
    var account = accounts[accountNumber];
    // Check if the entered agency and password match the stored values
    if (account.agency === agency && account.password === password) {
      // Account verified
      alert("Account verified!");
      // Store the logged-in account in the variable
      loggedInAccount = account;
      // Store the created account information in localStorage
      localStorage.setItem('loggedInAccount', JSON.stringify(loggedInAccount));
      // Redirect to account.html page
      window.location.href = "operations.html";
    } else {
      // Incorrect agency or password
      alert("Incorrect agency or password. Please try again.");
      // Call resetForm() function to clear the form
      resetForm();
    }
  } else {
    // Account not found
    alert("Account not found. Please check the account number.");
    // Call resetForm() function to clear the form
    resetForm();
  }
}
