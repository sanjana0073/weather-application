const apiKey = "fc67f73347c33d84d1db555dffd337f5";
const searchInput = document.querySelector(".search input[type='text']");
const searchButton = document.querySelector(".search button");

        

// async function fetchWeatherData(city) {

// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
// const response = await fetch(apiUrl);
// const data = await response.json();
// // write in local storage with the name from the data
// window.localStorage.setItem(data.name, data)

// document.getElementById('send_data').addEventListener('click',()=>{
//     viewdata(data.name);
// })

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Accessed from API");
    localStorage.setItem(data.name, JSON.stringify(data)); // Store the data as JSON string
    write(data);
    // Rest of your code...

    document.getElementById('send_data').addEventListener('click', () => {
        viewdata(data.name);
    });

    // Rest of your code...
}


function write(data){
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
    document.querySelector(".pressure").innerHTML = data.main.pressure + "pa";
    const weatherCondition = data.weather[0].main;

}





function searchWeather() {
    const city = searchInput.value.trim();
    if (city !== "") {
        if (navigator.onLine) {
            const storedData = JSON.parse(localStorage.getItem(city));
            if (storedData) {
                console.log("Accessed from localstorage");
                write(storedData);
            } else {
                fetchWeatherData(city);
            }
        } else {
            const storedData = JSON.parse(localStorage.getItem(city));
            if (storedData) {
                console.log("Accessed from localstorage");
                write(storedData);
            } else {
                alert("No internet connection and no data in local storage.");
            }
        }
        searchInput.value = '';
    } else {
        alert("Please enter a city name.");
    }
}


searchButton.addEventListener("click", searchWeather);
searchInput.addEventListener("keyup", function (event) {
if (event.key === "Enter") {
searchWeather();
}
});

function viewdata(cityname){
    console.log("VIEWDATA: Running")
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'weather.php';

    var hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'cityname';
    hiddenField.value = cityname;

    form.appendChild(hiddenField);
    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);
}



fetchWeatherData("North Lanarkshire");