const apiKey = "6054afaaf44f4c14b03151648252606";
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const weatherCards = document.getElementById("weatherCards");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  getWeather("Cairo");
});

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    const data = await res.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      alert("API Error: " + data.error.message);
      return;
    }

    showForecast(data);
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Fetch Error: " + err.message);
  }
}


function showForecast(data) {
  const forecast = data.forecast.forecastday;
  const cityName = data.location.name;
  const current = data.current;

  weatherCards.innerHTML = ""; 

  forecast.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = `${dayName} - ${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;

    const icon = day.day.condition.icon;
    const condition = day.day.condition.text;
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const humidity = day.day.avghumidity;
    const windSpeed = day.day.maxwind_kph;
    const windDir = day.day.wind_dir;

 
    let cardHeaderColor, cardBodyColor;
    if (index === 1) {
      cardHeaderColor = "#222530";
      cardBodyColor = "#262936";
    } else {
      cardHeaderColor = "#2D303D";
      cardBodyColor = "#323544";
    }

   
   let currentSection = "";
if (index === 0) {
  currentSection = `
    <div class="current-now mb-3">
      <h2 class="mb-2 text-info">${cityName}</h2>

      <h1 class="display-4 fw-bold mb-2">${current.temp_c}°C</h1>

      <div class="mb-2">
        <img src="https:${current.condition.icon}" alt="weather now" width="80" />
      </div>

      <p class="fw-bold mb-3">${current.condition.text}</p>

      <p class="mb-1">🌡️ Min: ${day.day.mintemp_c}°C / Max: ${day.day.maxtemp_c}°C</p>

     <div class="d-flex justify-content-center gap-3  small text-white-50">
  <span>💧 Humidity: ${humidity}%</span>
  <span>💨 Wind: ${windSpeed} km/h</span>
  <span>🧭 Direction: ${windDir}</span>
</div>

    </div>
  `;
}

    const cardHTML = `
      <div class="col-lg-4 col-md-6">
        <div class="forecast-card rounded-4 overflow-hidden">
          <div class="card-header py-2 px-3 text-white" style="background-color: ${cardHeaderColor};">
            <h5 class="mb-0">${formattedDate}</h5>
          </div>
          <div class="card-body text-center text-white py-4" style="background-color: ${cardBodyColor};">
  ${index === 0 ? currentSection : `
    <h2 class="mb-2 text-info">${cityName}</h2>
    <div class="mb-2">
      <img src="https:${icon}" alt="forecast icon" width="80" />
    </div>
    <p class="condition fw-bold mb-2">${condition}</p>
    <p class="temp mb-1">🌡️ Min: ${minTemp}°C / Max: ${maxTemp}°C</p>
   <div class="d-flex justify-content-center gap-3  small text-white-50">
  <span>💧 Humidity: ${humidity}%</span>
  <span>💨 Wind: ${windSpeed} km/h</span>
  <span>🧭 Direction: ${windDir}</span>
</div>

  `}
</div>

        </div>
      </div>
    `;

    weatherCards.innerHTML += cardHTML;
  });
}

