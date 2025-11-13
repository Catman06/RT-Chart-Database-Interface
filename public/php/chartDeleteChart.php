<?php
set_exception_handler("exception_handler");
function exception_handler(Throwable $ex)
{
	echo $ex;
	exit(1);
}

// Get the input from the request
$input = file_get_contents("php://input");
$json_array = json_decode(
	json: $input,
	associative: true,
	flags: JSON_THROW_ON_ERROR,
);

$response = [];

// Create a connection to the db
try {
	$dbh = new PDO(
		"pgsql:host=postgresql;port=5432;dbname=valentine_charts;user=valentine",
		password: "example",
	);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
	throw new Exception("Connection failed: " . $ex, 1);
}

// Remove the provided chart from the database
try {
	$dbh->beginTransaction();
	$stmt = $dbh->prepare("DELETE FROM charts WHERE start = ? AND endpoint = ?");
	$stmt->bindParam(1, $json_array["start"]);
	$stmt->bindParam(2, $json_array["endpoint"]);
	$stmt->execute();
	$dbh->commit();
} catch (Exception $ex) {
	$dbh->rollBack();
	throw new Exception("Failed to delete from database: " . $ex, 1);
}

echo json_encode($response);
?>
