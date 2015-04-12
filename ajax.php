<?php

	require_once("includes/main.inc.php");
	
	$access_token = $security->get_token();
	
	// --> Default Response
	$response   = json_encode(array(
		"error" => "Action Not Defined"
	));
	
	switch(_get("action")){
		
		case "get_user_data":
			
			$url        = "/users/me";
			$parameters = array(
				"access_token" => $access_token
			);
			
			$response = make_api_get_request($meli, $url, $parameters);
			
			break;
		
		case "get_cars_categories":
			
			$url        = "/categories/MLU1743";
			$parameters = array();
			
			$response = make_api_get_request($meli, $url, $parameters);
			
			break;
			
		case "get_cars_categories_brands":
			
			$category_id = _get("category_id");
			
			$url        = "categories/$category_id";
			$parameters = array();
			
			$response = make_api_get_request($meli, $url, $parameters);
			
			break;
			
	}
	
	header("Content-Type: application/json");
	die($response);
	
?>