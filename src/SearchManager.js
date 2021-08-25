import WeatherBox from "./WeatherBox.js";

class SearchManager {
  #searchForm;
  #searchObj;
  #mainBody;

  addSearchFormReference(searchForm) {
    this.#searchForm = searchForm;

    searchForm.addEventListener("submit", this.handleSearch.bind(this));
  }

  async handleSearch(e) {
    e.preventDefault();
    this.#mainBody.setLoading();
    const { currentTarget } = e;
    const unit = document.getElementById("unitselector").classList.value;
    const result = await this.#searchObj.searchForCity(
      currentTarget["searchbox"].value,
      unit
    );
    this.#mainBody.clearBody();

    if (result.length === 0) {
      this.#mainBody.element.innerHTML = `<div class="flex-row jc-center ai-center">City not found.</div>`;
      let div = document.createElement("div");
      div.innerHTML;
      return;
    }

    for (let res of result) {
      new WeatherBox(this.#mainBody.element.id, res, unit);
    }
  }

  addSearchReference(prSearch) {
    this.#searchObj = prSearch;
  }

  addMainBodyReference(mainBody) {
    this.#mainBody = mainBody;
  }
}

const instance = new SearchManager();
export default instance;
