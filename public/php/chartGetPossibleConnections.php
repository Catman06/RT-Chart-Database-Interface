<?php
// Returns the connections to/from a given location
// Takes 'dir' as either 'to' or 'from' and location as the name of the location
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
	throw new Exception("Connection Failed", 1);
}

// Get what connections are available based on the passed direction and location
try {
	$dbh->beginTransaction();

	// Create the statement
	$stmt;
	if ($_GET['dir'] == "from") {
		$stmt = $dbh->prepare("SELECT endpoint FROM charts WHERE start = ?;");
	} elseif ($_GET['dir'] == "to") {
		$stmt = $dbh->prepare("SELECT start FROM charts WHERE endpoint = ?;");
	} else {
		$response["error"] = "Invalid 'dir' given: " . $ex.getMessage();
		throw new Exception("Invalid 'dir' given.", 1);
	}
	$stmt->bindParam(1, $_GET['location']);

	$stmt->execute();
	foreach ($stmt->fetchAll() as $system) {
		$response[] = $system[0];
	}
} catch (Exception $ex) {
	$response["error"] = "Failed to form a response: " . $ex.getMessage();
}

echo json_encode($response);
?>