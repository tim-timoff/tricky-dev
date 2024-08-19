export type THexColor = `#${string}`;

export enum ETagColor {
  pink   = '#F14E56',
  blue   = '#587EDD',
  gray   = '#979A9E',
  silver = '#A7BED5',
  green  = '#81A11A',
  teal   = '#20A696',
}

export type TTagColor = keyof typeof ETagColor | THexColor;

export type TTagKey = string | number | null;
export type TTagSize = 'normal' | 'small';

export interface ICheckableTagState {
  isCheckAll: boolean;
  checked: boolean;
  key: TTagKey;
}
