<?php
$response = [];

try {
	// Create a connection to the db
	$dbh = new PDO('pgsql:host=localhost;port=5432;dbname=valentine_dynasty_charts;user=valentine');
	$dbh->beginTransaction();

	// Get all locations featured in the charts
	$stmt = $dbh->prepare('SELECT start AS location FROM charts UNION SELECT endpoint FROM charts;');
	$stmt->execute();
	foreach ($stmt->fetchAll() as $system) {
		$response[] = $system[0];
	}
} catch (Exception $ex) {
	$response["error"] = $ex;
}

// return all locations
echo json_encode($response);
?>