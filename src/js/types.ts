export interface ElementObj {
  type: string;
  tagName: string;
  attribute: object[];
  children: (ElementObj | TextElementObj)[];
}

export interface TextElementObj {
  type: string;
  text: string | null;
}
