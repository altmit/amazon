import { ElementObj, TextElementObj } from "../types";
import { HtmlParser } from "./../HtmlParser";
export class Base {
  node: Element;
  template: string;
  htmlParser: HtmlParser;
  constructor(template: string) {
    this.template = template;
    this.htmlParser = new HtmlParser();
    this.node = this.setNode();
  }

  setNode() {
    const elementData = this.htmlParser.getElements(this.template);
    const element = this.createElement(elementData);
    if (elementData.children.length) {
      elementData.children.forEach((child) => {
        element.appendChild(this.setChild(child));
      });
    }

    return element;
  }

  setChild(child: ElementObj | TextElementObj) {
    const isElementObj = this.isElementObj(child);
    if (isElementObj) {
      const element = this.createElement(child);
      const children = child.children;
      if (children.length) {
        children.forEach((child) => {
          element.appendChild(this.setChild(child));
        });
      }
      return element;
    } else {
      const element = this.createTextElement(child);
      return element;
    }
  }

  isElementObj(obj: ElementObj | TextElementObj): obj is ElementObj {
    return obj.type === "element";
  }

  isTextElementObj(obj: ElementObj | TextElementObj): obj is TextElementObj {
    return obj.type === "text";
  }

  createElement(data: ElementObj) {
    const element = document.createElement(data.tagName);
    data.attribute.forEach((attr) => {
      element.setAttribute(attr.name, attr.value);
    });
    return element;
  }

  createTextElement(data: TextElementObj) {
    const element = document.createTextNode(data.text || "");
    return element;
  }
}
