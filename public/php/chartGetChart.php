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

// Get what charts are available based on the passed information
try {
	$dbh->beginTransaction();

	// Create the statement
	// If neither start nor endpoint were provided
	if (!$_GET['start'] && !$_GET['endpoint']) {
		$stmt = $dbh->prepare("SELECT * FROM charts");
	// If just start wasn't provided
	} elseif (!$_GET['start']) {
		$stmt = $dbh->prepare("SELECT * FROM charts WHERE endpoint = ?");
		$stmt->bindParam(1, $_GET['endpoint']);
	// If just endpoint wasn't provided
	} elseif (!$_GET['endpoint']) {
		$stmt = $dbh->prepare("SELECT * FROM charts WHERE start = ?");
		$stmt->bindParam(1, $_GET['start']);
	// If both were provided
	} else {
		$stmt = $dbh->prepare("SELECT * FROM charts WHERE start = ? AND endpoint = ?;");
		$stmt->bindParam(1, $_GET['start']);
		$stmt->bindParam(2, $_GET['endpoint']);
	}

	$stmt->execute();
	$response = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $ex) {
	$response["error"] = "Failed to form a response: " . $ex.getMessage();
}

// return all locations
echo json_encode($response);
?>