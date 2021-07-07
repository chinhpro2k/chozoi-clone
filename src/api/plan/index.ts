import {getRequest, IApiResponse} from "../index";
import {IResAPlan, IResPlan, IResSuccessPlan} from "./response";

function getListPlan():Promise<IApiResponse<IResPlan>>{
  return getRequest(`/plan`)
}
function getPlan(planId:string):Promise<IApiResponse<IResAPlan>>{
  return getRequest(`/plan/${planId}`)
}
export {
  getListPlan,
  getPlan
}