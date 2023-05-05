export interface ElementObj {
  type: string;
  tagName: string;
  attribute: { name: string; value: string }[];
  children: (ElementObj | TextElementObj)[];
}

export interface TextElementObj {
  type: string;
  text: string | null;
}
