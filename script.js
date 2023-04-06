//display current day at top of the page
function displayCurrentDateAtTop() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY h:mm a"));
}

displayCurrentDateAtTop();

//adding event listener so that when the save button is pressed the data is saved to local
$(function () {
  var saveButton = $(".btn.saveBtn.col-2.col-md-1");
  saveButton.click(function () {
    var taskText = $(this).siblings(".description").val();
    var taskTime = $(this).parent().attr("id");

    storeToLocal({
      taskText: taskText,
      taskTime: taskTime,
    });
  });
});

$(function () {
  var currentTime = dayjs();
  var currentHour = currentTime.hour();
  
  // loop through every hour of the day and check to see if that hour is past, present or future of current hour, then add appropriate class to each box
  for (var hour = 0; hour <24 ; hour++) {
    //  if hour is in the past
    if (currentHour > hour) {
      $("#hour-" + hour).addClass("past");
    }
    //  if hour is present time
    else if (currentHour === hour) {
      $("#hour-" + hour).addClass("present");
    }
    //  if hour is in the future
    else {
      $("#hour-" + hour).addClass("future");
    }
  }
});


//save to local storage function
function storeToLocal() {
  $(".saveBtn").on("click", function () {
    var taskText = $(this).siblings(".description").val();
    var taskTime = $(this).siblings(".hour").text();
    localStorage.setItem(taskTime, taskText);
  });
}
//retrieve from local storage, goes through every hour looking for stored data and retrieves it if there. if there is a saved task then it sets the textarea elemnt to the saved value
function retrieveFromLocal() {
  for (var hour = 0; hour < 24; hour++) {
    var taskTime = $("#hour-" + hour + " .hour").text();
    var savedTaskText = localStorage.getItem(taskTime);
    if (savedTaskText !== null) {
      $("#hour-" + hour + " .description").val(savedTaskText);
    }
  }
}

retrieveFromLocal();













