<?php

	session_start();
	
	require_once("config.inc.php");
	require_once("fake_pear.inc.php");
	require_once("sigma.inc.php");
	require_once("tools.inc.php");
	require_once("classes/meli.class.php");
	require_once("classes/security.class.php");
	
	$page_title     = "MELI UY | Solitarios - Easy Selling";
	$page_head      = "";
	$page_foot      = "";
	$page_onload    = "";
	$use_layout     = true;
	$module_content = "";
	$page_headers   = "Content-Type: text/html; charset=utf-8";
	
	if(DEBUG_ON){
		error_reporting(E_ALL);
		ini_set('display_errors',         TRUE);
		ini_set('display_startup_errors', TRUE);
	}
	
	$meli = new Meli(CLIENT_ID, CLIENT_SECRET);
	
	if(!isset($_SESSION["security"])){
		
		$_SESSION["security"] = serialize(new Security($meli));
		
	}
	
	$security = unserialize($_SESSION["security"]);
	
?>