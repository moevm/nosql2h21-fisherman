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
      editStatus: action
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

  add = async (obj) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/orders/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(obj)
    }).then( async res => { 
      this.isLoading = false;
      // вернуть номер
      return await res.json();
    }).catch((e) => console.log(e.message));
  };

  editStatus = async (SelectedStatus, SelectedIdEditOrderStatus) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/orders/editStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "newStatus": SelectedStatus,
        "id": SelectedIdEditOrderStatus
      })
    }).then( async res => { 
      this.isLoading = false;
      // вернуть номер
      return await res.json();
    }).catch((e) => console.log(e.message));
  };

  delete = async (id) => {
   

  };

 // OrdersStore.editStatus(SelectedStatus, SelectedIdEditOrderStatus)

}
export default new OrdersStore();

