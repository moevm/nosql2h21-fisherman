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

}
export default new UserStore();
