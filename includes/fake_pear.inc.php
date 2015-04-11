<?php

class Fake_Pear
{
	
	private $version;
	
	function Fake_Pear(){
		$this->version = "1.0.13";
	}
	
	function raiseError($message, $error_number){
		die("Error #$error_number - $message");
	}
}

?>