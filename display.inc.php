<?php

	if($use_layout){
		
		$main_tpl = new HTML_Template_Sigma(TEMPLATES_PATH, TEMPLATES_CACHE_PATH);
		$main_tpl->loadTemplateFile("layout.tpl.html");
		
		$main_tpl->setVariable("page_title",    $page_title);
		$main_tpl->setVariable("page_head",     $page_head);
		$main_tpl->setVariable("page_foot",     $page_foot);
		$main_tpl->setVariable("page_onload",   $page_onload);
		
		$main_tpl->show();
		
	}else{
		
		die($module_content);
		
	}

?>