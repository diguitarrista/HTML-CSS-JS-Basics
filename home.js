const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

// ACCOUNT
var accountHistoryJSON = localStorage.getItem("accountHistory");

// Define the Account class
class Account {
  constructor(name, password, accountNumber, agency, balance, operations) {
    this.name = name;
    this.password = password;
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
    this.operations = operations;
  }
}
// Function to create a new account with random values
function createAccount(name, password) {
  // Generate random account number and agency
  const accountNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const agency = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  // Convert to string to verify latter
  const accountNumberStr = accountNumber.toString();
  const agencyStr = agency.toString();
  // Create a new Account object with the input values and random values
  const account = new Account(name, password, accountNumberStr, agencyStr, 0, []);
  // Return the account information
  return account;
}

var accs = [];
// Push each account object into the accounts array
accs.push(new Account("John Smith", "123456", "1234", "123", 1000, []));
accs.push(new Account("Jane Doe", "abc123", "5678", "567", 5000, []));
accs.push(new Account("Bob Johnson", "password456", "1111", "111", 2500, []));
accs.push(new Account("Sara Lee", "password789", "2222", "222", 7500, []));
accs.push(new Account("Tom Smith", "pswrd987", "3333", "333", 3000, []));

// Get the form elements and add event listeners to the submit and reset buttons
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

submitBtn.addEventListener('click', function() {
  // Get the input values from the form
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  // Convert to string to verify latter
  const nameStr = name.toString();
  const passwordStr = password.toString();
  // Call the createAccount() function with the input values
  const newAccount = createAccount(nameStr, passwordStr);
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
  // Add the new account to the array
  accs.push(newAccount);
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
  verify(accs);
  resetForm();
});

// Function to handle form reset
function resetForm() {
  document.getElementById("verifyAccNumber").value = "";
  document.getElementById("verifyAgency").value = "";
  document.getElementById("verifyPassword").value = "";
}

function verify(accounts) {
  // Retrieve input field values
  var accountNumberStr = document.getElementById("verifyAccNumber").value;
  var agencyStr = document.getElementById("verifyAgency").value;
  var passwordStr = document.getElementById("verifyPassword").value;
  // Convert to string to verify
  var accountNumberLog = accountNumberStr.toString();
  var agencyNumberLog = agencyStr.toString();
  var passwordLog = passwordStr.toString();
  // Find the account
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accountNumberLog) {
      var tryLoggedAccount = accounts[i];
    }
  }
  // Verify the account
  if (tryLoggedAccount === null) {
    alert("Account not found");
  } else {
    // Check if the entered agency and password match the stored values
    if (tryLoggedAccount.agency === agencyNumberLog && tryLoggedAccount.password === passwordLog) {
      // Account verified
      alert("Account verified!");
      loggedInAccount = account;
      localStorage.setItem('loggedInAccount', JSON.stringify(tryLoggedAccount));
      // Redirect to account.html page
      window.location.href = "operations.html";
    } else {
      // Incorrect agency or password
      alert("Incorrect agency or password. Please try again.");
      // Call resetForm() function to clear the form
      resetForm();
    }
  }
}
// Store the accounts
localStorage.setItem('storedAccounts', JSON.stringify(accs));
