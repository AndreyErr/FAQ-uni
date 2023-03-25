import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../..";
import { loginServ, regServ } from "../../http/userAPI";
import '../../styles/mainPage.css';
import Loader from "../ui/Loader";
import MessageText from "../ui/MessageText";

const MainPageLogin = observer( () => {

  const {user} = useContext(Context)
  const history = useNavigate()
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  async function loginAction(event){
    try{
      setIsLoginLoading(true)
      event.preventDefault();
      const data = await loginServ(login, pass)
      user.setUser(user)
      user.setIsAuth(true)
      //setIsLoginLoading(false)
      window.location.href = '/me';
      //history('/me')
    }catch(e){
      console.log(e)
      let massageErr = e.response.data.message
      if(0 in e.response.data.errors){
        massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      }
      setError(massageErr)

      setIsLoginLoading(false)
    }
  }

  async function registerAction(event){
    try{
      setIsLoginLoading(true)
      event.preventDefault();
      const data = await regServ(login, email, pass)
      user.setUser(user)
      user.setIsAuth(true)
      //setIsLoginLoading(false)
      window.location.href = '/me';
      //history('/me')
    }catch(e){
      console.log(e)
      let massageErr = e.response.data.message
      if(0 in e.response.data.errors){
        massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      }
      setError(massageErr)
      setIsLoginLoading(false)
    }
  }

  return(
      <div>
          <div className="jumbotron jumbotron-billboard">
              <div className="img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                          <h2>Войти</h2>
                          <p>Для более удобной помощи, предлагаем вам войти в аккаунт</p>
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Войти</button>
                      </div>
                   </div>
              </div>
          </div>
          <div className="container">
              <div className="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                          <div className="modal-header text-dark">
                              <h1 className="modal-title fs-3" id="staticBackdropLabel">Войти</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <nav>
                                <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Авторизация</button>
                                  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Регистрация</button>
                                </div>
                              </nav>
                              <div className="tab-content text-dark p-5" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                  <form>
                                    <div className="mb-3">
                                      <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                                      <input value={login} onChange={e => setLogin(e.target.value)} type="text" className="form-control" id="login" aria-describedby="emailHelp"></input>
                                    </div>
                                    <div className="mb-3">
                                      <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                                      <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="form-control" id="pass"></input>
                                    </div>
                                    {isLoginLoading
                                    ? <Loader />
                                    : <button onClick={loginAction} type="submit" className="btn btn-primary btn-lg">Войти</button>
                                    }
                                    {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : ''}
                                  </form>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                                  <form>
                                  <div className="mb-3">
                                      <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                      <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                    </div>
                                    <div className="mb-3">
                                      <label htmlFor="exampleInputEmail1" className="form-label">Логин</label>
                                      <input value={login} onChange={e => setLogin(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                      <div id="emailHelp" className="form-text">По нему будет производится вход.</div>
                                    </div>
                                    <div className="mb-3">
                                      <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                                      <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"></input>
                                    </div>
                                    {isLoginLoading
                                    ? <Loader />
                                    : <button onClick={registerAction} type="submit" className="btn btn-primary btn-lg">Регистрация</button>
                                    }
                                    {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : ''}
                                  </form>
                                </div>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
})

export default MainPageLogin;