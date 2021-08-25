import BannerTitle from "./BannerTitle.js";
import Search from "./Search.js";
import Info from "./Info.js";

export default class Banner {
  #element;

  constructor(parentId) {
    const parent = document.getElementById(parentId);
    const banner = document.createElement("div");
    banner.id = "thebanner";
    banner.classList =
      "flex-row jc-space-evenly ai-center nord-font normal-font border-bottom";

    this.#element = banner;
    parent.append(banner);

    const title = new BannerTitle(this.#element.id);
    const search = new Search(this.#element.id);
    const infobox = new Info(this.#element.id);
  }
}
