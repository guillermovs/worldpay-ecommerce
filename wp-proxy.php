<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

header('Content-Type: application/json');

$amount = isset($_REQUEST['amount']) ? trim($_REQUEST['amount']) : NULL;

if( isset($_REQUEST['refund']) && $_REQUEST['refund']  ){
  // Refunding
  echo wpRequest( trim($_REQUEST['refund']), $amount, true);
}else if( isset($_REQUEST['token']) && $_REQUEST['token'] ){
  // Charging
  echo wpRequest( trim($_REQUEST['token']), $amount, false);
}

/* gets the data from a URL */
function wpRequest($code, $amount, $refunding) {

  // Spoof user agent
  $userAgents = array('Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0',
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13',
  'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2');
  $randKey = array_rand($userAgents, 1);
  
	$ch = curl_init();
	$timeout = 5;
  $headers = array('Content-type: application/json', 'Authorization: T_S_41af157c-5025-4a9b-87e4-27f5dc456122');
  
  if($refunding){
    // Partial refund
    $url = 'https://api.worldpay.com/v1/orders/'.$code.'/refund';
    $data = array(
      "refundAmount" => ($amount*100),//in cents
    );
  }else{
    // Charging
    $url = 'https://api.worldpay.com/v1/orders';
    $data = array(
      "token" => $code,
      "amount" => ($amount*100),//in cents
      "currencyCodeExponent" => 2,
      "authorizeOnly" => false,
      "currencyCode" => "GBP",
      "orderDescription" => "Order description",
      "customerOrderCode" => "Order code",
      "name" => "John Smith",
      "shopperEmailAddress" => "name@domain.co.uk"
    );
  }
	
  $data_string = json_encode($data); 

  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	curl_setopt($ch, CURLOPT_USERAGENT,$userAgents[$randKey]);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}


?>