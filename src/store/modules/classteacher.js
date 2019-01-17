import {checkRepeat, submitExcelInfo,submitClassTInfo} from "../../api/classteacher";

const classteacher={
  actions:{
    CheckRepeatClassT({commit},jobId){
      return new Promise((resolve,reject)=>{
        checkRepeat(jobId).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitClassTInfo({commit},classTInfo){
      return new Promise((resolve,reject)=>{
        submitClassTInfo(classTInfo).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitExcelClassTInfo({commit},classTInfo){
      return new Promise((resolve,reject)=>{
        submitExcelInfo(classTInfo).then((res)=>{
          resolve(res);
        })
      })
    }
  }
}

export default classteacher;
