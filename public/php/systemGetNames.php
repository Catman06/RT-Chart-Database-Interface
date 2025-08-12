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

// Get the names of all systems in the database
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare("SELECT id, jsonb_path_query(system, '$.name') AS names FROM systems");
	$stmt->execute();
	$response = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed to add to database: " . $ex, 1);
}

echo json_encode($response);
?>