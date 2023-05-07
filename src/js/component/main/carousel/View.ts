import { Base } from "../../Base";

export class View extends Base {
  constructor() {
    super("div");
    this.init();
  }

  init() {
    this.setAttribute("id", "carousel");
  }

  addChild(carouselInitList: string[]) {
    const template = `
        <div class="carousel__btnWrapper">
            <button class="carousel__button prevSlide" data-component="prevSlideBtn">
                <img src="./src/assets/LeftButton.svg" /></button
            ><button class="carousel__button nextSlide" data-component="nextSlideBtn">
                <img src="./src/assets/RightButton.svg" />
            </button>
        </div>
        <div class="carousel__wrapper" data-component="wrapper">
        ${carouselInitList
          .map((src) => {
            return `<img class="carousel__item" src="${src}">`;
          })
          .join("")}
        </div>
    `;
    this.setTemplate(template);
  }
}
