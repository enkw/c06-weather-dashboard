const key = "d3ace9294eb8e7555ed6e509548b67cc";
const userInputEl = $('#user-input');
const btnEl = $('#btn');
const recentSearch = "";

function getWeather (event) {
    event.preventDefault();

    const userInput = userInputEl.val();
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${key}`;

    console.log(userInput);
    console.log(requestUrl);

    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        } else {
            console.log("that didn't work dawg");
        }
    })
}

btnEl.on('click', getWeather);