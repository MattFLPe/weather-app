async function getWeather () {
    const response = await fetch("http://api.weatherapi.com/v1/current.json")
    const weather = await response.json();
    console.log(weather);
}
getWeather();