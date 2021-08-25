import MainBodyManager from "./MainBodyManager.js";

export default class Info {
  #element;

  constructor(parentId) {
    const parent = document.getElementById(parentId);

    const infoBox = document.createElement("div");
    infoBox.id = "infobox";
    infoBox.textContent = "Info Page";
    infoBox.classList = "nord-font normal-font font-styles";

    this.#element = infoBox;
    MainBodyManager.addInfoView(this);
    parent.append(infoBox);
  }

  get element() {
    return this.#element;
  }

  loadInfo(mainObj) {
    mainObj.setLoading();
    const creditLinkBox = document.createElement("div");
    creditLinkBox.id = "creditlinkbox";
    creditLinkBox.classList = "flex-column nord-font normal-font";

    creditLinkBox.append(
      this.createLink(
        "https://github.com/gracenote108/OdinProject-JavaScript/tree/main/WeatherApp",
        "GitHub"
      ),
      this.createLink("http://yoworks.com/nord/index.html", "Nord Font"),
      this.createLink(
        "http://clipart-library.com/clipart/pco5A4xKi.htm",
        "Search Link Sun Image"
      ),
      this.createLink("http://gph.is/1gk7Vhd", "Loading Animation")
    );
    mainObj.clearBody();
    mainObj.element.append(creditLinkBox);
  }

  createLink(url, label) {
    const container = document.createElement("div");
    container.classList = "credit-link";
    const ids = ["unhovered", "hovered"];
    for (let id of ids) {
      const link = document.createElement("a");
      link.classList = "font-styles";
      link.id = id;
      link.href = url;
      link.textContent = label;
      container.append(link);
    }

    return container;
  }
}
