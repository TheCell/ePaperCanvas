<?php
require 'dbauth.php';

$uploaderIP = $_SERVER['REMOTE_ADDR'];
if (isset($_POST['imageData']))
{
	$imageData = filter_var($_POST['imageData'], FILTER_SANITIZE_URL);
}
else
{
	$response_array['info'] = 'imagedata not set';
}
$response_array['status'] = 'fail';

if (!empty($uploaderIP) && !empty($imageData))
{
	$stmt = $pdo->prepare(
		'INSERT INTO ePaperImages (imageData, uploaderIP)
		 VALUES (:imageData, :uploaderIP)');
	$stmt->execute(['uploaderIP' => $uploaderIP, 'imageData' => $imageData]);
	$response_array['status'] = 'success';
}

echo json_encode($response_array);
?>