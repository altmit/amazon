import { ElementObj, TextElementObj } from "./types";

export class HtmlParser {
  domParser: DOMParser;
  constructor() {
    this.domParser = new DOMParser();
  }

  getElements(htmlString: string) {
    const htmlElement = this.domParser.parseFromString(htmlString, "text/html");
    const elements = Array.from(htmlElement.body.children);

    return elements.map((element) => {
      return this.traverse(element);
    });
  }

  traverse(element: Element) {
    const elementObj: ElementObj = {
      type: "element",
      tagName: element.tagName,
      attributes: [],
      children: [],
    };

    if (element.hasAttributes()) {
      const attrs = element.attributes;
      for (const attr of attrs) {
        const obj = { name: attr.name, value: attr.value };
        elementObj.attributes.push(obj);
      }
    }

    if (element.hasChildNodes()) {
      const children = element.childNodes;
      children.forEach((child) => {
        const isElementNode = child.nodeType === Node.ELEMENT_NODE;
        const isTextElementNode = child.nodeType === Node.TEXT_NODE;

        if (isElementNode && child instanceof Element) {
          elementObj.children.push(this.traverse(child));
          return;
        }

        if (isTextElementNode && child.textContent !== null) {
          const text = child.textContent.replaceAll("\n", "").trim();
          const textElementObj: TextElementObj = {
            type: "text",
            text: text,
          };
          elementObj.children.push(textElementObj);
          return;
        }
      });
    }

    return elementObj;
  }
}
