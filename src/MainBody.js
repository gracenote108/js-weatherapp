import SearchManager from "./SearchManager.js";
import MainBodyManager from "./MainBodyManager.js";

export default class MainBody {
  #element;
  #loading;
  #homeLoad;

  constructor(parentId) {
    const parent = document.getElementById(parentId);

    const mainBody = document.createElement("div");
    mainBody.id = "mainbody";
    mainBody.classList = "flex-row jc-space-evenly ai-center";

    const loadingImage = document.createElement("img");
    loadingImage.src = "./gifs/loading.gif";
    loadingImage.id = "loadingimage";

    const defaultText = document.createElement("div");
    defaultText.classList = "nord-font normal-font";
    defaultText.textContent = "Thunder God's Forecast";

    this.#element = mainBody;
    this.#loading = loadingImage;
    parent.append(mainBody);
    SearchManager.addMainBodyReference(this);
    MainBodyManager.addMainBody(this);
    MainBodyManager.initMainBodyDependentHandlers();

    this.#homeLoad = defaultText;
    mainBody.append(defaultText);
  }

  defaultView() {
    this.clearBody();
    this.#element.append(this.#homeLoad);
  }

  setLoading() {
    while (this.#element.firstChild)
      this.#element.removeChild(this.#element.firstChild);

    this.#element.append(this.#loading);
  }

  clearBody() {
    while (this.#element.firstChild)
      this.#element.removeChild(this.#element.firstChild);
  }

  get element() {
    return this.#element;
  }
}
