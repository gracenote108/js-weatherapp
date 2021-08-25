export default class WeatherBox {
  constructor(parentId, data, unitType) {
    const parent = document.getElementById(parentId);
    const unitTypeObj = this.unitSelector(unitType);
    parent.append(this.createWeatherBox(data, unitTypeObj));
  }

  createWeatherBox(weatherData, unitTypeObj) {
    const {
      name: cityName,
      weather,
      sys: sunObj,
      coord: coordObj,
      wind: windObj,
      main: weatherObj,
    } = weatherData;

    const { lon, lat } = coordObj;
    const { sunrise, sunset, country } = sunObj;
    const { humidity, temp, feels_like, temp_max, temp_min } = weatherObj;
    const { speed: windSpeed } = windObj;
    const { main: skyQuality } = weather[0];

    const weatherBox = document.createElement("div");
    weatherBox.id = "weatherbox";
    weatherBox.classList = "flex-column border";

    const locationInfo = document.createElement("div");
    locationInfo.id = "locationinfo";
    locationInfo.classList = "flex-column ai-center border-bottom";

    const cityNameDiv = document.createElement("div");
    cityNameDiv.textContent = `${cityName},${country}`;

    const coordDiv = document.createElement("div");
    coordDiv.textContent = `${lon}|${lat}`;

    const skyQual = document.createElement("div");
    skyQual.textContent = skyQuality;

    locationInfo.append(cityNameDiv);
    locationInfo.append(coordDiv);
    locationInfo.append(skyQual);

    const temperatureInfo = document.createElement("div");
    temperatureInfo.id = "temperatureinfo";
    temperatureInfo.classList = "border-bottom";
    temperatureInfo.append(
      this.labelGenerator("Humidity", humidity, unitTypeObj["humidity"])
    );

    temperatureInfo.append(
      this.labelGenerator("Temperature", temp, unitTypeObj["temperature"])
    );
    temperatureInfo.append(
      this.labelGenerator("Feels Like", feels_like, unitTypeObj["temperature"])
    );
    temperatureInfo.append(
      this.labelGenerator("Max Temp", temp_max, unitTypeObj["temperature"])
    );
    temperatureInfo.append(
      this.labelGenerator("Min Temp", temp_min, unitTypeObj["temperature"])
    );

    const otherInfo = document.createElement("div");
    otherInfo.id = "otherinfo";
    otherInfo.classList = "flex-column";

    otherInfo.append(
      this.labelGenerator("Wind Speed", windSpeed, unitTypeObj["windspeed"])
    );
    otherInfo.append(
      this.labelGenerator("Sunrise", this.unixDateTimeConverter(sunrise), "")
    );
    otherInfo.append(
      this.labelGenerator("Sunset", this.unixDateTimeConverter(sunset), "")
    );

    weatherBox.append(locationInfo);
    weatherBox.append(temperatureInfo);
    weatherBox.append(otherInfo);

    return weatherBox;
  }

  unitSelector(unitType) {
    const metric = {
      temperature: "\u00B0C",
      windspeed: "m/s",
      humidity: "%",
    };
    const imperial = {
      temperature: "\u00B0F",
      windspeed: "mi/h",
      humidity: "%",
    };

    return unitType === "metric" ? metric : imperial;
  }

  unixDateTimeConverter(unixDate) {
    const dateObj = new Date(unixDate * 1000);
    const dateString = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
    return dateString;
  }

  labelGenerator(prLabel, prLabelValue, unit) {
    const labelContainer = document.createElement("div");
    labelContainer.classList = "flex-row jc-space-between";
    const labelName = document.createElement("div");
    labelName.textContent = `${prLabel}: `;
    const labelValue = document.createElement("div");
    labelValue.textContent = `${prLabelValue}${unit}`;
    labelContainer.append(labelName, labelValue);

    return labelContainer;
  }
}
