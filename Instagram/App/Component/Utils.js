//
export default class Utils{

static isStringNull = (text) => {
  if(text === '' || text === null || text === '[]' ){
    return true;
  }
  else{
    return false;
  }
}

static isEmailValid = (text)=>{
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (reg.test(text) === false ){
     return false;
   }else{
     return true;
   }
}

static isNameValid = (text)=>{
  const regn = /^[a-zA-Z\s]+$/;
   if (regn.test(text) === false ){
     return false;
   }else{
     return true;
   }
}

static isPassValid = (text)=>{
  const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
   if (regx.test(text) === false ){
     return false;
   }else{
     return true;
   }
}

}
