<?php
require 'dbauth.php';

if (isset($_GET['newestEntryTime']))
{
	$stmt = $pdo->prepare(
		'SELECT uploadTime FROM `ePaperImages` ORDER BY `uploadTime` DESC');
	$stmt->execute();
	$response_array = $stmt->fetch();
	$response_array['status'] = 'success';
	echo json_encode($response_array);
}

if (isset($_GET['newestEntry']))
{
	$stmt = $pdo->prepare(
		'SELECT imageData, uploadTime FROM `ePaperImages` ORDER BY `uploadTime` DESC');
	$stmt->execute();
	$response_array = $stmt->fetch();
	$response_array['status'] = 'success';
	echo json_encode($response_array);
}
?>