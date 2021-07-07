export interface IResPlan{
  plan:{
    "id":string
    "point":number,
    "planName": string,
    "content": string
  }[]
}
export interface IResSuccessPlan{
  "id":string
  "point":number,
  "planName": string,
  "content": string
}
export interface IResAPlan{
  "planValue":{
    "id":string
    "point":number,
    "planName": string,
    "content": string
  }
}