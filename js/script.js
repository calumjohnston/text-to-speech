
var iteration = 0;

function playAudio() {
  var split = $("#text").val().split(/ +/);
  if(split != ''){
  setTimeout(function() {
    var currentWord = split[iteration];
    $("div.audio-hidden").append('<audio autoplay="autoplay" controls="controls" class="' + iteration + '"><source src="http://ssl.gstatic.com/dictionary/static/sounds/de/0/' + currentWord + '.mp3" /></audio>');
    iteration++;

    if (iteration < split.length) {
      playAudio();
    } else if (iteration >= split.length || currentWord == undefined) {
      iteration = 0;
    }
  }, 420)
  }
}
//play audio on click
$('#listen').on('click', function() {
  playAudio();
});

//share button not lit unless it has content
$(document).ready(function(){
    $('#save').attr('disabled',true);
    $('input#text').keyup(function(){
        if($(this).val().length !=0){
            $('#save').attr('disabled', false);
            $('#save').removeClass("disabled"); 
          }
        else{
            $('#save').attr('disabled',true);
            $('#save').addClass("disabled"); 
            }
    });
});

//On click of Share button, store words in URL
$('#save').on('click', function() {
  if($("input#text").val() != ''){
    var words = $("#text").val().split(/ +/);
    var wordString= "";
    for (var i = 0; i < words.length; i++) {

      if (i==0){
        var wordString = wordString + words[i];
      }
      else{
        var wordString = wordString + "+" + words[i];
      }
      window.history.pushState('Saved Text', 'Title', '?w=' + window.btoa(wordString));
      //trigger modal
      fireModal();
    };
  }
});

//Share Button - Launch modal
function fireModal(){
    $("#share-link").html('<a href="' + window.location.href +'">'+ window.location.href+'</a>');
    $(".modal").fadeIn("fast");
  $('#close').on('click', function() {
    $(".modal").fadeOut("fast");
  });
  $('.modal').on('click', function() {
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
if(getUrlParameter('w') != undefined){
    //buggy setTimeout(function(){ playAudio(); }, 400);
    var words = window.atob(getUrlParameter('w'));
    words = words.split("+");
    for(i=0; i<words.length; i++){
      $("input#text").val(function() {
        if(i==0){
          return this.value + words[i];

        }
        else{
          return this.value + " " + words[i];
        }

      });
       
    }

}

//copy to clipboard with clipboard.js
new Clipboard('#copy-url');


//Enter Key Listen
$("#text").keyup(function(event){
    if(event.keyCode == 13){
        $("#listen").click();
    }
});
