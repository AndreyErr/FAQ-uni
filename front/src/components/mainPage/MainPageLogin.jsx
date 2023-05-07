import { observer } from "mobx-react-lite";
import React from "react";
import '../../styles/mainPage.css';
import LoginModal from "./LoginModal";

const MainPageLogin = () => {

  return(
      <div>
          <div className="jumbotron jumbotron-billboard">
              <div className="img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                          <h2>Войти / Зарегистрироваться</h2>
                          <p>Для помощи в чате предлагаем вам войти в аккаунт или зарегистрироваться</p>
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Войти / Зарегистрироваться</button>
                      </div>
                   </div>
              </div>
          </div>
          <LoginModal id={2} />
      </div>
  );
}

export default MainPageLogin;