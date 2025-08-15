<?php
set_exception_handler('exception_handler');
function exception_handler(Throwable $ex) {
	echo $ex;
	exit(1);
}

// Create a connection to the db
try {
	$dbh = new PDO('pgsql:host=localhost;port=5432;dbname=valentine_dynasty;user=valentine');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
	throw new Exception("Connection failed: " . $ex, 1);
}

// Add the provided info to the database
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare('INSERT INTO systems (system) VALUES (?)');
	$stmt->bindParam(1, file_get_contents('php://input'));
	$stmt->execute();
	$dbh->commit();
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed to add to database: " . $ex, 1);
}

echo json_encode("Successfully added system");
?>