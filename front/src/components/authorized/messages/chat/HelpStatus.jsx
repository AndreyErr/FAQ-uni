import React from "react";

function HelpStatus(){
    return(
        <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic text-black">Мы смогли вам помочь? <small className="text-info">(данное действие закончит чат)</small></h4>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="d-grid gap-2">
                      <button type="button" className="btn btn-success">Да, спасибо!</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Нет, не смогли!</button>
                        <div className="modal fade modal-lg" id="staticBackdrop" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header text-dark">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Пожалуйста, напишите причину</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form>
                                        <div className="modal-body text-dark">
                                            <div className="modal-title fs-5" id="staticBackdropLabel">Пожалуйста, напишите что именно вам не понравилось в диалоге с агентом поддержки. Это поможет нам стать лучше.</div>
                                            <small className="text-info">Это не обязательное действие.</small>
                                            <div className="mb-3">
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                {/* <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div> */}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                                            <button type="button" className="btn btn-danger">Закрыть чат</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpStatus;