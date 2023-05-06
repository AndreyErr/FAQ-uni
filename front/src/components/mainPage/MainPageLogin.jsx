import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { loginServ, regServ } from "../../http/userAPI";
import '../../styles/mainPage.css';
import Loader from "../ui/Loader";
import MessageText from "../ui/MessageText";

const MainPageLogin = observer( () => {

  const {user} = useContext(Context)
  const [login, setLogin] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [pass, setPass] = useState('')
  const [passErr, setPassErr] = useState('')
  const [error, setError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  async function loginAction(event){
    event.preventDefault();
    try{
      setError('')
      setLoginErr('')
      setPassErr('')
      let notToEnter = false
      if(login.length === 0 || pass.length === 0){
        setError('Заполните все поля для входа')
        notToEnter = true
      }else{
        const reLogin = /^[a-z0-9]+$/i;
        const rePass = /^[a-zA-Z0-9!@#$%^&*?]+$/i;
        if(!String(login).toLocaleLowerCase().match(reLogin) || login.length > 100 || login.length < 3){
          setLoginErr('Некорректно введён Login. Только цифры, английские буквы. Не менее 3 и не более 100 символов')
          notToEnter = true
        }
        if(!String(pass).toLocaleLowerCase().match(rePass) || pass.length > 100 || pass.length < 5){
          setPassErr('Некорректно введён пароль. Разрешены буквы, цифры, символы. Не менее 5 и не более 100 символов')
          notToEnter = true
        }
        if(!notToEnter){
          setIsLoginLoading(true)
          event.preventDefault();
          const data = await loginServ(login, pass)
          user.setUser(data.data)
          user.setIsAuth(true)
          window.location.href = '/';
        }
      }
      setIsLoginLoading(false)
    }catch(e){
      let massageErr = e.response.data.message
      if(0 in e.response.data.errors){
        massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      }
      setError(massageErr)

      setIsLoginLoading(false)
    }
  }

  async function registerAction(event){
    event.preventDefault();
    try{
      setError('')
      setEmailErr('')
      setLoginErr('')
      setPassErr('')
      let notToEnter = false
      const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const reLogin = /^[a-z0-9]+$/i;
      const rePass = /^[a-zA-Z0-9!@#$%^&*]+$/i;
      if(login.length === 0 || email.length === 0 || pass.length === 0){
        setError('Заполните все поля для регистрации')
        notToEnter = true
      }else{
        if(!String(email).toLocaleLowerCase().match(reEmail) || email.length > 120 || email.length < 3){
          setEmailErr('Некорректно введён Email.')
          notToEnter = true
        }
        if(!String(login).toLocaleLowerCase().match(reLogin) || login.length > 100 || login.length < 3){
          setLoginErr('Некорректно введён Login. Только цифры, английские буквы. Не менее 3 и не более 100 символов')
          notToEnter = true
        }
        if(!String(pass).toLocaleLowerCase().match(rePass) || pass.length > 100 || pass.length < 5){
          setPassErr('Некорректно введён пароль. Разрешены буквы, цифры, символы. Не менее 5 и не более 100 символов')
          notToEnter = true
        }
        if(!notToEnter){
        setIsLoginLoading(true)
        const data = await regServ(login, email, pass)
        user.setUser(data)
        user.setIsAuth(true)
        window.location.href = '/me';
        }
      }
      setIsLoginLoading(false)
    }catch(e){
      let massageErr = e.response.data.message
      if(0 in e.response.data.errors){
        massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      }
      setError(massageErr)
      setIsLoginLoading(false)
    }
  }

  localStorage.removeItem('token')

  return(
      <div>
          <div className="jumbotron jumbotron-billboard">
              <div className="img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                          <h2>Войти / Зарегистрироваться</h2>
                          <p>Для помощи в чате предлагаем вам войти в аккаунт или зарегистрироваться</p>
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Войти / Зарегистрироваться</button>
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
                                      <input value={login} onChange={e => setLogin(e.target.value)} type="text" placeholder="Логин" className="form-control" id="loginLogin" aria-describedby="loginLogin" required></input>
                                      {loginErr.length > 0 ? <div className="text-danger">{loginErr}!</div> : null}
                                    </div>
                                    <div className="mb-3">
                                      <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Пароль" className="form-control" id="passLogin"></input>
                                      {passErr.length > 0 ? <div className="text-danger">{passErr}!</div> : null}
                                    </div>
                                    {isLoginLoading
                                    ? <Loader />
                                    : <button onClick={loginAction} type="submit" className="btn btn-primary btn-lg">Войти</button>
                                    }
                                    {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : null}
                                  </form>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                                  <form>
                                  <div className="mb-3">
                                      <label htmlFor="emailReg" className="form-label">Email</label>
                                      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="aaa@aaa.aaa" className="form-control" id="emailReg" aria-describedby="emailReg" required></input>
                                      {emailErr.length > 0 ? <div className="text-danger">{emailErr}!</div> : null}
                                    </div>
                                    <div className="mb-3">
                                      <label htmlFor="loginReg" className="form-label">Логин</label>
                                      <input value={login} onChange={e => setLogin(e.target.value)} type="text" placeholder="iamlordofnowhere" className="form-control" id="loginReg" aria-describedby="loginReg" required></input>
                                      <div id="loginHelp" className="form-text">По нему будет производится вход. Только цифры, английские буквы. Не менее 3 и не более 100 символов.</div>
                                      {loginErr.length > 0 ? <div className="text-danger">{loginErr}!</div> : null}
                                    </div>
                                    <div className="mb-3">
                                      <label htmlFor="passReg" className="form-label">Пароль</label>
                                      <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="qwerty12345#" className="form-control" id="passReg" required></input>
                                      <div id="loginHelp" className="form-text">Придумайте достаточно сложный пароль для вашей же безопасности. Разрешены буквы, цифры, символы. Не менее 5 и не более 100 символов.</div>
                                      {passErr.length > 0 ? <div className="text-danger">{passErr}!</div> : null}
                                    </div>
                                    {isLoginLoading
                                    ? <Loader />
                                    : <button onClick={registerAction} type="submit" className="btn btn-primary btn-lg">Регистрация</button>
                                    }
                                    {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : null}
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