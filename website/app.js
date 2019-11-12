// Personal API Key and URL for OpenWeatherMap API
const apiKey = '739069c10a4e03a904d4b079cb4afbd3';
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather';

/* Function called by event listener */
const handleNewData = async evt => {
  let zip = document.querySelector('#zip').value;
  zip = `${zip},us`;
  const feelings = document.querySelector('#feelings').value;
  try {
    const weatherData = await getWeather(weatherURL, apiKey);
    const data = {
      temp: Math.round(weatherData.main.temp),
      date: new Date(weatherData.dt * 1000).toUTCString(),
      feelings
    };
    await postData('/add', data);
    const newData = await getData('/all');
    const projectData = await newData.json();
    updateUI(projectData);
  } catch (error) {
    throw error;
  }
};

const updateUI = ({ temp, date, feelings }) => {
  document.getElementById('temp').innerHTML = `Temperature: ${temp}`;
  document.getElementById('date').innerHTML = `Date: ${date}`;
  document.getElementById('content').innerHTML = `Feelings: ${feelings}`;
  document.querySelector('#zip').value = '';
  document.querySelector('#feelings').value = '';
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, apiKey, zip = '01519,us') => {
  try {
    const response = await fetch(
      `${baseURL}?zip=${zip}&appid=${apiKey}&units=imperial`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/* Function to GET Project Data */
const getData = async url => {
  try {
    const data = await fetch(url);
    return data;
  } catch (error) {
    throw error;
  }
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', handleNewData);
