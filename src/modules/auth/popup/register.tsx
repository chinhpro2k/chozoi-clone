import React, {Component} from 'react';
import './styleRegister.scss'
import {store} from "../store";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {IResRegister} from "../../../api/request/request";
import {notify} from "../../../common/notify/NotifyService";

class Register extends Component {
  constructor(props:any) {
    super(props);
    makeObservable(this,{
      firstName:observable,
      lastName:observable,
      account:observable,
      passwordValue:observable,
      rePassword:observable,
      handleRegister:action,
      setFirstName:action,
      setLastName:action,
      setAccount:action,
      setPasswordValue:action,
      setRePassword:action

    })
  }
  firstName:string=''
  setFirstName(e:any){
    this.firstName=e.target.value
  }
  lastName:string=''
  setLastName(e:any){
    this.lastName=e.target.value
  }
  account:string=''
  setAccount(e:any){
    this.account=e.target.value
  }
  passwordValue:string=''
  setPasswordValue(e:any){
    this.passwordValue=e.target.value
  }
  rePassword:string=''
  setRePassword(e:any){
    this.rePassword=e.target.value
  }
  handleRegister(){
    if (this.firstName===''){
      notify.show("Nhập họ","warning",5)
      return false
    }
    if (this.lastName===''){
      notify.show("Nhập tên","warning",5)
      return false
    }
    if (this.account===''){
      notify.show("Nhập tài khoản","warning",5)
      return false
    }
    if (this.passwordValue===''){
      notify.show("Nhập mật khẩu","warning",5)
      return false
    }
    if (this.rePassword===''){
      notify.show("Nhập lại mật khẩu","warning",5)
      return false
    }
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.account)){
        if (this.passwordValue===this.rePassword){
        const data:IResRegister={
          "firstName": this.firstName,
          "lastName": this.lastName,
          "email": this.account,
          "password": this.passwordValue
        }
        store.registerMember(data).then()
      }
        else {
          notify.show("mật khẩu không trùng khớp","error",5)
        }
      }
      else {
        notify.show("nhập lại email","error",5)
    }
  }
  render() {
    return (
      <div className="popup-register">
        <div className="header-register text-center">
          <h2>Đăng ký</h2>
        </div>
        <div className="form-register">
          <div className="name">
            <p>Họ</p>
            <input placeholder="nhập họ tên" onChange={(e:any)=>this.setFirstName(e)}/>
          </div>
          <div className="last-name">
            <p>Tên</p>
            <input placeholder="nhập họ tên" onChange={(e:any)=>this.setLastName(e)}/>
          </div>
          <div className="user-name">
            <p>Tài khoản(Nhập email)</p>
            <input placeholder="nhập tài khoản" onChange={(e:any)=>this.setAccount(e)}/>
          </div>
          <div className="password">
            <p>Mật khẩu</p>
            <input type="password" placeholder="nhập mật khẩu" onChange={(e:any)=>this.setPasswordValue(e)}/>
          </div>
          <div className="return-password">
            <p>Nhập lại mật khẩu</p>
            <input type="password" placeholder="nhập mật khẩu" onChange={(e:any)=>this.setRePassword(e)}/>
          </div>
        </div>
        <div className="footer d-flex justify-content-center">
          <button onClick={()=>store.handleShowRegister()}>Quay lại</button>
          <button onClick={()=>this.handleRegister()}>Đăng ký</button>
        </div>
      </div>
    );
  }
}

export default observer(Register);