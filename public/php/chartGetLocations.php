<?php
set_exception_handler('exception_handler');
function exception_handler(Throwable $ex) {
	echo json_encode($response);
	exit(1);
}

$response = [];

// Create a connection to the db
try {
	$dbh = new PDO('pgsql:host=localhost;port=5432;dbname=valentine_dynasty_charts;user=valentine');
} catch (Exception $ex) {
	$response["error"] = "Connection failed: " . $ex.getMessage();
	throw new Exception("Connection failed", 1);
}

// Get all locations featured in the charts
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare('SELECT start AS location FROM charts UNION SELECT endpoint FROM charts;');
	$stmt->execute();
	foreach ($stmt->fetchAll() as $system) {
		$response[] = $system[0];
	}
} catch (Exception $ex) {
	$response["error"] = "Failed to get all locations: " . $ex.getMessage();
	throw new Exception("Failed to get all locations", 1);
}

// return all locations
echo json_encode($response);
?>