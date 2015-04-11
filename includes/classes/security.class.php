<?php

class Security{
	
	private $access_token;
	private $expiration;
	private $refresh_token;
	private $meli;
	
	function __construct($meli){
		
		$this->access_token  = "";
		$this->expiration    = 0;
		$this->refresh_token = "";
		$this->meli          = $meli;
		
	}
	
	private function set_token($token, $expiration, $refresh){
		
		$this->access_token  = $token;
		$this->expiration    = $expiration;
		$this->refresh_token = $refresh;
		
	}
	
	public function get_token(){
		
		return $this->access_token;
	
	}
	
	public function expired(){
		
		if($this->expiration + time() + 1 < time()){
			
			return true;
			
		}
		
		return false;
		
	}
	
	public function obtain_token($code){
		
		$user = $this->meli->authorize($_GET['code'], AUTHORIZATOR_URL);
		
		$this->set_token(
			$user['body']->access_token,
			$user['body']->expires_in,
			$user['body']->refresh_token
		);
		
	}
	
	public function refresh_token(){
		
		$refresh = $this->meli->refreshAccessToken();
		
		$this->set_token(
			$refresh['body']->access_token,
			time() + $refresh['body']->expires_in,
			$refresh['body']->refresh_token
		);
		
	}
	
}

?>