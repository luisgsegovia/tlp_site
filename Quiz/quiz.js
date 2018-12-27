var currentTab = 0; // Current tab is set to be the first tab (0)
var dict = {
  1: "The Technology Engineering Program",
  2: "The Technology Leadership Program",
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

  console.log("Radio Val" + getRadioVal(document.getElementById("regForm"),"groupOfDefaultRadios"));

  // if it's the final tab, calculate the decision
  var decision = 0;
  if (n == (x.length - 1)) {

    // var checked = $('.custom-control-input:checked').map(function() {
    //   return this.value;
    // }).get();
    // if (checked.length) {
    //   console.log(checked);
    // } else {
    //   console.log('null');
    // }
    decision = calculateDecision();
    if (decision == 5) {

      console.log("Couldn't find match");
    }
  }




  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else if (n == (x.length - 1)) {
    //display nothing if the logic couldnt find anything
    if (decision == 5) {
      document.getElementById("prevBtn").style.display = "none";
      $("#finalMessage").html("Hmm, looks like we couldn't find a match. Click below to read more about all our programs.")
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
  // console.log("NextPrev Parameter: " + n);
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // if(!validateForm()) return;
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
  console.log(valid);
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
}

// 1 = TEP, 2 = TLP, 3 = Step 1, 4 = Step 2
function calculateDecision() {
  var decision = -1;
  x = document.getElementsByClassName("results-card");
  y = document.getElementsByClassName(".custom-control-input");

  for(i=0;i<y.length;i++){
    if(y[i].checked){
      console.log(i + " " + y[i] + " " + y[i].attr('id'));
    }
  }
  console.log("length = " + y.length);
  // console.log(x);
  //step 1
  if ($("#year1").prop("checked") || $("#year2").prop("checked")) {
    x[2].style.display = "block";
    $("#decision").html(dict[3]);
    decision = 3;
    // console.log("Year 1: " + $("#year1").prop("checked", true));
    // console.log("Year 2: " + $("#year2").prop("checked", true));
    //step 2
  } else if ($("#year3").prop("checked")) {
    x[3].style.display = "block";
    $("#decision").html(dict[4]);
    decision = 4;
    //tlp - RIP
    // } else if ($("#future2").prop("checked") || $("#future4").prop("checked")) {
    //   x[1].style.display = "block";
    //   $("#decision").html(dict[2]);
    //   decision = 2;
    //tep
  } else if ($("#year4").val("on") || $("#year5").val("on")) {
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