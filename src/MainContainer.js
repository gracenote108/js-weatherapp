import Banner from "./Banner.js";
import MainBody from "./MainBody";

export default class MainContainer {
  constructor(parentId) {
    const main = document.getElementById(parentId);

    const banner = new Banner(main.id);
    const mainBody = new MainBody(main.id);
  }
}
