<?php
// create the connection
$conn = mysqli_connect("localhost", "root", "", "weather_application");
if (!$conn) {
    die("Error in connection: " . mysqli_connect_error());
}
else{
    echo "connected";
}

$apiKey = "fc67f73347c33d84d1db555dffd337f5";


if(isset($_POST['cityname'])) {
    // Fetches the cityname passed through POST method
    $cityname = $_POST['cityname'];
    // fetch from API
    $apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${apiKey}"; // Replace with the actual API URL
    $json_data = file_get_contents($apiUrl);
    if (!$json_data) {
        die("Error fetching data from API");
    }

    // convert JSON to array
    $data = json_decode($json_data, true);
    if (!$data) {
        die("Error decoding JSON data");
    }

    // access the data
    $city = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : '';
    $temp = isset($data['main']['temp']) ? floatval($data['main']['temp']) : 0.0;
    $humidity = isset($data['main']['humidity']) ? intval($data['main']['humidity']) : 0;
    $wind_speed = isset($data['wind']['speed']) ? floatval($data['wind']['speed']) : 0.0;
    $pressure = isset($data['main']['pressure']) ? floatval($data['main']['pressure']) : 0.0;
    $timestamp = isset($data['dt']) ? intval($data['dt']) : 0;
    $date = gmdate("Y-m-d H:i:s", $timestamp);

    // prepare and run the query
    $sql = "INSERT INTO data (name, temp, humidity, pressure, windspeed, datetime) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    if (!$stmt) {
        die("Error preparing query: " . mysqli_error($conn));
    }

    mysqli_stmt_bind_param($stmt, "sdddds", $city, $temp, $humidity, $pressure, $wind_speed, $date);
    $result = mysqli_stmt_execute($stmt);
    if (!$result) {
        die("Error executing query: " . mysqli_error($conn));
    }

    echo "Weather data inserted successfully";


}

// close the connection
mysqli_stmt_close($stmt);
mysqli_close($conn);


?>

