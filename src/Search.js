import axios from "axios";
import SearchManager from "./SearchManager.js";
import apikey from "./config.js";

export default class Search {
  #element;
  #weatherUrl = "https://api.openweathermap.org/data/2.5/weather?id=";
  #apiKey = `&APPID=${apikey}`;

  constructor(parentId) {
    const parent = document.getElementById(parentId);

    const search = document.createElement("div");
    search.id = "searchbar";

    const searchForm = document.createElement("form");
    searchForm.name = "searchform";
    searchForm.classList = "flex-row ai-center";

    const searchContainer = document.createElement("div");
    searchContainer.id = "searchcontainer";
    searchContainer.classList = "flex-column jc-center ai-center";

    const searchInput = document.createElement("input");
    searchInput.id = "searchinput";
    searchInput.name = "searchbox";
    searchInput.type = "textbox";
    searchInput.required = true;
    searchInput.placeholder = "City Name";
    searchContainer.append(searchInput);

    const unitSelector = document.createElement("div");
    unitSelector.id = "unitselector";
    unitSelector.classList = "metric";
    unitSelector.addEventListener("click", function () {
      unitSelector.classList.toggle("metric");
      unitSelector.classList.toggle("imperial");
    });
    searchContainer.append(unitSelector);

    const metric = document.createElement("div");
    metric.id = "metric";
    metric.textContent = "Metric";

    const imperial = document.createElement("div");
    imperial.id = "imperial";
    imperial.textContent = "Imperial";

    unitSelector.append(metric, imperial);

    searchForm.append(searchContainer);

    const sunGif = document.createElement("div");
    sunGif.id = "sungif";
    sunGif.classList = "sungif flex-row ai-center jc-center";

    const searchButton = document.createElement("input");
    searchButton.id = "searchbutton";
    searchButton.type = "submit";
    searchButton.value = "Search";
    sunGif.append(searchButton);
    searchForm.append(sunGif);
    SearchManager.addSearchFormReference(searchForm);

    search.append(searchForm);
    this.#element = search;
    parent.append(search);
    SearchManager.addSearchReference(this);
  }

  async searchForCity(prCity, unit) {
    const result = await fetch("./city.list.json")
      .then((cities) => cities.json())
      .then((citiesArray) =>
        citiesArray.filter(
          (city) => city.name.toUpperCase() === prCity.toUpperCase()
        )
      )
      .then((filteredCities) => filteredCities.map((fCity) => fCity.id))
      .then((cityIds) =>
        Promise.all(
          cityIds.map(
            async (id) =>
              await axios.get(
                `${this.#weatherUrl}${id}${this.#apiKey}&units=${unit}`
              )
          )
        )
      )
      .then((axiosResult) =>
        axiosResult
          .filter((res) => res["status"] === 200)
          .map((success) => success["data"])
      );

    return result;
  }
}
