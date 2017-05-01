
var iteration = 0;

function playAudio() {
  var split = $("#text").val().split(/ +/);
  if(split != ''){
  setTimeout(function() {
    var currentWord = split[iteration];
    currentWord = currentWord.toLowerCase();
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

 var prev_url;

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
    };
    window.history.pushState('Saved Text', 'Title', '?w=' + window.btoa(wordString));
  } 
});



//Share Button - Launch modal
function fireModal(){
    $("#share-link").html('<a href="' + window.location.href +'">'+ window.location.href+'</a>');
    $(".modal").fadeIn("fast");
  $('#close').on('click', function() {
    $(".modal").fadeOut("fast");
     $('#checkboxFiveInput').removeAttr('checked');
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

$('#save').on('click', function() {
  fireModal();
  if(getUrlParameter('hidden') != "true"){
    prev_url = window.location.href;
  }
  checkBoxChecked();
});

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


//if hidden checkbox is checked
function checkBoxChecked() {
  $('#checkboxFiveInput').change(function() {
  
    var local = prev_url;
     if($(this).is(':checked')){
                $("#share-link").html('<a href="' + window.location.href + '&hidden' +'">'+ window.location.href + '&hidden' + '</a>');
              }
            else
                {
                    $("#share-link").html('<a href="' + prev_url +'">'+ prev_url +'</a>');
    }    
  });

};

//if getUrlParameter('hidden') != true
//remove input box - make play button centered
//add make your own button
if(getUrlParameter('hidden')){
  $('input#text').addClass("hidden-text");
  $('#listen').addClass("hidden-listen");
  $('#save').hide();
  $('h1').hide();
  $('.wrapper').addClass("hidden-flexed");
  $('.wrapper div').css("flex-direction", "column");
  $('#make-your-own').removeClass("hidden-button");
}

$('#make-your-own').on('click', function() {
    window.location.href = "/";
});
//make your own button
//on click reload page


//Enter Key Listen
$("#text").keyup(function(event){
    if(event.keyCode == 13){
        $("#listen").click();
    }
});
