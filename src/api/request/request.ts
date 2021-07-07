export interface IResRegister {
  "firstName": string,
  "lastName": string,
  "email": string,
  "password": string
}

export interface IResLogin {
  "email": string,
  "password": string
}

export interface IResLoginAdmin {
  "account": string,
  "password": string
}

export interface IResUser {
  "id": string
  "firstName": string,
  "lastName": string,
  "email": string,
  "password": string,
  type: string,
  "age": number,
  "birthday": string,
  "phoneNumber": string,
  "idPlan":string
}

export interface IResAdmin {
  "id": string
  "firstName": string,
  "lastName": string,
  type: string
}

export interface IReqQuestion {
  "answer":
    {
      "content": string,
      "point": number
    }[]
  "title": string,
  "content": string
}

export interface IReqPlan {
  "point": number,
  "planName": string,
  "content": string
}