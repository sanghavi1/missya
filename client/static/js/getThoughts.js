$(document).ready(function(){
  var thoughtsBoard = document.getElementById('thoughtsBoard');

  $.get("/getThoughts", function(data, status){
    $.each(data, (index, value) => {
      var item = $("<p></p>").text(value.message);
      $("#thoughtsBoard").append(item);
    });
    //thoughtsBoard.appendChild(data);
  })
});
