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

  getProduct = (id) =>{
    console.log(id)
    let res = {
      image: '',
      count: 0,
      title: '',
      price: 0
    }
    for (const element of  toJS(this.array)) {
      if(element._id === id){
        res = element
      }
    }
    console.log(res)
    return res
  }

  get = async () => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products').then( async res => { 
      this.array = await res.json();
      this.isLoading = false;
    }).catch((e) => console.log(e.message));

  };

  add = async (imageAdd, vendorCodeAdd, titleAdd, descriptionAdd, priceAdd, countAdd) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "image": imageAdd,
        "vendorCode": vendorCodeAdd,
        "title": titleAdd,
        "description": descriptionAdd,
        "price": priceAdd,
        "count": countAdd,
      })
    }).then( async res => { 
      this.isLoading = false;
      return await res.json();
    }).catch((e) => console.log(e.message));

  };

  delete = async (id) => {
    this.isLoading = true;
    return await fetch('http://localhost:8080/products/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "id": id,
      })
    }).then( async res => { 
      this.isLoading = false;
      return await res.json();
    }).catch((e) => console.log(e.message));

  };

}
export default new Catalog();

