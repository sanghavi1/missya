$(document).ready(function(){
  var thoughtsBoard = document.getElementById('thoughtsBoard');

  $.get("/getThoughts", function(data, status){
    $.each(data, (index, value) => {
      var container = $("<div>", {"class": "container thoughtItem has-text-centered"});
      var box = $("<div>", {"class": "box"});
      var item = $("<p></p>").text(value.message);
      $("#thoughtsBoard").append(container.append(box.append(item)));
    });
  })
});
