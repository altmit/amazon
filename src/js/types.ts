export interface ElementObj {
  type: string;
  tagName: string;
  attributes: { name: string; value: string }[];
  children: (ElementObj | TextElementObj)[];
}

export interface TextElementObj {
  type: string;
  text: string | null;
}

export type ElementType = ElementObj | TextElementObj;
