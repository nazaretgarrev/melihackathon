<?php

	require_once("includes/main.inc.php");	
	
	if($security->get_token() == ""){
		
		header("Location: authorizator.php");
		die();
		
	}

	if($security->expired()){
		
		$_SESSION["security"] = serialize($security->refresh_token());
		
	}
	
	require_once(get_module_name(_get("md")));
	
	log_message("HIT");
	
	require_once("display.inc.php");
	
?>