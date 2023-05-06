import { Base } from "../../Base";

export class View extends Base {
  constructor() {
    super("div");
    this.init();
  }

  init() {
    this.setAttribute("id", "carousel");
    this.addChild();
  }

  addChild() {
    const template = `
        <div class="carousel__btnWrapper">
            <button class="carousel__button prevSlide" data-elementname="prevSlideBtn">
                <img src="./src/assets/LeftButton.svg" /></button
            ><button class="carousel__button nextSlide" data-elementname="nextSlideBtn">
                <img src="./src/assets/RightButton.svg" />
            </button>
        </div>
        <div class="carousel__wrapper" data-elementname="wrapper">
            hi
        </div>
    `;

    this.setTemplate(template);
  }
}
