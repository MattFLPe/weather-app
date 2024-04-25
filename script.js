async function getWeather () {
    try {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=8312fb0126e14f47ab825213242304&q=brazil")
    const weather = await response.json();
    console.log(weather);
    } catch (error) {
    console.error('Error fetching data:', error);
    return null;
    }
}
getWeather();

function processJSON (json) {
 // Check if jsonData is valid
 // eslint-disable-next-line no-prototype-builtins
 if (!json || !json.hasOwnProperty('results')) {
    console.error('Invalid JSON data format');
    return null;
  };

  const results = json.results;
  const processedData = [];

  results.forEach(result => {
    const processedItem = {
        id: result.id,
        name: result.name,
        description: result.description
    };
    processedData.push(processedItem);
  })
return processedData;
}

async function fetchDataAndProcess() {
    const json = await getWeather();
    if (json) {
      const processedData = processJSON(json);
      console.log(processedData);
    } else {
      console.log('Failed to fetch or process data');
    }
  }

  fetchDataAndProcess();
