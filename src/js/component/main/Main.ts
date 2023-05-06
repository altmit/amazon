import { Base } from "../Base";
import { Carousel } from "./carousel/Carousel";

export class Main extends Base {
  carousel: Carousel;
  constructor() {
    super("div");
    this.carousel = new Carousel();
    this.init();
  }

  init() {
    this.setChildren(this.carousel.getView());
  }
}
