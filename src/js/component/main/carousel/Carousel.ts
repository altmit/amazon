import { Base } from "../../Base";
import { Controller } from "./Controller";

export class Carousel extends Base {
  controller: Controller;
  constructor() {
    super("div");
    this.controller = new Controller();
  }

  getView() {
    return this.controller.view;
  }
}
