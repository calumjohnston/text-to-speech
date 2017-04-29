<html>
<head>
	<title>World's Worst Text-To-Speech</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/script.js"></script>
	
</head>
<body>
<?php
	if (isset($_GET['w'])){
	$text = preg_replace('/[^-a-zA-Z0-9_ ]/', '', $_GET['w']);
	}
	else{
		$text="";
	}
?>
<div class="modal hidden">
 <div class="modal-content">
    <p id="share-title">Share link<span id="close">&times;</span></p>
    <div class="share-info">
    	<span id="share-link"></span>
    	<!--<button id="copy-url">Copy to Clipboard</button>-->
    </div>
  </div>
</div>
<div class="wrapper">
<input type="text" id="text" placeholder="Type your text" value="<?php echo $text ?>">
<button id="listen">Listen</button>
<button id="save">Share</button>
<div></div>

</div>

<script type="text/javascript" src="js/script.js"></script>
</body>
</html>