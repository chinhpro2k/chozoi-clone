import React, {Component} from 'react';
import {observer} from "mobx-react";
import './styleForgot.scss'
import {action, makeObservable, observable} from "mobx";
import {store} from "../store";
import {postRequest, putRequest} from "../../../api";
import {notify} from "../../../common/notify/NotifyService";
class ForgotPassword extends Component {
  constructor(props:any) {
    super(props);
    makeObservable(this,{
      typeForgot:observable,
      email:observable,
      otp:observable,
      newPassword:observable,
      reNewPassword:observable,
      error:observable,
      userId:observable,
      handleRenderForm:action,
      setEmail:action,
      setOtp:action,
      handleChangeType:action
    })
  }
  email:string=''
  setEmail(e:any){
    this.email=e.target.value
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)){
      this.error=false;
    }else {
      this.error=true;
    }
  }
  otp:string=''
  setOtp(e:any){
    this.otp=e.target.value
    console.log(this.otp)
  }
  newPassword:string=''
  setNewPass(e:any){
    this.newPassword=e.target.value
  }
  reNewPassword:string=''
  setReNewPass(e:any){
    this.reNewPassword=e.target.value
  }
  typeForgot:'EMAIL'|'OTP'|'CHANGE'='EMAIL'
  error:boolean=false
  handleRenderForm(type:string){
    if (type==='EMAIL'){
      return(
      <div className="d-flex align-items-center justify-content-center">
        <div>
          <p>Nhập email của bạn</p>
          <input placeholder="nhập email" onChange={(e:any)=>this.setEmail(e)} />
          {this.error?<p className="error">Vui lòng nhập đúng định dạng email</p>:<p className="success">Email hợp lệ</p>}
        </div>
        <div className="btn-next">
          <i className="fas fa-arrow-circle-right" onClick={()=>this.handleChangeType('OTP')}/>
        </div>
      </div>
      )
    }else {
      if (type==='OTP'){
       return (
         <div className="d-flex align-items-center justify-content-center">
           <div>
             <p>Nhập OPT</p>
             <input placeholder="nhập otp" onChange={(e:any)=>this.setOtp(e)}/>
             <button>Get code</button>
           </div>
           <div className="btn-next">
             <i className="fas fa-arrow-circle-right" onClick={()=>this.handleChangeType('CHANGE')}/>
           </div>
         </div>
       )
      }else {
        return (
          <div className="form-new-password">
            <div>
              <p>Nhập mật khẩu mới</p>
              <input placeholder="nhập mật khẩu mới"/>
            </div>
            <div>
              <p>Nhập lại mật khẩu mới</p>
              <input placeholder="nhập lại mật khẩu mới"/>
            </div>
          </div>
        )
      }
    }
  }
  userId:string='';
  async handleChangeType(type:'EMAIL'|'OTP'|'CHANGE'){
    if (type==='OTP'){
      if (this.email!==''){
        const response=await postRequest(`/members/forgot`,{
          email:this.email
        })
        if (response.status===200){
          this.typeForgot=type;
          this.email='';
          this.userId=response.body.idUser;
        }else {
          this.typeForgot='EMAIL'
          notify.show('email không tồn tại','warning',3)
        }
      }else {
        notify.show('Vui lòng nhập email','warning',3)
      }

    }else {
      if (type==="CHANGE"){
        if (this.otp!==''){
          if (this.otp==="123456"){
            this.typeForgot=type
          }else {
            notify.show('sai otp','warning',3)
          }
        }else {
          notify.show('Vui lòng nhập otp','warning',3)
        }
      }else {


      }
    }

  }
  handleCancel(){
    store.handleForgotPass=!store.handleForgotPass
    this.typeForgot='EMAIL'
  }
 async handleChangePassword(){
    if (this.newPassword===''){
      return false
    }
    if (this.reNewPassword===''){
      return false
    }
    if (this.newPassword===this.reNewPassword){
      const response=await putRequest(`/members/change/${this.userId}`,{
        password:this.newPassword
      })
      if (response.status<400){
        notify.show('Lấy lại mật khẩu thành công','success',3)
        this.handleCancel();
      }else {
        notify.show(response.body.message,'warning',3)
      }
    }
  }
  render() {
    return (
      <div id={"forgot-password"}>
        <div className="forgot-password-form text-center">
          <div className="title">
            <h2>Quên mật khẩu</h2>
          </div>
         <div className="middle">
           {/*{this.handleRenderForm(this.typeForgot)}*/}
           {this.typeForgot==="EMAIL"&&
           <div className="d-flex align-items-center justify-content-center">
               <div>
                   <p>Nhập email của bạn</p>
                   <input placeholder="nhập email" onChange={(e:any)=>this.setEmail(e)} />
                 {(this.error||this.email==='')?<p className="error">Vui lòng nhập đúng định dạng email</p>:<p className="success">Email hợp lệ</p>}
               </div>
               <div className="btn-next">
                   <i className="fas fa-arrow-circle-right" onClick={()=>this.handleChangeType('OTP')}/>
               </div>
           </div>}
           {this.typeForgot==='OTP'&&
           <div className="d-flex align-items-center justify-content-center">
               <div>
                   <p>Nhập OPT</p>
                   <input placeholder="nhập otp" onChange={(e:any)=>this.setOtp(e)}/>
                   <div className="d-flex justify-content-center">
                       <a className="get-code" href="https://mail.google.com/mail/u/0/?tab=om#inbox" target="_blank">Get code</a>
                   </div>
               </div>
               <div className="btn-next">
                   <i className="fas fa-arrow-circle-right" onClick={()=>this.handleChangeType('CHANGE')}/>
               </div>
           </div>}
           {this.typeForgot==="CHANGE"&&
           <div className="form-new-password">
               <div>
                   <p>Nhập mật khẩu mới</p>
                   <input placeholder="nhập mật khẩu mới" onChange={(e:any)=>this.setNewPass(e)}/>
               </div>
               <div>
                   <p>Nhập lại mật khẩu mới</p>
                   <input placeholder="nhập lại mật khẩu mới" onChange={(e:any)=>this.setReNewPass(e)}/>
               </div>
           </div>}
         </div>
          <div className="footer-forgot d-flex justify-content-end">
            <button onClick={()=>this.handleCancel()}>Cancel</button>
            {this.typeForgot==='CHANGE'&&<button onClick={()=>this.handleChangePassword()}>Xác nhận</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default observer(ForgotPassword);