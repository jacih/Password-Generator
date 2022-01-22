
let generateBtn = document.querySelector("#generate");
let resetBtn = document.querySelector("#reset");

//accumulator object for user criteria;
let criteriaChoice = {
  length: 0,
  lowerCase: false,
  upperCase: false,
  specialChars: false,
};

// variable libraries (arrays) declaring possible character values per element type;
let charSet = ["0123456789"];

let lowerChars = ["abcdefghijklmnopqrstuvwxyz"];
  lowerChars[0].split(",");

let upperChars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  upperChars[0].split(",");

let specialChars = ["!@#$%&*"];
  specialChars[0].split(",");

// accumulator variable to format final user criteria choice object into legible list for confirmation window;
let choicesString = "";
let finalChoices = [];

// function to collect user criteria based on prompt and confirm choices;
function getChoices() {

  let charLength = prompt("Your password may be from 8 to 128 characters long. \n How long would you like your password to be?");
  // console.log(charLength);
  while ((charLength < 8) || (charLength > 128)) {
    window.alert ("Please choose a number between 8 and 128.")
    charLength = prompt("How long would you like your password to be?");
  }
  if ((charLength >= 8) || (charLength <= 128)) {
    criteriaChoice.length = charLength;
  
    let containsLower = confirm("Would you like to include lowercase characters?");
      if (containsLower) {
        criteriaChoice.lowerCase = true;
      } else {
        window.alert("Okay, your password will not contain lowercase characters.");
      }
  
    let containsUpper = confirm("Would you like to include uppercase characters?");
      if (containsUpper) {
        criteriaChoice.upperCase = true;
      } else {
        window.alert("Okay, your password will not contain uppercase characters.");
      }

    let containsSpecial = confirm("Would you like to include special characters?");
      if (containsSpecial) {
        criteriaChoice.specialChars = true;
      } else {
        window.alert("Okay, your password will not contain special characters.");
      }
  }
  
  if (choicesValid(criteriaChoice) === false) {
    window.alert("You must include at least one at least one character type:\n -lowercase characters\n -uppercase characters\n -special characters\n Please restart.");
    window.location.reload();
  } else {
    choicesString += "\nLength: " + finalChoices[0] + ",\nLowercase Letters: " + finalChoices[1] + "\nUppercase Letters: " + finalChoices[2] + "\nSpecial Characters: " + finalChoices[3];
    let criteriaConfirm = confirm("Are you happy with your password criteria?" + choicesString);
      if (!criteriaConfirm) {
        window.alert("Okay, let's restart!");
        window.location.reload();
      } else {
        return criteriaChoice;
      }
    }
}

function choicesValid(object) {
  let isFalse = [];
  let areValid = true;

  for (let key in object) {
    finalChoices.push(object[key]);
  }
  // console.log(finalChoices);
  for (let y = 0; y < finalChoices.length; y++) {
    if (finalChoices[y] === false) {
      isFalse.push(finalChoices);
    }
  }
  if (isFalse.length === 3) {
    areValid = false;
  }
  return areValid;
}

// function uses value returned in getChoices function to 
function generatePassword() {
  
  let charCount = 0;
  let userChoices = getChoices();
  let finalChars = [];

  if (userChoices["length"] !== undefined) {
    charCount = userChoices.length;
  }
  if (userChoices["lowerCase"] === true) {
    charSet.push(lowerChars[0]);
  }
  if (userChoices["upperCase"] === true) {
    charSet.push(upperChars[0]);
  }
  if (userChoices["specialChars"] === true) {
    charSet.push(specialChars[0]);
  }
  //console.log(charCount);
  // console.log(charSet);

  for (let x = 0; x < charSet.length; x++) {
    finalChars += charSet[x].split(",");
  }
  //console.log(finalChars);

  let generatedPassword = "";

    for (let i = 0; i < charCount; i++) {
      generatedPassword += finalChars[Math.floor(Math.random() * finalChars.length)];
    }
    // console.log(generatedPassword);
  return generatedPassword;
}

function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function reset() {
  window.location.reload();
}

generateBtn.addEventListener("click", writePassword);

resetBtn.addEventListener("click", reset);
