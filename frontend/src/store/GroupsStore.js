import { makeObservable, observable, computed, action} from "mobx";

class Groups {
  array = [{id: 1,name: "Аксессуары"}, {id:2,name: "Запчасти"}];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      array: observable,
      isLoading: observable,
      get: action,
    });
  }

  get = () => {
    console.log("getGroups");
    this.isLoading = true;
    fetch("http://localhost:8080/groups")
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
export default new Groups();


