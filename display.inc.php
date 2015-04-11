<?php

	header($page_headers);

	if($use_layout){
		
		$main_tpl = new HTML_Template_Sigma(TEMPLATES_PATH, TEMPLATES_CACHE_PATH);
		$main_tpl->loadTemplateFile("layout.tpl.html");
		
		$main_tpl->setVariable("page_title",    $page_title);
		$main_tpl->setVariable("page_head",     $page_head);
		$main_tpl->setVariable("page_foot",     $page_foot);
		$main_tpl->setVariable("page_onload",   $page_onload);
		
		$main_tpl->setCurrentBlock("module_content");
			$main_tpl->setVariable("module_content", $module_content);
		$main_tpl->parse("module_content");
		
		$main_tpl->show();
		
	}else{
		
		die($module_content);
		
	}

?>