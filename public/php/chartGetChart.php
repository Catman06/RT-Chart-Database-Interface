<?php
// Returns the full info for a given 'start' and 'endpoint'

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
	throw new Exception("Connection Failed", 1);
}

// Get what connections are available based on the passed direction and location
try {
	$dbh->beginTransaction();

	// Create the statement
	$stmt = $dbh->prepare("SELECT * FROM charts WHERE start = ? AND endpoint = ?;");
	$stmt->bindParam(1, $_GET['start']);
	$stmt->bindParam(2, $_GET['endpoint']);

	$stmt->execute();
	$response = $stmt->fetchAll();
} catch (Exception $ex) {
	$response["error"] = "Failed to form a response: " . $ex.getMessage();
}

// return all locations
echo json_encode($response);
?>