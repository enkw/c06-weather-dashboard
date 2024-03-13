const key = "d3ace9294eb8e7555ed6e509548b67cc";
const userInputEl = $('#user-input');
const btnEl = $('#btn');
const recentSearch = "";

// This function grabs the weather for the city entered by the user
function getWeather (event) {
// Look into why preventDefault throws errors when enabled
    // event.preventDefault();

    const userInput = userInputEl.val();
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${key}&units=imperial`;

    console.log(userInput);
    console.log(requestUrl);

    fetch(requestUrl).then(response => {
        if (!response.ok) {
            throw Error('Network response not found');
        }
        return response.json();
    }).then(data => printResults(data))
    .catch(error => {
        console.error('Error', error);
    });
};

// This function prints the results fetched above and prints them to a page as a card
function printResults(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    const resultsCard = `
    <div class="card">
        <div class="card-body">
            <h3 class="card-text">${data.name}</h3>
            <img src="${iconUrl}" alt="Weather Condition Icon">
            <p class="card-text">Temp: ${data.main.temp}°F</p>
            <p class="card-text">Wind: ${data.wind.speed} mph</p>
            <p class="card-text">Humidity: ${data.main.humidity}</p>
        </div>
    </div>`;
    $('#local-weather').html(resultsCard);
};

// Causes getWeather to run when the user clicks the "Search" button
btnEl.on('click', getWeather);