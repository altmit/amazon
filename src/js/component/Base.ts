import { ElementObj, ElementType, TextElementObj } from "../types";
import { HtmlParser } from "./../HtmlParser";
export class Base {
  node: Element;
  htmlParser: HtmlParser;
  constructor(tagName: string) {
    this.htmlParser = new HtmlParser();
    this.node = document.createElement(tagName);
  }

  setAttribute(attName: string, attValue: string, target: Element = this.node) {
    target.setAttribute(attName, attValue);
  }

  setChildren(...children: Base[]) {
    children.forEach((child) => {
      this.node.appendChild(child.node);
    });
  }

  setTemplate(template: string) {
    const elementData = this.htmlParser.getElements(template);
    if (elementData.length) {
      elementData.forEach((child) => {
        this.node.appendChild(this.createChild(child));
      });
    }
  }

  createChild(child: ElementType) {
    const isElementObj = this.isElementObj(child);
    if (isElementObj) {
      const element = this.createElement(child);
      const children = child.children;
      if (children.length) {
        children.forEach((child) => {
          element.appendChild(this.createChild(child));
        });
      }
      return element;
    } else {
      const element = this.createTextElement(child);
      return element;
    }
  }

  isElementObj(obj: ElementType): obj is ElementObj {
    return obj.type === "element";
  }

  isTextElementObj(obj: ElementType): obj is TextElementObj {
    return obj.type === "text";
  }

  createElement(data: ElementObj) {
    const element = document.createElement(data.tagName);
    data.attributes.forEach((attr) => {
      this.setAttribute(attr.name, attr.value, element);
    });
    return element;
  }

  createTextElement(data: TextElementObj) {
    const element = document.createTextNode(data.text || "");
    return element;
  }
}
