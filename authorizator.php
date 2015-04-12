<?php

	require_once("includes/main.inc.php");

	if(isset($_GET['code'])){
		
		$security->obtain_token($_GET['code']);
		
		$_SESSION['security'] = serialize($security);
	
		header("Location: index.php");
		die();
	
	}else{
		
		$main_tpl = new HTML_Template_Sigma(TEMPLATES_PATH, TEMPLATES_CACHE_PATH);
		$main_tpl->loadTemplateFile("authorizator.tpl.html");
		
		$main_tpl->setVariable("page_title", $page_title);
		$main_tpl->setVariable("url_oauth2", $meli->getAuthUrl(AUTHORIZATOR_URL));
		
		$main_tpl->show();
	
	}
	
?>