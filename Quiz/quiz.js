var currentTab = 0; // Current tab is set to be the first tab (0)
var dict = {
  1: "The Technology Engineering Program",
  2: "The Technology Leadership Program",
  3: "STEP 1",
  4: "STEP 2"
}

var selection = -1;

$(function(){
  $('input[type="radio"]').click(function(){
    if ($(this).is(':checked') && $(this).hasClass("years"))
    {
      var year = $(this).attr("id");
      var selectionText = year[year.length-1];

      selection = parseInt(selectionText, 10);
    }
    $("#nextBtn").prop('disabled', false);

  });

  $('input[type="checkbox"]').click(function(){
    $("#nextBtn").prop('disabled', false);

  });
});

var link = {
  1: "../TEP/tep.html",
  2: "../TEP/tep.html",
  3: "../STEP_1/step1.html",
  4: "../STEP_2/step2.html"
}

showTab(currentTab); // Display the current tab


function showTab(n) {

  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");


  // if it's the final tab, calculate the decision
  var decision = 0;
  if (n == (x.length - 1)) {
    decision = calculateDecision();
  }




  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else if (n == (x.length - 1)) {
    //turn the button back on
    $("#nextBtn").prop('disabled', false);

    //display nothing if the logic couldnt find anything
    if (decision == 5) {
      document.getElementById("prevBtn").style.display = "none";
      $("#finalMessage").html("Hmm, looks like we didn't get enough information. Click below to read more about all our programs.")
    } else {
      document.getElementById("prevBtn").innerHTML = 'Learn more about ' + dict[decision];
      document.getElementById("prevBtn").style.display = "inline";
      document.getElementById("stepCounter").style.display = "none";
      $("#regForm").css("margin", "auto");
      $("#regForm").css("padding", "0");
    }
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "View all our programs";
    $("#programLink").attr("href", link[decision]);
    $("nextBtn").attr("onclick", "");

    x = document.getElementsByClassName("breakline");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "block";
    }
    setTimeout(setLinks, 1000);

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)

  // Card Display
}

function setLinks() {
  $("#splashLink").attr("href", "../Splash_Page/splash.html");
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  var y = document.getElementById("nextBtn");


  if(n == 1){
    $("#nextBtn").prop('disabled', true);
  } else {
    $("#nextBtn").prop('disabled', false);
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:

  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = false, validCounter = 0;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    if (y[i].type = "input") {
      if (y[i].checked) {
        valid = true;
      }
    }
  }

  if (y.length == 0) {
    valid = true;
  }
  //   If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
    $("#nextBtn").removeAttr('disabled');
    $("#nextBtn").css("background-color", "#056dae");
  } else {
    valid = false;
    $("#nextBtn").prop("disabled", "true");
    $("#nextBtn").css("background-color", "gray");
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// 1 = TEP, 2 = TLP, 3 = Step 1, 4 = Step 2
function calculateDecision() {
  var decision = -1;
  x = document.getElementsByClassName("results-card");
  y = document.getElementsByClassName(".custom-control-input");

  //step 1
  if (selection == 1 || selection == 2) {
    x[2].style.display = "block";
    $("#decision").html(dict[3]);
    decision = 3;
    //step 2
  } else if (selection == 3) {
    x[3].style.display = "block";
    $("#decision").html(dict[4]);
    decision = 4;
    //tep
  } else if (selection == 4 || selection == 5) {
    x[0].style.display = "block";
    $("#decision").html(dict[1]);
    decision = 1;
    //didnt choose anything
  } else {
    decision = 5;
  }
  return decision;
}

function getRadioVal(form, name) {
  var val;
  // get list of radio buttons with specified name
  var radios = form.elements[name];
  
  // loop through list of radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) { // radio checked?
          val = radios[i].value; // if so, hold its value in val
          break; // and break out of for loop
      }
  }
  return val; // return value of checked radio or undefined if none checked
}


let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else { 
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';
    } else {
        toggleIcon.className = 'menuIcon';
    }
});