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

// Get requested data from the database
try {
	$dbh->beginTransaction();

	// Create the statement
	$stmt;
	if ($_GET['col'] == "id") {
		$stmt = $dbh->prepare("SELECT id, system->>'name' AS name FROM systems WHERE id = ?");
		$stmt->bindValue(1, $_GET['query']);
	} elseif ($_GET['col'] == "names") {
		$stmt = $dbh->prepare("SELECT id, system->>'name' AS name FROM systems");
	} elseif ($_GET['col'] == "elementType") {
		$stmt = $dbh->prepare("SELECT id, elements->>'name' AS name, elements->>'type' AS type FROM systems,
		jsonb_array_elements(system->'elements') AS elements
		WHERE elements->>'type' LIKE ?");
		$stmt->bindValue(1, $_GET['query']);
	} elseif ($_GET['col'] == "elementName") {
		$stmt = $dbh->prepare("SELECT id, elements->>'name' AS name, elements->>'type' AS name FROM systems,
		jsonb_array_elements(system->'elements') AS elements
		WHERE elements->>'name' LIKE ?");
		$stmt->bindParam(1, $_GET['query']);
	} else {
		$response["error"] = "Invalid 'col' given: " . $ex;
		throw new Exception("Invalid 'col' given.", 1);
	}

	$stmt->execute();
	$stmt->SetFetchMode(PDO::FETCH_NAMED);

	$response += $stmt->fetchAll();
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed get from database: " . $ex, 1);
}

echo json_encode($response);
?>