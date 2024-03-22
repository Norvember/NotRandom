//! Apply dependencies
function showPage(pageIndex) {
    var timePage = document.getElementById("timePage");
    var priorityPage = document.getElementById("priorityPage");
    if (pageIndex == 0) {
      timePage.style.display = "none";
      priorityPage.style.display = "block";
    } else {
      timePage.style.display = "block";
      priorityPage.style.display = "none";
    }
    // set the buttons accordingly
    var pills = document.getElementsByClassName("nav-link");
    for (var i = 0; i < pills.length; i++) {
      if (i == pageIndex) {
        pills[i].classList.add("active");
      } else {
        pills[i].classList.remove("active");
      }
    }
  }