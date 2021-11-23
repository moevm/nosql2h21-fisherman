import { makeObservable, observable, computed, action, toJS} from "mobx";

class Catalog {
  array = [];
  isLoading = false;
  local = [];

  

  onChange=(e) => {
    this.local = [...(this.local.filter((o) => o.id !== e.target.id))]
    this.local.push(
        {
            id: e.target.id,
            name: e.target.value
        })
  }

  get total() {
    let arr = [];
    toJS(this.array).forEach(element => {
      if(toJS(this.local).find((e)=>e.id === element.id)){
        arr.push({
          id: element.id,
          name: toJS(this.local).find((e)=>e.id === element.id).name
        })
      }else{
        arr.push({
          id: element.id,
          name: element.name
        })
      }
    });
    return arr;
  }

  
  constructor() {
    makeObservable(this, {
      array: observable,
      local: observable,
      total: computed,
      isLoading: observable,
      get: action,
      add: action,
      delete: action,
      onChange: action,
    });
  }

  get = async () => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  add = async () => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  delete = async (id) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

}
export default new Catalog();
