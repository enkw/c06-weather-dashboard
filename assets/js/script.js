const key = "d3ace9294eb8e7555ed6e509548b67cc";
const userInputEl = $('#user-input');
const btnEl = $('#btn');
let recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || [];

function readRecentSearch() {
    let recentSearch = JSON.parse(localStorage.getItem('recentSearch'));
    if (!recentSearch) {
        recentSearch = [];
    }
    return recentSearch;
}

function saveRecentSearch(recentSearch) {
    localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
}

// This function grabs the weather for the city entered by the user
function getWeather (event) {
// Look into why preventDefault throws errors when enabled
    // event.preventDefault();

    const userInput = userInputEl.val();
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${key}&units=imperial`;

    console.log(userInput);
    console.log(requestUrl);

    if (!recentSearch) {
        recentSearch = [];
    }

    if (!recentSearch.includes(userInput)) {
        recentSearch.push(userInput);
        saveRecentSearch(recentSearch);
    }

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
    console.log(data);
    // Reference for the icon
    const iconUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
    const searchDate = dayjs.unix(`${data.list[0].dt}`);
    const dateFormat = searchDate.format("MM/DD/YYYY");

    // Today's weather card section
    const resultsCard = `
    <div class="card">
        <div class="card-body">
            <h3 class="card-text">${data.city.name}(${dateFormat})</h3>
            <img src="${iconUrl}" alt="Weather Condition Icon">
            <p class="card-text">Temp: ${data.list[0].main.temp}°F</p>
            <p class="card-text">Wind: ${data.list[0].wind.speed} mph</p>
            <p class="card-text">Humidity: ${data.list[0].main.humidity}</p>
        </div>
    </div>`;
    $('#local-weather').html(resultsCard);
    // Five day forecast section
    let forecastCards = `<div class="card-group">`
    // For loop to get every eigh results (every 24 hours) and print them to a card group
    for (let i = 1; i <= 4; i++) {
        const index = i * 8;
        const forecast = data.list[index];
        const forecastDate = dayjs.unix(`${forecast.dt}`);
        const forecastFormat = forecastDate.format("MM/DD/YYYY");
        const forecastIcons = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
        forecastCards += `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">${forecastFormat}</h3>
                <img src="${iconUrl}" alt="Weather Condition Icon"></img>
                <p class="card-text">Temp: ${forecast.main.temp}°F</p>
                <p class="card-text">Wind: ${forecast.wind.speed} mph</p>
                <p class="card-text">Humidity: ${forecast.main.humidity}</p>
            </div>
        </div>
    </div>`;
    }
    $('#forecast').html(forecastCards);
};

// Causes getWeather to run when the user clicks the "Search" button
btnEl.on('click', getWeather);