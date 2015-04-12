<?php

	require_once("includes/main.inc.php");
	
	$access_token = $security->get_token();
	
	// --> Default Response
	$response   = array(
		"error" => "Action Not Defined"
	);
	
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
			
			$categories = make_api_get_request($meli, $url, $parameters);
			
			$response = array();
			$allowed  = array(
				"MLU1746",
				"MLU1744",
				"MLU41696"
			);
			
			foreach($categories["children_categories"] as $key => $category){
				
				if(in_array($category["id"], $allowed)){
					
					$response[] = array(
						"category_id"   => $category["id"],
						"category_name" => $category["name"],
						"items"         => $category["total_items_in_this_category"]
					);
					
				}
				
			}
			
			break;
			
		case "get_cars_category_brands":
			
			$category_id = _get("category_id");
			$url         = "categories/$category_id";
			$parameters  = array();
			
			$brands = make_api_get_request($meli, $url, $parameters);
			
			$response = array();
			
			foreach($brands["children_categories"] as $key => $brand){
			
				$response[] = array(
					"category_id"   => $brand["id"],
					"category_name" => $brand["name"],
					"items"         => $brand["total_items_in_this_category"]
				);
			
			}
			
			break;
			
		case "get_lowest_and_highest":
			
			$category_id = _get("category_id");
			$url         = "/sites/MLU/search?category=$category_id";
			$parameters  = array();
			
			$similars = make_api_get_request($meli, $url, $parameters);
			
			$response  = array();
			$min_price = 0;
			$max_price = 0;
			
			foreach($similars["results"] as $key => $similar){
				
				if($min_price == 0 && $max_price == 0){
					
					$min_price = $similar["price"];
					$max_price = $similar["price"];
					
				}
				
				if($min_price > $similar["price"]){
					
					$min_price = $similar["price"];
					
				}
				
				if($max_price < $similar["price"]){
					
					$max_price = $similar["price"];
					
				}
				
			}
			
			$response["highest"] = $max_price;
			$response["lowest"]  = $min_price;
			$response["average"] = ceil(($response["lowest"] + $response["highest"]) / 2);
			
			break;
		
		case "get_hits_from_similars":
			
			$category_id = _get("category_id");
			$url         = "/sites/MLU/search?category=$category_id";
			$parameters  = array();
				
			$similars = make_api_get_request($meli, $url, $parameters);
				
			$response = array(
				"average_hits" => 0,
				"min_hits"     => null,
				"max_hits"     => null
			);
			
			$total_hits = 0;
			$quantity   = count($similars["results"]);
			
			foreach($similars["results"] as $key => $similar){
			
				$item_id    = $similar["id"];
				$url        = "/items/$item_id/visits/?date_from=2015-01-01&date_to=2015-05-30";
				$parameters = array();
				
				$hits = make_api_get_request($meli, $url, $parameters);
				
				if($response["min_hits"] == null && $response["max_hits"] == null){
					
					$response["min_hits"] = $hits["total_visits"];
					$response["max_hits"] = $hits["total_visits"];
						
				}
			
				if($response["min_hits"] > $hits["total_visits"]){
						
					$response["min_hits"] = $hits["total_visits"];
						
				}
			
				if($response["max_hits"] < $hits["total_visits"]){
						
					$response["max_hits"] = $hits["total_visits"];
						
				}
				
				$total_hits += $hits["total_visits"];
				
			}
			
			$response["average_hits"] = ceil($total_hits / $quantity);
			
			break;
		
		case "get_category_trendings":
			
			$category_id = _get("category_id");
			$url         = "/sites/MLU/trends/search?category=$category_id&limit=5";
			$parameters  = array();
			
			$trendings = make_api_get_request($meli, $url, $parameters);
			
			$response = array();
				
			foreach($trendings as $key => $trending){
				
				$response[] = ucfirst(str_ireplace("_", " ", $trending["keyword"]));
				
			}
			
			break;

		case "get_price_distribution":
			
			$category_id = _get("category_id");
			$url         = "/sites/MLU/search?category=$category_id";
			$parameters  = array();
				
			$similars = make_api_get_request($meli, $url, $parameters);
				
			$response  = array();
			
			foreach($similars["results"] as $key => $similar){
			
				if(!isset($response[$similar["price"]])){
					$response[$similar["price"]] = 1;
				}else{
					$response[$similar["price"]] += 1;
				}
			
			}

			$return = array();
			
			foreach($response as $key => $value){
				
				$return[] = array(
					"x" => $key,
					"y" => $value
				);
				
			}
			
			break;
			
	}
	
	header("Content-Type: application/json");
	die(get_json($response));
	
?>