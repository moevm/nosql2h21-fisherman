import { makeObservable, observable, computed, action, toJS} from "mobx";
import CatalogStore from "./CatalogStore";

class UserStore {
  user = {"login": null}
  cart = []
  isLoading = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      cart: observable,
      isLoading: observable,
      login: action,
      pushCart: action,
      deleteCart: action,
      plusCountCart: action,
      minusCountCart: action
    });
  }

  login = async (login, password) => {
    this.isLoading = true;
    
    return await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "login": login,
        "password": password,
      })
    }).then( async res => { 
      this.user = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  pushCart = (elem)=>{
    this.cart = [...toJS(this.cart)].filter((o)=>(o.id!==elem.id))
    this.cart.push(elem)
  }
  sumCart = ()=>{
    let sum = 0
    this.cart.forEach(element => {
      sum += element.count * CatalogStore.getProduct(element.id).price
    });
    return sum
  }
  plusCountCart = (id)=>{
    console.log(id)
    this.cart.forEach(element => {
      if(element._id === id){
        element.count += 1
        console.log(element.count)
      }
    });
  }
  minusCountCart = (id)=>{
    this.cart.forEach(element => {
      if(element._id === id && element.count!==0){
        element.count -= 1
        console.log(element.count)
      }
    });
  }
  deleteCart = (id)=>{
    this.cart = [...toJS(this.cart)].filter((o)=>(o.id!==id))
  }
  
  exit = () =>{
    this.user = {"login": null}
  }

}
export default new UserStore();

