import {action, makeObservable, observable} from "mobx";

 class NotifyStore {
  constructor() {
    makeObservable(this, {
      init: observable,
      show: observable,
      text: observable,
      flag: observable,
      notify: action
    })
  }

  init: boolean = true;


  show: boolean = false;


  text: string = '';


  flag: 'success' | 'warning' | 'error' = "success";


  /*Show notify*/
  public notify = (text: string, flag: 'success' | 'warning' | 'error', time: number = 5) => {
    this.init && (this.init = false);
    this.text = text;
    this.flag = flag;
    this.show = true;
    setTimeout(() => this.show = false, time * 1000);
  }
}

export const store = new NotifyStore();

export const notify = {show: store.notify};