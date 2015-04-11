<?php

	require_once("includes/main.inc.php");

	if(isset($_GET['code'])){
		
		$security->obtain_token($_GET['code']);
		
		$_SESSION['security'] = serialize($security);
	
		header("Location: index.php");
		die();
	
	}else{
		
		echo '<a href="' . $meli->getAuthUrl(AUTHORIZATOR_URL) . '">Login using MercadoLibre oAuth 2.0</a>';
	
	}
	
?>