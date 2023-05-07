export class Model {
  slideState: "stop" | "next" | "prev";
  currentIndex: number;
  maxIndex: number;
  carouselInitList: string[];
  constructor() {
    this.slideState = "stop";
    this.currentIndex = 0;
    this.maxIndex = 5;
    this.carouselInitList = [
      "src/assets/carousel/carousel_5.jpg",
      "src/assets/carousel/carousel_0.jpg",
      "src/assets/carousel/carousel_1.jpg",
    ];
  }

  setSlideState(state: "stop" | "next" | "prev") {
    this.slideState = state;
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getSlideState() {
    return this.slideState;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getMaxIndex() {
    return this.maxIndex;
  }

  getCarouselInitList() {
    return this.carouselInitList;
  }

  getImgSrc(index: number) {
    return `src/assets/carousel/carousel_${index}.jpg`;
  }
}
