import { makeObservable, observable, computed, action, toJS} from "mobx";

class UserStore {
  user = {"login": null}
  isLoading = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      login: action,
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

  exit = () =>{
    this.user = {"login": null}
  }
  
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

}
export default new UserStore();
