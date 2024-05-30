async function getWeatherData(location) {
  const weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=408b203d162d409db4b155345243005&q=${location}&aqi=no`
  );
  const data = await weather.json();
  return data;
}

async function getprocessedData(location) {
  const data = await getWeatherData(location);

  const preoccessedData = {
    location: {
      name: data.location.name,
      country: data.location.country,
    },
    condition: {
      humidity: data.current.humidity,
      windDegree: data.current.wind_degree,
      windDir: data.current.wind_dir,
      temp_f: data.current.temp_f,
      temp_c: data.current.temp_c,
      text: data.current.condition.text,
    },
  };
  return preoccessedData;
}

function main() {
  let locationInput = document.querySelector("#location-input");
  let submitBtn = document.querySelector("#submit-btn");

  let humidityPlaceholder = document.querySelector("#humidity-placeholder");
  let tempPlaceholder = document.querySelector("#temp-placeholder");
  let tempCPlaceholder = document.querySelector("#tempC-placeholder");
  let tempFPlaceholder = document.querySelector("#tempF-placeholder");
  let locationPlaceholder = document.querySelector("#location-placeholder");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getprocessedData(locationInput.value).then((result) => {
      console.log(result);
      humidityPlaceholder.textContent = result.condition.humidity;
      tempPlaceholder.textContent = result.condition.text;
      tempCPlaceholder.textContent = result.condition.temp_c;
      tempFPlaceholder.textContent = result.condition.temp_f;
      locationPlaceholder.textContent = result.location.name;
    });
  });
}

main();
