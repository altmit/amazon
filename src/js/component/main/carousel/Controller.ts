import { Base } from "../../Base";
import { Model } from "./Model";
import { View } from "./View";

export class Controller {
  model: Model;
  view: Base;
  constructor() {
    this.model = new Model();
    this.view = new View();
  }
}
