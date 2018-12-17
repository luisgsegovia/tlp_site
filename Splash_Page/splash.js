function myFunction() {
    var x = document.getElementById("disappear");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }