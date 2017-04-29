var i = 0;

function myLoop() {
  var split = $("#text").val().split(/\s+/);
  setTimeout(function() {
    var currentWord = split[i];
    $("div").append('<audio autoplay="autoplay" controls="controls" class="' + i + '"><source src="http://ssl.gstatic.com/dictionary/static/sounds/de/0/' + currentWord + '.mp3" /></audio>');
    i++;
    if (i < split.length) {
      myLoop();
    } else if (i >= split.length || currentWord == undefined) {
      i = 0;
    }
  }, 400)
}

$('button').on('click', function() {
  myLoop();
});

$("#text").keyup(function(event){
    if(event.keyCode == 13){
        $("button").click();
    }
});