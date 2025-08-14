<?php
set_exception_handler('exception_handler');
function exception_handler(Throwable $ex) {
	echo $ex;
	exit(1);
}

$response = [];

// Create a connection to the db
try {
	$dbh = new PDO('pgsql:host=localhost;port=5432;dbname=valentine_dynasty;user=valentine');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
	throw new Exception("Connection failed: " . $ex, 1);
}

// Get content of the system with the passed ID
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare("SELECT id, system FROM systems WHERE id = ?");
	$stmt->bindValue(1, $_GET['id']); 
	
	$stmt->execute();
	$stmt->SetFetchMode(PDO::FETCH_NAMED);

	$response += $stmt->fetchAll();
	$response[0]['system'] = json_decode($response[0]['system']);
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed to add to database: " . $ex, 1);
}

echo json_encode($response);
?>