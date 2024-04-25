async function getWeather(location) {
    try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=8312fb0126e14f47ab825213242304&q=${location}`)
    const weather = await response.json();
    console.log(weather)
    return weather;
} catch (error) {
    console.error('Error fetching data:', error);
    return null;
    }
}
getWeather();

function processWeatherData(weatherData) {
 // Check if jsonData is valid
 // eslint-disable-next-line no-prototype-builtins
 if (!weatherData || !weatherData.hasOwnProperty('current')) {
    console.error('Invalid weather data format');
    return null;
  };

const currentWeather = weatherData.current;
const processedData = {
    celsius: currentWeather.temp_c,
    fahrenheit: currentWeather.temp_f,
    description: currentWeather.condition.text,
  };

  return processedData;
}

async function fetchWeatherAndProcess(location) {
    const weatherData = await getWeather(location);
    if (weatherData) {
      const processedWeather = processWeatherData(weatherData);
      displayWeatherInfo(processedWeather);
    } else {
      console.log('Failed to fetch or process data');
    }
  }

  document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    fetchWeatherAndProcess(location);
  });

  const userInputLocation = document.querySelector("#location").value;
  fetchWeatherAndProcess(userInputLocation);

  function displayWeatherInfo(weatherInfo) {
    const weatherInfoDiv = document.querySelector(".weatherInfo")
    if (weatherInfo) {
        weatherInfoDiv.innerHTML = `
      <h3>Weather Information</h3>
      <p>Temperature (Celsius): ${weatherInfo.celsius}°C</p>
      <p>Temperature (Fahrenheit): ${weatherInfo.fahrenheit}°F</p>
      <p>Description: ${weatherInfo.description}</p>
    `;
    } else {
        weatherInfoDiv.innerHTML = '<p>Failed to fetch weather information</p>';
    }
  }
