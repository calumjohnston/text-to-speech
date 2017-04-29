var i = 0;

function playAudio() {
  var split = $("#text").val().split(/\s+/);
  setTimeout(function() {
    var currentWord = split[i];
    $("div").append('<audio autoplay="autoplay" controls="controls" class="' + i + '"><source src="http://ssl.gstatic.com/dictionary/static/sounds/de/0/' + currentWord + '.mp3" /></audio>');
    i++;
    if (i < split.length) {
      playAudio();
    } else if (i >= split.length || currentWord == undefined) {
      i = 0;
    }
  }, 420)
}

$('#listen').on('click', function() {
  playAudio();
});


//On click of Save button, store words in URL
$('#save').on('click', function() {
  var words = $("#text").val().split(/\s+/);
  var wordString= "";
  for (var i = 0; i < words.length; i++) {
    if (i==0){
      var wordString = wordString + words[i];
    }
    else{
      var wordString = wordString + "+" + words[i];
    }
    window.history.pushState('Saved Text', 'Title', '?w=' + wordString);
    //trigger modal
    fireModal();
  };
  
});

$('a').bind('click', function(e){
  e.preventDefault();
});

//Modal

function fireModal(){
    $("#share-link").html('<a href="' + window.location.href +'">'+ window.location.href+'</a>');
    $(".modal").fadeIn("fast");
  $('#close',"").on('click', function() {
    $(".modal").fadeOut("fast");
  });
}
















//Enter Key Listen
$("#text").keyup(function(event){
    if(event.keyCode == 13){
        $("#listen").click();
    }
});