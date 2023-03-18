import React from "react";
import '../../styles/mainPage.css';

function MainPageLogin(){
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
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageLogin;