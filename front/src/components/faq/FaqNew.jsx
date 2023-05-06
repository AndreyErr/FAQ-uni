import React, { useContext, useState } from "react";
import MesLoockLike from "../authorized/messages/chat/MesLoockLike";
import Loader from "../ui/Loader";
import { addFaqAct } from "../../http/faqAPI";
import MessageText from "../ui/MessageText";
import { Context } from "../..";

function FaqNew(props){
  const {user} = useContext(Context)
  const [faqMessage, setFaqMessage] = useState({text: ''})
  const [typeTitleValue, setTypeTitleValue] = useState(1)
  const [faqQ, setFaqQ] = useState('')
  const [faqA, setFaqA] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [askErr, setAskErr] = useState('')
  const [ansErr, setAnsErr] = useState('')

  async function addFaq(event){
    event.preventDefault();
    try{
      setAskErr('')
      setAnsErr('')
      let notToEnter = false
      if(faqQ.length === 0 || faqA.length === 0){
        setError('Заполните все поля для добавления FAQ')
        notToEnter = true
      }else{
        const reAsk = /^[a-zA-Z0-9\u0400-\u04FF\s!@#$%^&*?]+$/i;
        if(!String(faqQ).toLocaleLowerCase().match(reAsk) || faqQ.length > 300 || faqQ.length < 5){
          setAskErr('Некорректно введено название. Разрешены буквы, цифры, символы. Не менее 5 и не более 300 символов')
          notToEnter = true
        }
        if(!faqA.length > 300 || faqA.length < 5){
          setAnsErr('Некорректно введён ответ. Не менее 3 и не более 500 символов')
          notToEnter = true
        }
        if(!notToEnter){
          setIsLoading(true)
          await addFaqAct(typeTitleValue, faqQ, faqA).then((result) => {
            setError('OK')
          })
          setIsLoading(false)
          setFaqQ('')
          setFaqA('')
        }
      }
    }catch(e){
      setError(e.response.data.message)
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
                      : null
                      }
                      <select value={typeTitleValue} onChange={e => setTypeTitleValue(e.target.value)} id="typeTitleValue" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                      {props.titleT.map(types => 
                        <option key={types.faqtypeid} value={types.faqtypeid}>{types.title}</option>
                      )}
                      </select>
                      <div className="modal-title fs-5" id="staticBackdropLabel">Вопрос пользователя:</div>
                      <div className="mb-3">
                        <textarea value={faqQ} onChange={e => setFaqQ(e.target.value)} className="form-control" id="faqQ" rows="3"></textarea>
                        {askErr.length > 0 ? <div className="text-danger">{askErr}!</div> : null}
                      </div>
                      <div className="modal-title fs-5" id="staticBackdropLabel">Ответ:</div>
                      <div className="mb-3">
                          <textarea value={faqA} className="form-control" id="faqA" onChange={e => {setFaqMessage({...faqMessage, text: e.target.value}); setFaqA(e.target.value)}} rows="3"></textarea>
                          <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div>
                          {ansErr.length > 0 ? <div className="text-danger">{ansErr}!</div> : null}
                      </div>
                      {isLoading === true
                        ? <Loader />
                        : null}
                      {error.length > 0 
                        ? error === 'OK' 
                          ? <MessageText text={'Создано'} typeOf={'success'} /> 
                          : <MessageText text={error} typeOf={'danger'} /> 
                        : null}
                      <hr></hr>
                      {faqMessage.text.length > 0 ? <MesLoockLike text={faqMessage.text}/> : null}
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