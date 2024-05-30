//part 1
function getCurrentDate() {
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let getDay = days[currentDate.getDay()];
  let getMonth = months[currentDate.getMonth()];
  let getDate = currentDate.getDate();
  let getYear = currentDate.getFullYear();
  let getHours = currentDate.getHours();
  let getMinutes = currentDate.getMinutes();
  let getSeconds = currentDate.getSeconds();

  let displayDate =
    getDay +
    " " +
    getMonth +
    " " +
    getDate +
    " " +
    getYear +
    " " +
    getHours +
    ":" +
    getMinutes +
    ":" +
    getSeconds;
  document.getElementById("outputDate").innerHTML = displayDate;
}

setInterval(getCurrentDate, 1000);

//part 3
function validateFind() {
  //validate if type of pet is selected
  let typeButton = document.myForm.name;
  let valid1 = false;
  for (let i = 0; i < typeButton.length; i++) {
    if (typeButton[i].checked) {
      valid1 = true;
      break;
    }
  }
  if (!valid1) {
    alert("Please select the type of pet");
  }

  //validate if breed is selected
  let breedButton = document.myForm.breed;
  let valid2 = false;
  for (let i = 0; i < breedButton.length; i++) {
    if (breedButton[i].checked) {
      valid2 = true;
      break;
    }
  }
  if (!valid2) {
    alert("Please select the breed of pet");
  }

  //validate if an age range is selected
  let ageSelect = document.getElementById("age");
  let valid3 = false;
  if (ageSelect.selectedIndex == 0) {
    alert("Please select an age range");
  } else {
    valid3 = true;
  }

  //validate if gender is selected
  let genderButton = document.myForm.gender;
  let valid4 = false;
  for (let i = 0; i < genderButton.length; i++) {
    if (genderButton[i].checked) {
      valid4 = true;
      break;
    }
  }
  if (!valid4) {
    alert("Please select the gender");
  }

  //validate if get along with is selected
  let valid5 = false;
  if (document.getElementById("children").checked) {
    valid5 = true;
  } else if (document.getElementById("otherdogs").checked) {
    valid5 = true;
  } else if (document.getElementById("othercats").checked) {
    valid5 = true;
  } else if (document.getElementById("none").checked) {
    valid5 = true;
  }
  if (!valid5) {
    alert("Please select who the pet needs to along with");
  }

  if (valid1 && valid2 && valid3 && valid4 && valid5) {
    alert("Form submitted successfully!");
  }
}

//part 4
function validateGiveaway() {
  //validate if type of pet is selected
  var typeButton = document.myForm2.name2;
  let valid1 = false;
  for (let i = 0; i < typeButton.length; i++) {
    if (typeButton[i].checked) {
      valid1 = true;
      break;
    }
  }
  if (!valid1) {
    alert("Please select the type of pet");
  }

  //validate if breed is selected
  let breedButton = document.myForm2.breed2;
  let valid2 = false;
  for (let i = 0; i < breedButton.length; i++) {
    if (breedButton[i].checked) {
      valid2 = true;
      break;
    }
  }
  if (!valid2) {
    alert("Please select the breed of pet");
  }

  //validate if an age range is selected
  let ageSelect = document.getElementById("age2");
  let valid3 = false;
  if (ageSelect.selectedIndex == 0) {
    alert("Please select an age range");
  } else {
    valid3 = true;
  }

  //validate if gender is selected
  let genderButton = document.myForm2.gender2;
  let valid4 = false;
  for (let i = 0; i < genderButton.length; i++) {
    if (genderButton[i].checked) {
      valid4 = true;
      break;
    }
  }
  if (!valid4) {
    alert("Please select the gender");
  }

  //validate if get along with is selected
  let valid5 = false;
  if (document.getElementById("children2").checked) {
    valid5 = true;
  } else if (document.getElementById("otherdogs2").checked) {
    valid5 = true;
  } else if (document.getElementById("othercats2").checked) {
    valid5 = true;
  } else if (document.getElementById("none2").checked) {
    valid5 = true;
  }
  if (!valid5) {
    alert("Please select who your pet can get to along with");
  }

  //vallidate if comment box is filled
  let comment = document.getElementById("comment2").value;
  let valid6 = false;
  if (comment == "") {
    alert("Please fill in the comment box");
  } else {
    valid6 = true;
  }

  //validate if last name is filled
  let lastName = document.getElementById("lastname").value;
  let valid7 = false;
  if (lastName == "") {
    alert("Please fill in the last name");
  } else {
    valid7 = true;
  }

  //validate if first name is filled
  let firstName = document.getElementById("firstname").value;
  let valid8 = false;
  if (firstName == "") {
    alert("Please fill in the first name");
  } else {
    valid8 = true;
  }

  //validate if email is filled
  let email = document.getElementById("email").value;
  let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let valid9 = false;
  if (email == "") {
    alert("Please fill in the email");
  } else {
    if (email.match(validEmail)) {
      valid9 = true;
    } else {
      alert("Please enter a valid email address");
    }
  }

  if (
    valid1 &&
    valid2 &&
    valid3 &&
    valid4 &&
    valid5 &&
    valid6 &&
    valid7 &&
    valid8 &&
    valid9
  ) {
    alert("Form submitted successfully!");
  }
}
