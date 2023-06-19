const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const depositresetBtn = document.getElementById('deposit-resetBtn');
const withdrawresetBtn = document.getElementById('withdraw-resetBtn');
const transferresetBtn = document.getElementById('transfer-resetBtn');

function resetDepositForm() {
  document.getElementById('depositValue').value = '';
  document.getElementById('depositPassword').value = '';
}

function resetWithdrawForm() {
  document.getElementById('withdrawValue').value = '';
  document.getElementById('withdrawPassword').value = '';
}

function resetTransferForm() {
  document.getElementById('accNumber').value = '';
  document.getElementById('agencyNumber').value = '';
  document.getElementById('transferValue').value = '';
  document.getElementById('trasnferPassword').value = '';
}

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

class Operations {
  constructor(account) {
    this.account = account;
  }

  deposit(depositValue, password) {
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Update the account balance with the deposited value
    this.account.balance += depositValue;
    // Add the deposit information to the deposit history
    this.account.operations.push({ depositValue: depositValue, timestamp: timestamp });
  }
  withdraw(withdrawValue, password) {
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Update the account balance with the deposited value
    this.account.balance -= withdrawValue;
    // Add the deposit information to the deposit history
    this.account.operations.push({ withdrawValue: withdrawValue, timestamp: timestamp });
  }
  transfer(accounts, transferValue, accNumber, agencyNumber, password){
    // Get the current timestamp
    var timestamp = new Date().toLocaleString();
    // Find the target account
    var targetAccount = findAccount(accounts, accNumber);
    //Add the transfer information to the target account history
    this.account.balance -= transferValue;
    this.account.operations.push({ destinationAccountNumber: accNumber, transferValue: transferValue, timestamp: timestamp });
  }
  recieve(transferValue, sourceAccount){
    var timestamp = new Date().toLocaleString();
    this.balance += transferValue;
    this.account.operations.push({ sourceAccountNumber: sourceAccount, recieveValue: transferValue, timestamp: timestamp });
  }
}

// Retrieve account history from local storage
var accountsString = localStorage.getItem("storedAccounts");
var loggedAccountString = localStorage.getItem("loggedInAccount");
// Convert to string to verify latter
var accounts = JSON.parse(accountsString);
var loggedAccount = JSON.parse(loggedAccountString);

function findAccount(accounts, accountNumber) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].accountNumber === accountNumber) {
      return accounts[i];
    }
  }
  return null; // If no account is found, return null
}
// Create an object from the class Operations
accountOperation = new Operations(loggedAccount);
// Get the deposit button and add a click event listener
document.getElementById("depositBtn").addEventListener("click", function() {
  // Get the deposit value and password entered by the user
  var depositValue = parseFloat(document.getElementById("depositValue").value);
  var password = document.getElementById("depositPassword").value;
  // Call the deposit method on the operations object with the deposit value and password
  if (accountOperation !== null) {
    if (password === loggedAccount.password) {
      accountOperation.deposit(depositValue, password);
      alert("Value deposited!");
      resetDepositForm();
      localStorage.setItem('loggedAccount', JSON.stringify(loggedAccount));
    } else {
      // Incorrect password
      alert("Incorrect password. Please try again.");
      resetDepositForm();
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
    if (password === loggedAccount.password) {
      accountOperation.withdraw(withdrawValue, password);
      // Value withdraw
      alert("Value withdrew!");
      resetWithdrawForm();
      localStorage.setItem('loggedAccount', JSON.stringify(loggedAccount));
    }
    else {
      // Incorrect password
      alert("Incorrect password. Please try again.");
      resetWithdrawForm();
      localStorage.setItem('loggedAccount', JSON.stringify(loggedAccount));
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
  // Find the target account
  targetAccount = findAccount(accounts, accNumber);
  
  if (targetAccount === null) {
    alert("Account not found");
    resetTransferForm();
  } else if (accNumber === loggedAccount.accountNumber){
    alert("You can't transfer to yourself");
    resetTransferForm();
  } else {
    // Add the value to the targetAccount
    targetAccount.balance += parseFloat(transferValue);
    // Transfer the value to the targetAccount
    const sourceAccount = loggedAccount.accountNumber
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
      if (password === loggedAccount.password) {
        // Call the transfer method with the input values
        accountOperation.transfer(accounts, transferValue, accNumber, agencyNumber, password);
        alert("Value transfered!");
        resetTransferForm();
        localStorage.setItem('loggedAccount', JSON.stringify(loggedAccount));
      } else {
        // Incorrect password
        alert("Incorrect password. Please try again.");
        resetTransferForm();
      }
    }
  }
});

