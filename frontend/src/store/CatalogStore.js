import { makeObservable, observable, computed, action} from "mobx";

class Catalog {
  array = [
    {
      id: 1,
      name: "Удочка1", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 2,
      name: "Удочка2", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 3,
      name: "Удочка3", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 4,
      name: "Удочка4", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 4,
      name: "Удочка5", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 5,
      name: "Удочка6", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
    {
      id: 6,
      name: "Удочка7", 
      img: "https://farwater-vl.ru/images/cms/data/rybalka/ydochka/3827282.jpg", 
      cost: 300
    },
  ];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      array: observable,
      isLoading: observable,
      get: action,
    });
  }

  get = () => {
    console.log("getCatalog");
    this.isLoading = true;
    fetch("http://localhost:8080/catalog")
        .then(res => res.json())
            .then(json => {
                    if (json) {
                        console.log("ok")
                        this.array = json.data;
                        this.isLoading = false;
                    }
                })
        .catch((e) => console.log(e.message));
    
  };

}
export default new Catalog();
