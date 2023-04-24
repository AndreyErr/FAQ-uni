import React, { useContext, useEffect, useState } from "react";
import MesLoockLike from "../authorized/messages/chat/MesLoockLike";
import Loader from "../ui/Loader";
import { addFaqAct } from "../../http/faqAPI";
import MessageText from "../ui/MessageText";
import MessageToastContainer from "../ui/MessageToastContainer";
import { Context } from "../..";

function FaqNew(props){
  const {user} = useContext(Context)
  const [faqMessage, setFaqMessage] = useState({text: ''})
  const [typeTitleValue, setTypeTitleValue] = useState(1)
  const [faqQ, setFaqQ] = useState('')
  const [faqA, setFaqA] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function addFaq(event){
    try{
      setIsLoading(true)
      event.preventDefault();
      await addFaqAct(typeTitleValue, faqA, faqQ).then((result) => {
        setError('OK')
      })
      setIsLoading(false)
      setFaqQ('')
      setFaqA('')
    }catch(e){
      console.log(e)
      let massageErr = e.response.data.message
      massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      setError(massageErr)
      setIsLoading(false)
    }
  }

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
                      {props.isTitleLoad 
                      ? <Loader />
                      : ''
                      }
                      <select value={typeTitleValue} onChange={e => setTypeTitleValue(e.target.value)} id="typeTitleValue" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                      {props.titleT.map(types => 
                        <option key={types.faqtypeid} value={types.faqtypeid}>{types.title}</option>
                      )}
                      </select>
                      <div className="modal-title fs-5" id="staticBackdropLabel">Вопрос пользователя:</div>
                      <div className="mb-3">
                          <textarea value={faqA} onChange={e => setFaqA(e.target.value)} className="form-control" id="faqA" rows="3"></textarea>
                      </div>
                      <div className="modal-title fs-5" id="staticBackdropLabel">Ответ:</div>
                      <div className="mb-3">
                          <textarea value={faqQ} className="form-control" id="faqQ" onChange={e => {setFaqMessage({...faqMessage, text: e.target.value}); setFaqQ(e.target.value)}} rows="3"></textarea>
                          <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div>
                      </div>
                      {isLoading === true
                        ? <Loader />
                        : ''}
                      {error.length > 0 
                        ? error === 'OK' 
                          ? <MessageText text={'Создано'} typeOf={'success'} /> 
                          : <MessageText text={error} typeOf={'danger'} /> 
                        : ''}
                      <hr></hr>
                      {faqMessage.text.length > 0 ? <MesLoockLike text={faqMessage.text}/> : ''}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    {user.user['status'] > 3 
                    ? <button onClick={addFaq} type="button" className="btn btn-success">Создать</button>
                    : <button onClick={addFaq} type="button" className="btn btn-success">Отправить на проверку</button>
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
  );
}

export default FaqNew;