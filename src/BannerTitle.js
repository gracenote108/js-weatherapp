import MainBodyManager from "./MainBodyManager.js";

export default class BannerTitle {
  #element;

  constructor(parentId) {
    const parent = document.getElementById(parentId);

    const titleBox = document.createElement("div");
    titleBox.id = "bannertitle";
    titleBox.classList = "flex-column font-styles";

    const odin = document.createElement("div");
    odin.id = "odin";
    odin.textContent = "Thunder";

    const crystal = document.createElement("div");
    crystal.id = "crystal";
    crystal.textContent = "Gods";

    const ball = document.createElement("div");
    ball.id = "ball";
    ball.textContent = "Forecast";

    titleBox.append(odin, crystal, ball);
    this.#element = titleBox;
    parent.append(titleBox);

    MainBodyManager.addBannerTitle(this);
  }

  get element() {
    return this.#element;
  }
}
