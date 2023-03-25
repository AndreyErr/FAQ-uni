import React, { useState } from "react";
import MesLoockLike from "../authorized/messages/chat/MesLoockLike";

function FaqNew(){

    const [faqMessage, setFaqMessage] = useState({text: ''})

    return(
        <div className="pt-3 pb-3">
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newFaq">
                  Создать новый FAQ
                </button>
            </div>

            <div className="modal fade modal-lg" id="newFaq" tabIndex="-1" aria-labelledby="newFaqL" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header text-dark">
                    <h1 className="modal-title fs-5" id="newFaqL">Создать новый FAQ</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form>
                    <div className="modal-body text-dark">
                        <div className="modal-title fs-5" id="staticBackdropLabel">Тип:</div>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <div className="modal-title fs-5" id="staticBackdropLabel">Вопрос пользователя:</div>
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="modal-title fs-5" id="staticBackdropLabel">Ответ:</div>
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" onChange={e => setFaqMessage({...faqMessage, text: e.target.value})} rows="3"></textarea>
                            <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div>
                        </div>
                        <hr></hr>
                        {faqMessage.text.length > 0 ? <MesLoockLike text={faqMessage.text}/> : ''}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                      <button type="button" className="btn btn-success">Создать</button>
                      <button type="button" className="btn btn-success">Отправить на проверку</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
}

export default FaqNew;