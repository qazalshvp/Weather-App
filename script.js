const apiKey = "ed6806f7efddeea903a27cd9248ee78b";
const getWeatherButton = document.getElementById("getWeatherButton");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherButton.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name } = data;
  const { main, weather, wind } = data;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherDescription = weather[0].description;

  weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}
