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

// Add the provided info to the database
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare('INSERT INTO charts (start, endpoint, quality, astronomican, rules, maker, duration, stability) VALUES (?,?,?,?,?,?,?,?)');
	$stmt->bindParam(1, $_POST['start']);
	$stmt->bindParam(2, $_POST['endpoint']);
	$stmt->bindParam(3, $_POST['quality']);
	$stmt->bindParam(4, $_POST['astronomican']);
	$stmt->bindParam(5, $_POST['rules']);
	$stmt->bindParam(6, $_POST['maker']);
	$stmt->bindParam(7, $_POST['duration']);
	$stmt->bindParam(8, $_POST['stability']);
	$stmt->execute();
	$dbh->commit();
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed to add to database: " . $ex, 1);
}

// return all locations
echo json_encode($response);
?>