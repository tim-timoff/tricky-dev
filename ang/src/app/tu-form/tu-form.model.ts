export interface TestCheckBox {
  id: number,
  versionName: string,
  versionHelpTxt: string,
  signedFor: boolean,
}

export enum EVersionName {
  'Alfa',
  'Beta',
  'Release'
}