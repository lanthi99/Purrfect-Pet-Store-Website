const { DiffieHellmanGroup } = require("crypto");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 5234;
const app = express();
const fs = require("fs");
const session = require("express-session");
const { resolveInclude } = require("ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("Exercice4"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.set("view engine", "ejs");

app.use(cookieParser());

//Exercice 1
app.get("/Function1", function findSummation(req, res) {
  res.sendFile(path.join(__dirname, "public", "Exercice1.html"));
});

app.get("/Function2", function uppercaseFirstandLast(req, res) {
  res.sendFile(path.join(__dirname, "public", "Exercice1.html"));
});

app.post("/Function1", function findSummation(req, res) {
  let num1 = req.body.num1;
  let sum = 0;
  if (num1 > 0) {
    for (let i = 1; i <= num1; i++) {
      sum += i;
    }
    res.send("The summation of all numbers from 1 to " + num1 + " is: " + sum);
    return sum;
  } else {
    res.send("Please enter a positive integer number");
    return false;
  }
});

app.post("/Function2", function uppercaseFirstandLast(req, res) {
  let word = req.body.word;
  let result =
    word[0].toUpperCase() +
    word.slice(1, word.length - 1) +
    word[word.length - 1].toUpperCase();
  res.send(result);
});

app.post("/Function3", function findAverageAndMedian(req, res) {
  let numArr = req.body.numArr;
  let split = numArr.split(" ");
  let intArr = split.map(function (str) {
    return parseInt(str);
  });
  //calculate the average
  let sum = 0;
  let count = 0;
  for (let i = 0; i < intArr.length; i++) {
    if (isNaN(intArr[i])) {
      space = true;
    } else {
      sum += intArr[i];
      count++;
    }
  }
  let average = sum / count;

  //calculate the median
  let median = 0;
  if (count % 2 == 0) {
    median = (intArr[count / 2 - 1] + intArr[count / 2]) / 2;
  } else {
    median = intArr[(count + 1) / 2 - 1];
  }

  res.send("The average is: " + average + "\nThe median is: " + median);
});

app.post("/Function4", function find4Digits(req, res) {
  let numString = req.body.numString;
  let fourDigits = [];
  let count = 0;
  let found = false;
  for (let i = 0; i < numString.length; i++) {
    if (numString.charAt(i) == " ") {
    } else if (numString.charAt(i) >= 0 && count < 4) {
      found = true;
      count++;
      fourDigits[i] = numString.charAt(i);
    }
  }
  if (found == true) {
    for (let i = 0; i < fourDigits.length; i++) {
      if (fourDigits[i] != null) {
        res.send(
          "The first 4 digits of number in the string is: " +
            fourDigits.join(" ")
        );
      }
    }
  } else {
    res.send("There's no digit number in the string");
  }
});

//Exercice 2
app.post("/Exercice2", (req, res) => {
  let lastVisit;
  if (req.cookies.lastVisit) {
    lastVisit = new Date(req.cookies.lastVisit).toLocaleString("en-CA", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "EST",
      year: "numeric",
      hour12: false,
    });
  }
  const currentVisit = new Date();
  res.cookie("lastVisit", currentVisit.toString());

  if (req.cookies.numVisits) {
    // numVisits is the name of the cookie
    let numVisits = Number(req.cookies.numVisits); // convert the cookie value to a number
    numVisits++;
    res.cookie("numVisits", numVisits); // update the cookie value
    res.send(
      `You have visited this page ${numVisits} times. Last visit was on ${lastVisit}`
    );
  } else {
    res.cookie("numVisits", 1);
    res.send("Welcome to the page for the first time!");
  }
});

//Exercice 3
app.post("/Exercice3", function checkPhoneNumber(req, res) {
  let phoneNumber = req.body.telephone;
  let match = phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/);
  if (match) {
    res.send("The phone number entered is correct");
  } else {
    res.send("The phone number entered is not correct. Please try again");
  }
});

//Exercice 4
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/browse", (req, res) => {
  res.render("browse");
});

app.get("/find", (req, res) => {
  res.render("find");
});

app.get("/dog", (req, res) => {
  res.render("dog");
});

app.get("/cat", (req, res) => {
  res.render("cat");
});

function checkUserSession(req, res, next) {
  if (req.session.user) {
    next(); // allow the next route to run
  } else {
    res.redirect("/giveaway");
  }
}

app.get("/giveaway", (req, res) => {
  res.render("giveaway");
});

app.get("/giveawaylogin", checkUserSession, (req, res) => {
  res.render("giveawaylogin");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    // destroy the session
    if (err) {
      return console.log(err);
    }
    res.render("logout1");
  });
});

function registerUser(username, password) {
  // If username is not taken, register the user
  const user = `${username}:${password}\n`;
  fs.appendFile("login.txt", user, (err) => {
    if (err) throw err;
    console.log("User registered!");
  });
}

function validateUser(username) {
  let data = fs.readFileSync("login.txt", "utf8");
  const users = data.split("\n"); // split file content by line
  for (let user of users) {
    const [existingUser] = user.split(":"); // get username
    if (existingUser === username) {
      return true;
    }
  }
  return false;
}

//create an available pet information file
let i = 0;
function giveawayPet(
  username,
  type,
  breed,
  age,
  gender,
  suitable,
  comments,
  lastName,
  firstName,
  email
) {
  const pet = `${++i}:${username}:${type}:${breed}:${age}:${gender}:${suitable}:${comments}:${lastName}:${firstName}:${email}\n`;
  fs.appendFile("pet.txt", pet, (err) => {
    if (err) throw err;
    console.log("Pet information added!");
  });
}

app.post("/giveawaylogin", (req, res) => {
  let username = req.session.user.username; // get the username from the current session
  let type = req.body.name2;
  let breed = req.body.breed2;
  let age = req.body.age; // get the selected age range by name
  let gender = req.body.gender2;
  let suitable = req.body.options;
  let comments = req.body.comment2;
  let lastName = req.body.lastname;
  let firstName = req.body.firstname;
  let email = req.body.email;
  //always get by name + need to specify values (otherwise return undefined or on for checkbox)

  giveawayPet(
    username,
    type,
    breed,
    age,
    gender,
    suitable,
    comments,
    lastName,
    firstName,
    email
  );
});

app.post("/create", function createUser(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let userContainSpace = false;
  let userContainSpecial = false;
  let passContainSpace = false;
  let passContainSpecial = false;
  //validate username
  for (let i = 0; i < username.length; i++) {
    let ch = username.charCodeAt(i);
    if (username[i] === " ") {
      userContainSpace = true;
    }
    if (
      !(
        (ch >= 65 && ch <= 90) ||
        (ch >= 97 && ch <= 122) ||
        (ch >= 48 && ch <= 57)
      )
    ) {
      userContainSpecial = true;
    }
  }

  //validate password
  for (let i = 0; i < password.length; i++) {
    let ch = password.charCodeAt(i);
    if (password[i] === " ") {
      passContainSpace = true;
    }
    if (
      !(
        (ch >= 65 && ch <= 90) ||
        (ch >= 97 && ch <= 122) ||
        (ch >= 48 && ch <= 57)
      )
    ) {
      passContainSpecial = true;
    }
  }
  if (
    userContainSpace ||
    userContainSpecial ||
    passContainSpace ||
    passContainSpecial
  ) {
    if (
      userContainSpace &&
      userContainSpecial &&
      passContainSpace &&
      passContainSpecial
    ) {
      res.send(
        "Username and password must contain only letters and digits and cannot contain spaces."
      );
    } else if (userContainSpace && userContainSpecial && passContainSpace) {
      res.send(
        "Username and password cannot contain spaces. Username must contain only letters and digits."
      );
    } else if (userContainSpace && userContainSpecial && passContainSpecial) {
      res.send(
        "Username cannot contain spaces. Username and password must contain only letters and digits."
      );
    } else if (userContainSpace && passContainSpace && passContainSpecial) {
      res.send(
        "Username cannot contain spaces. Password cannot contain spaces and must contain only letters and digits."
      );
    } else if (userContainSpecial && passContainSpace && passContainSpecial) {
      res.send(
        "Username must contain only letters and digits. Password cannot contain spaces and must contain only letters and digits."
      );
    } else if (userContainSpace && userContainSpecial) {
      res.send(
        "Username cannot contain spaces. Username must contain only letters and digits."
      );
    } else if (userContainSpace && passContainSpace) {
      res.send("Username and password cannot contain spaces.");
    } else if (userContainSpace && passContainSpecial) {
      res.send(
        "Username cannot contain spaces. Password must contain only letters and digits."
      );
    } else if (userContainSpecial && passContainSpace) {
      res.send(
        "Username must contain only letters and digits. Password cannot contain spaces."
      );
    } else if (userContainSpecial && passContainSpecial) {
      res.send(
        "Username must contain only letters and digits. Password must contain only letters and digits."
      );
    } else if (passContainSpace && passContainSpecial) {
      res.send(
        "Password cannot contain spaces and must contain only letters and digits."
      );
    } else if (userContainSpace) {
      res.send("Username cannot contain spaces.");
    } else if (userContainSpecial) {
      res.send("Username must contain only letters and digits.");
    } else if (passContainSpace) {
      res.send("Password cannot contain spaces.");
    } else if (passContainSpecial) {
      res.send("Password must contain only letters and digits.");
    }
  } else {
    if (password.length < 4) {
      res.send("Password must be at least 4 characters long.");
    } else {
      if (validateUser(username)) {
        res.send("Username already exists.");
      } else {
        registerUser(username, password);
        res.send("User registered!");
      }
    }
  }
});

//function to check if the username and password match with one of the registered users
function validateUserandPass(username, password) {
  let data = fs.readFileSync("login.txt", "utf8");
  const users = data.split("\n"); // split file content by line
  for (let user of users) {
    const [existingUser, existingPass] = user.split(":"); // get username and password
    if (existingUser === username && existingPass === password) {
      return 1;
    } else if (existingUser === username && existingPass !== password) {
      return 0;
    }
  }
  return -1;
}

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (validateUserandPass(username, password) == 1) {
    req.session.user = { username: username };
    res.redirect("/giveawaylogin");
  } else if (validateUserandPass(username, password) == 0) {
    res.send("Invalid password");
  } else if (validateUserandPass(username, password) == -1) {
    res.send("Invalid username");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
