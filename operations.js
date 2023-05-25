const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const depositresetBtn = document.getElementById('deposit-resetBtn');
const withdrawresetBtn = document.getElementById('withdraw-resetBtn');
const transferresetBtn = document.getElementById('transfer-resetBtn');

depositresetBtn.addEventListener('click', function() {
  document.getElementById('depositValue').value = '';
  document.getElementById('depositPassword').value = '';
});

withdrawresetBtn.addEventListener('click', function() {
  document.getElementById('withdrawValue').value = '';
  document.getElementById('withdrawPassword').value = '';
});

transferresetBtn.addEventListener('click', function() {
  document.getElementById('accNumber').value = '';
  document.getElementById('agencyNumber').value = '';
  document.getElementById('transferValue').value = '';
  document.getElementById('trasnferPassword').value = '';
});

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

// Retrieve the stored account information from localStorage
const storedAccount = localStorage.getItem('loggedInAccount');

class Account {
  constructor(name, password, accountNumber, agency, balance) {
    this.name = name;
    this.password = password;
    this.accountNumber = accountNumber;
    this.agency = agency;
    this.balance = balance;
  }
}
var accounts = [];
// Push each account object into the accounts array
accounts.push(new Account("John Smith", "123456", "1234", "123", 1000));
accounts.push(new Account("Jane Doe", "abc123", "5678", "567", 5000));
accounts.push(new Account("Bob Johnson", "password456", "1111", "111", 2500));
accounts.push(new Account("Sara Lee", "password789", "2222", "222", 7500));
accounts.push(new Account("Tom Smith", "pswrd987", "3333", "333", 3000));

// Parse the stored account information back to an object
const newAccount = JSON.parse(storedAccount);

class Operations {
  constructor(account) {
    this.account = account;
    this.accountHistory = []; // Array to store deposit history
  }

  // Method to convert account history to JSON string
  getAccountHistoryJSON() {
    return JSON.stringify(this.accountHistory);
  }

  deposit(depositValue, password) {
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Update the account balance with the deposited value
    this.account.balance += depositValue;
    // Add the deposit information to the deposit history
    this.accountHistory.push({ depositValue: depositValue, timestamp: timestamp });
  }
  withdraw(withdrawValue, password) {
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Update the account balance with the deposited value
    this.account.balance -= withdrawValue;
    // Add the deposit information to the deposit history
    this.accountHistory.push({ withdrawValue: withdrawValue, timestamp: timestamp });
  }
  transfer(transferValue, accNumber, agencyNumber, password){
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Find the target account
    var targetAccount = findAccount(accNumber);
    //Add the transfer information to the target account history
    this.account.balance -= transferValue;
    this.accountHistory.push({ destinationAccountNumber: accNumber, transferValue: transferValue, timestamp: timestamp });
  }
  recieve(transferValue, sourceAccount){
    var timestamp = new Date().toLocaleString();
    this.balance += transferValue;
    this.accountHistory.push({ sourceAccountNumber: sourceAccount, recieveValue: transferValue, timestamp: timestamp });
  }
}

function findAccount(accountNumber) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accountNumber) {
      return accounts[i];
    }
  }
  return null; // If no account is found, return null
}

accountOperation = new Operations(newAccount);
// Get the deposit button and add a click event listener
document.getElementById("depositBtn").addEventListener("click", function() {
  // Get the deposit value and password entered by the user
  var depositValue = parseFloat(document.getElementById("depositValue").value);
  var password = document.getElementById("depositPassword").value;
  // Call the deposit method on the operations object with the deposit value and password
  if (accountOperation !== null) {
    if (password === newAccount.password) {
      accountOperation.deposit(depositValue, password);
      // Store account history in local storage
      var accountHistoryJSON = accountOperation.getAccountHistoryJSON();
      localStorage.setItem("accountHistory", accountHistoryJSON);
      localStorage.setItem('newAccount', JSON.stringify(newAccount));
      // Value deposited
      alert("Value deposited!");
    } else {
      // Incorrect password
      alert("Incorrect password. Please try again.");
    }
  }
});

// Get the deposit button and add a click event listener
document.getElementById("withdrawBtn").addEventListener("click", function() {
  // Get the deposit value and password entered by the user
  var withdrawValue = parseFloat(document.getElementById("withdrawValue").value);
  var password = document.getElementById("withdrawPassword").value;
  // Call the deposit method on the operations object with the deposit value and password
  if (accountOperation !== null) {
    if (password === newAccount.password) {
      accountOperation.withdraw(withdrawValue, password);
      // Store account history in local storage
      var accountHistoryJSON = accountOperation.getAccountHistoryJSON();
      localStorage.setItem("accountHistory", accountHistoryJSON);
      localStorage.setItem('newAccount', JSON.stringify(newAccount));
      // Value withdraw
      alert("Value withdrew!");
    }
    else {
      // Incorrect password
      alert("Incorrect password. Please try again.");
    }
  }
});

// Get the transfer button element from the DOM
const transferBtn = document.getElementById("transferBtn");
// Add a click event listener to the transfer button
transferBtn.addEventListener("click", function() {
  // Get the input values from the form
  const accNumber = document.getElementById("accNumber").value;
  const agencyNumber = document.getElementById("agencyNumber").value;
  const transferValue = document.getElementById("transferValue").value;
  const password = document.getElementById("trasnferPassword").value;

  targetAccount = findAccount(accNumber)
  targetAccount.balance += parseFloat(transferValue);

  const sourceAccount = newAccount.accountNumber
  targetOperation = new Operations(targetAccount);
  targetOperation.recieve(transferValue, sourceAccount);

  transferInfo.innerHTML = `
      <h1>Transfer Information</h1><br><br>
      <p><b>Account number: </b>${accNumber}</p><br><br>
      <p><b>Agency number: </b>${agencyNumber}</p><br><br>
      <p><b>Transfer value: </b>$ ${transferValue}</p><br><br>
      <p><b>Account balance: </b>$ ${targetAccount.balance}</p>
    `;
  if (accountOperation !== null) {
    if (password === newAccount.password) {
      // Call the transfer method with the input values
      accountOperation.transfer(transferValue, accNumber, agencyNumber, password);
      // Store account history in local storage
      var accountHistoryJSON = accountOperation.getAccountHistoryJSON();
      localStorage.setItem("accountHistory", accountHistoryJSON);
      localStorage.setItem('newAccount', JSON.stringify(newAccount));
        // Value trasnfered
        alert("Value transfered!");
    } else {
      // Incorrect password
      alert("Incorrect password. Please try again.");
    }
  }
});

