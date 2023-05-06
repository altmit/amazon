import { Base } from "./component/Base";
import { Main } from "./component/main/Main";

class App extends Base {
  main: Base;
  constructor() {
    super("div");
    this.main = new Main();
    this.init();
  }

  init() {
    this.setChildren(this.main);
    document.body.appendChild(this.node);
  }
}

new App();
