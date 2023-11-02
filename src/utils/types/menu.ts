export type creditsType = {
  id: number,
  key: string,
  author: string,
  title: string,
  link: string,
  for: string,
  licence: 'CC BY 3.0' | 'CC0' | '',
  changes?: string
}