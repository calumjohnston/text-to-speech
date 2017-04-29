var iteration = 0;

function playAudio() {
  var split = $("#text").val().split(/ +/);
  console.log(split);
  setTimeout(function() {
    var currentWord = split[iteration];
    console.log(currentWord);
    $("div").append('<audio autoplay="autoplay" controls="controls" class="' + iteration + '"><source src="http://ssl.gstatic.com/dictionary/static/sounds/de/0/' + currentWord + '.mp3" /></audio>');
    iteration++;

    if (iteration < split.length) {
      playAudio();
    } else if (iteration >= split.length || currentWord == undefined) {
      iteration = 0;
    }
  }, 420)
}

$('#listen').on('click', function() {
  playAudio();
});


//On click of Save button, store words in URL
$('#save').on('click', function() {
  var words = $("#text").val().split(/ +/);
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


//getParametersFromUrl - so we dont need php

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


//get words from URL, put them into input box
var words = getUrlParameter('w');
words = words.split("+");

for(i=0;i<words.length;i++){
  $("input#text").val(function() {
    if(i==0){
      return this.value + words[i];
    }
    else{
      return this.value + " " + words[i];
    }
  });
   
}


//Enter Key Listen
$("#text").keyup(function(event){
    if(event.keyCode == 13){
        $("#listen").click();
    }
});