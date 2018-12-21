var currentTab = 0; // Current tab is set to be the first tab (0)
var dict = {
  1: "Technology Engineering Program",
  2: "Technology Leadership Program",
  3: "STEP 1",
  4: "STEP 2"
}

var link = {
  1: "../TEP/tep.html",
  2: "../TEP/tep.html",
  3: "../STEP_1/step1.html",
  4: "../STEP_2/step2.html"
}

showTab(currentTab); // Display the current tab

// console.log("Current Tab: " + currentTab)

function showTab(n) {

  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");

  // if it's the final tab, calculate the decision
  var decision = 0;
  if (n == (x.length - 1)) {
    decision = calculateDecision();
    if(decision == 5){
      console.log("Couldn't find match");
    }
  }


  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else if (n == (x.length - 1)) {
    document.getElementById("prevBtn").innerHTML = '<a href="' + link[decision] + '">' + 'Learn More About ' + dict[decision] + '</a>';
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("stepCounter").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "View all our programs";
    x = document.getElementsByClassName("breakline");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "block";
    }
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)

  // Card Display
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // console.log("NextPrev Parameter: " + n);
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
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
  // console.log("Number of tabs: " + x.length);
  // console.log("Current tab: " + currentTab)

  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true, validCounter = 0;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  // for (i = 0; i < y.length; i++) {
  //     if(y[i].type = "input"){
  //       if(y[i].checked){
  //         validCounter++;
  //       }
  //     }
  // }
  // console.log(y);
  //   If the valid status is true, mark the step as finished and valid:
  if (true) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  } else {
    valid = false;
  }
  // console.log(valid)
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
  // console.log("step = " + n);
  // console.log("active step = " + x[n].className)
}

// 1 = TEP, 2 = TLP, 3 = Step 1, 4 = Step 2
function calculateDecision() {
  var decision = 5;
  x = document.getElementsByClassName("results-card");
  // console.log(x);
  //step 1
  if ($("#year1").prop("checked", true) || $("#year2").prop("checked", true)) {
    x[2].style.display = "block";
    $("#decision").html(dict[3]);
    decision = 3;
    //step 2
  } else if ($("#year3").prop("checked", true)) {
    x[3].style.display = "block";
    $("#decision").html(dict[4]);
    decision = 4;
    //tlp
  } else if ($("#future2").prop("checked", true) || $("#future4").prop("checked", true)){
    x[1].style.display = "block";
    $("#decision").html(dict[2]);
    decision = 2;
    //tep
  } else if  ($("#future2").prop("checked", true) || $("#future4").prop("checked", true)){
    x[0].style.display = "block";
    $("#decision").html(dict[1]);
    decision = 1;
    //didnt choose anything
  } else {
    decision = 5;
  }
  console.log(decision);
  return decision;
}