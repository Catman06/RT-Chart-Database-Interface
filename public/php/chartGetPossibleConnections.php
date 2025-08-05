<?php
// Returns the connections to/from a given location
// Takes 'dir' as either 'to' or 'from' and location as the name of the location

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
}

// Get what connections are available based on the passed direction and location
try {
	$dbh->beginTransaction();
	$stmt;
	if ($_GET['dir'] == "from") {
		$stmt = $dbh->prepare("SELECT endpoint FROM charts WHERE start = '" . $_GET['location'] . "';");
	} elseif ($_GET['dir'] == "to") {
		$stmt = $dbh->prepare("SELECT start FROM charts WHERE endpoint = '" . $_GET['location'] . "';");
	} else {
		throw new Exception("No valid 'dir' given.", 1);
	}

	$stmt->execute();
	foreach ($stmt->fetchAll() as $system) {
		$response[] = $system[0];
	}
} catch (Exception $ex) {
	$response["error"] = "Failed to form a response: " . $ex.getMessage();
}

	// Get the possible destinations


// return all locations
echo json_encode($response);
?>