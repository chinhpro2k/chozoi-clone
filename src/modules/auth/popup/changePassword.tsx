import React, {Component} from 'react';
import {observer} from "mobx-react";
import './styleChangePass.scss'
import {action, makeObservable, observable} from "mobx";
import {store} from "../store";
import {notify} from "../../../common/notify/NotifyService";
class ChangePassword extends Component {
  constructor(props:any) {
    super(props);
    makeObservable(this,{
      passwordValue:observable,
      newPassword:observable,
      reNewPassword:observable,
      eye1:observable,
      eye3:observable,
      eye2:observable,
      changeEye:action

    })
  }
  passwordValue:string=''
  newPassword:string=''
  reNewPassword:string=''
  setPasswordValue(e:any){
    this.passwordValue=e.target.value
  }
  setNewPassword(e:any){
    this.newPassword=e.target.value
  }
  setReNewPassword(e:any){
    this.reNewPassword=e.target.value
  }
  async handleChangePassword(){
    if (store.user){
      if (store.user.password===this.passwordValue){
        if (this.newPassword===this.reNewPassword){
          await store.changePassword(store.user.id,this.newPassword);
        }else {
          notify.show('Mật khẩu nhập lại bị sai!',"warning",3)
        }
      }else {
        notify.show('Sai mật khẩu cũ!',"warning",3)
      }
    }
  }
  eye1:boolean=false
  eye2:boolean=false
  eye3:boolean=false
  changeEye(option:number){
    if (option===1){
      this.eye1=!this.eye1;
    }else {
      if (option===2){
        this.eye2=!this.eye2
      }else {
        this.eye3=!this.eye3
      }
    }
  }
  returnEye(eyeType:boolean,option:number){
    if (eyeType){
      return (<i className="fas fa-eye" onClick={()=>this.changeEye(option)}/>)
    } else return (<i className="fas fa-eye-slash" onClick={()=>this.changeEye(option)}/>)
  }
  returnEye2(eyeType:boolean,option:number){
    if (eyeType){
      return (<i className="fas fa-eye" onClick={()=>this.changeEye(option)}/>)
    } else return (<i className="fas fa-eye-slash" onClick={()=>this.changeEye(option)}/>)
  }
  returnEye3(eyeType:boolean,option:number){
    if (eyeType){
      return (<i className="fas fa-eye" onClick={()=>this.changeEye(option)}/>)
    } else return (<i className="fas fa-eye-slash" onClick={()=>this.changeEye(option)}/>)
  }
  render() {
    return (
      <div className="change-pass">
        <div className="form-change">
          <h2 className="text-center">ĐỔi mật khẩu</h2>
          <div className="old-pass position-relative">
            <p>Mật khẩu cũ</p>
            <input type={this.eye1?"text":"password"} placeholder="nhập tài khoản" onChange={(e:any)=>this.setPasswordValue(e)}/>
            <div className="position-absolute" style={{top:"15px",right:"40px"}}>
              {this.returnEye(this.eye1,1)}
            </div>
          </div>
          <div className="password position-relative">
            <p>Mật khẩu mới</p>
            <input type={this.eye2?"text":"password"} placeholder="nhập mật khẩu" onChange={(e:any)=>this.setNewPassword(e)}/>
            <div className="position-absolute" style={{top:"15px",right:"40px"}}>
              {this.returnEye2(this.eye2,2)}
            </div>
          </div>
          <div className="re-password position-relative">
            <p>Nhập lại mật khẩu mới</p>
            <input type={this.eye3?"text":"password"} placeholder="nhập mật khẩu" onChange={(e:any)=>this.setReNewPassword(e)}/>
            <div className="position-absolute" style={{top:"15px",right:"40px"}}>
              {this.returnEye3(this.eye3,3)}
            </div>
          </div>
        </div>
        <div className="btn-change d-flex justify-content-center">
          <button onClick={()=>store.handleShowChangePass()}>Trở về</button>
          <button onClick={()=>this.handleChangePassword()}>Xác nhận</button>
        </div>
      </div>
    );
  }
}

export default observer(ChangePassword);