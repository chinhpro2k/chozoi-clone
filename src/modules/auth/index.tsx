import React, {Component} from 'react';
import './style.scss'
import Register from "./popup/register";
import {store} from "./store";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {notify} from "../../common/notify/NotifyService";
import {IResLogin, IResLoginAdmin} from "../../api/request/request";
import ForgotPassword from "./popup/forgotPassword";

class Index extends Component {
  constructor(props:any) {
    super(props);
    makeObservable(this,{
      account:observable,
      passwordValue:observable,
      setAccount:action,
      setPasswordValue:action

    })
  }
  account:string=''
  setAccount(e:any){
    this.account=e.target.value
  }
  passwordValue:string=''
  setPasswordValue(e:any){
    this.passwordValue=e.target.value
  }
  handleLongin(){
    if (this.account===''){
      notify.show("Nhập tài khoản","warning",5)
      return false
    }
    if (this.passwordValue===''){
      notify.show("Nhập mật khẩu","warning",5)
      return false
    }
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.account)){
      const data:IResLogin={
        email:this.account,
        password:this.passwordValue
      }
      store.login(data,"user").then();
    }else {
      if (this.account==="admin"){
        const data:IResLoginAdmin={
          account:this.account,
          password:this.passwordValue
        }
        store.login(data,"admin").then();
      }else {
        notify.show("Nhập sai định dạng email","warning",5)
      }

    }

  }
  render() {
    return (
      <div className="auth">
        <div className="header d-flex justify-content-center">
         <div>
           <div className="image">
             <img src="./assets/images.png" alt="alt"/>
           </div>
           <div className="title d-flex justify-content-center">
             <h1>Smart Money</h1>
           </div>
         </div>
        </div>
        <div className="form d-flex justify-content-center">
          <div>
            <h2 className="text-center">Đăng nhập</h2>
            <div className="user-name">
              <p>Tài khoản(nhập email)</p>
              <input placeholder="nhập tài khoản" onChange={(e:any)=>this.setAccount(e)}/>
            </div>
            <div className="password">
              <p>Mật khẩu</p>
              <input type="password" placeholder="nhập mật khẩu" onChange={(e:any)=>this.setPasswordValue(e)}/>
            </div>
            <div className="forgot-password">
              <p onClick={()=>store.handleForgotPass=!store.handleForgotPass}>Quên mật khẩu</p>
            </div>
          </div>
        </div>
        <div className="footer d-flex justify-content-center">
          <button onClick={()=>store.handleShowRegister()}>Đăng ký</button>
          <button onClick={()=>this.handleLongin()}>Đăng nhập</button>
        </div>
        {store.handleRegister&& <Register/>}
        {store.handleForgotPass&&<ForgotPassword/>}
      </div>
    );
  }
}

export default observer(Index);