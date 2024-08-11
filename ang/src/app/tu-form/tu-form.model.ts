export interface TestCheckBox {
  versionKey: string,
  versionName: string,
  versionHelpTxt: string,
  versionColour: string,
  versionChecked: boolean,
}

export enum EVersionName {
  'Alfa',
  'Beta',
  'Release'
}