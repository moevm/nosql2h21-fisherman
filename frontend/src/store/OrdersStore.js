import { makeObservable, observable, computed, action, toJS} from "mobx";

class OrdersStore {
  array = [];
  isLoading = false;
  
  constructor() {
    makeObservable(this, {
      array: observable,
      isLoading: observable,
      get: action,
      add: action,
      delete: action,
      color: action,
    });
  }


  color(str){
    if(str === "Завершен"){
      return "btn-success"
    }else if(str === "Обработан"){
      return "btn-primary"
    }else if(str === "Принят покупателем"){
      return "btn-info"
    }else if(str === "Готов к выдаче"){
      return "btn-warning"
    }else if(str === "Отменен"){
      return "btn-danger"
    }
    else{
      return "btn-secondary"
    }
  }

  get = async () => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/orders').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  add = async () => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/orders').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  delete = async (id) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/orders').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

 // OrdersStore.editStatus(SelectedStatus, SelectedIdEditOrderStatus)

}
export default new OrdersStore();
