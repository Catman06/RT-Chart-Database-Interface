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
} catch (Exception $ex) {
	throw new Exception("Connection failed: " . $ex, 1);
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
	throw new Exception("Failed to get all locations: " . $ex, 1);
}

// return all locations
echo json_encode($response);
?>