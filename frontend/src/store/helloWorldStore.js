import { makeObservable, observable, computed, action} from "mobx";

class HelloWorld {
  data = "";
  isLoading = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,
      get: action,
    });
  }

  get = () => {
    console.log("getHelloWorld");
    this.isLoading = true;
    fetch("http://localhost:8080/test")
        .then(res => res.json())
            .then(json => {
                    if (json) {
                        console.log("ok")
                        this.data = "DONE";
                        this.isLoading = false;
                    }
                })
        .catch((e) => console.log(e.message));
    
  };

}
export default new HelloWorld();
