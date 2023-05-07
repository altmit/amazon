import { Model } from "./Model";
import { View } from "./View";

export class Controller {
  model: Model;
  view: View;
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.init();
  }

  init() {
    this.setCarousel();
    this.setEvent();
  }

  setCarousel() {
    this.view.addChild(this.model.getCarouselInitList());
  }

  setEvent() {
    const nextSlideBtn = this.view.components["nextSlideBtn"];
    const prevSlideBtn = this.view.components["prevSlideBtn"];
    nextSlideBtn.addEventListener("click", this.slideTo.bind(this, "next"));
    prevSlideBtn.addEventListener("click", this.slideTo.bind(this, "prev"));

    const wrapperNode = this.view.components["wrapper"];
    wrapperNode.addEventListener("transitionend", this.transitionendHandler.bind(this));
  }

  slideTo(direction: "next" | "prev") {
    const wrapperNode = this.view.components["wrapper"];
    wrapperNode.style.transition = "transform 450ms ease-in-out";
    this.model.setSlideState(direction);

    const isNext = direction === "next";

    if (isNext) {
      wrapperNode.style.transform = "translateX(-200%)";
    } else {
      wrapperNode.style.transform = "translateX(0%)";
    }
  }

  transitionendHandler(event: Event) {
    const state = this.model.getSlideState();
    const index = this.model.getCurrentIndex();
    const currentIndex = this.calculateIndex(index, state);
    this.model.setCurrentIndex(currentIndex);

    const wrapperNode = event.currentTarget as HTMLElement;
    wrapperNode.style.transition = "none";

    const newIndex = this.calculateIndex(currentIndex, state);
    const newSrc = this.model.getImgSrc(newIndex);
    const isNext = state === "next";

    if (isNext) {
      const firstNode = wrapperNode.children[0];
      wrapperNode.appendChild(firstNode);
      firstNode.setAttribute("src", newSrc);
    } else {
      const lastNode = wrapperNode.children[wrapperNode.children.length - 1];
      wrapperNode.prepend(lastNode);
      lastNode.setAttribute("src", newSrc);
    }

    this.model.setSlideState("stop");
    wrapperNode.style.transform = `translateX(-100%)`;
  }

  calculateIndex(index: number, state: "next" | "prev" | "stop") {
    const isNext = state === "next";

    if (isNext) {
      return index === this.model.maxIndex ? 0 : index + 1;
    } else {
      return index === 0 ? this.model.maxIndex : index - 1;
    }
  }
}
