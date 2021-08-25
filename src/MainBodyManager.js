class MainBodyManager {
  #mainBody;
  #bannerTitle;
  #infoView;

  addMainBody(mainBodyObj) {
    this.#mainBody = mainBodyObj;
  }

  addBannerTitle(bannerTitleObj) {
    this.#bannerTitle = bannerTitleObj;
    bannerTitleObj.element.addEventListener(
      "click",
      this.handleBannerClick.bind(this)
    );
  }

  addInfoView(infoViewObj) {
    this.#infoView = infoViewObj;
  }

  /*So, this needs to be called to load the event listener
  because Javascript passes by value instead of reference.
  */
  initMainBodyDependentHandlers() {
    this.#infoView.element.addEventListener(
      "click",
      this.handleInfoViewClick.bind(this, this.#mainBody)
    );
  }

  handleBannerClick() {
    this.#mainBody.defaultView();
  }

  handleInfoViewClick(mainObj) {
    this.#infoView.loadInfo(mainObj);
  }
}

const instance = new MainBodyManager();
export default instance;
