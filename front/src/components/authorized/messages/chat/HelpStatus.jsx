import React, { useContext, useState } from "react";
import { addMessageAct } from "../../../../http/chatAPI";
import { Context } from "../../../..";
import socket from "../../../../http/socket";
import { useNavigate } from "react-router-dom";

function HelpStatus(props){
    const {user} = useContext(Context)
    const [message, setMessage] = useState('');
    const history = useNavigate()

    async function finDialog(stat){
        try{
            props.setDialogCount(props.dialogsCount - 1)
            let mesExit = ''
            let fin = 1
            if(stat == 3){
                mesExit = '##### Чат завершён!'
                fin = 3
            }else if(stat == 0){
                mesExit = '##### ' + user.user['login'] + ' завершил чат удовлетворённый поддержкой!'
            }else{
                fin = 2
                if(message == ''){
                    mesExit = '##### ' + user.user['login'] + ' завершил чат не удовлетворённый поддержкой!'
                }else{
                    mesExit = '##### ' + user.user['login'] + ' завершил чат не удовлетворённый поддержкой, оставив следующий комментарий: ' + message
                }
            }
            await addMessageAct(props.id, mesExit, fin).then((result) => {
              const token = localStorage.getItem('token')
              socket.emit('newMessage',{
                token: token,
                messageId: result.messageid,
                dialogId: result.dialogid,
                finFlag: fin
              })
              history('/chat')
            })
        }catch(e){
          let massageErr = e.response.data.message
          props.setError(massageErr)
          console.log(e)
        }
    }

    function exit(){
        if(props.type == 'user'){
            return <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic text-black">Мы смогли вам помочь? <small className="text-info">(данное действие закончит чат)</small></h4>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="d-grid gap-2">
                      <button type="button" onClick={() => {finDialog(0)}}className="btn btn-success">Да, спасибо!</button>
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
                                                <textarea className="form-control" id="finalMessage" rows="3" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                                            <button type="button" data-bs-dismiss="modal" onClick={() => {finDialog(1)}} className="btn btn-danger">Закрыть чат</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }else if(props.type == 'fin'){
            return <div className="p-4 mb-3 bg-light rounded">
                <div className="d-grid gap-2">
                    <button type="button" onClick={() => {finDialog(3)}}className="btn btn-success">Понятно, завершить чат!</button>
                </div>
        </div>
        }
    }

    return(
        exit()
    );
}

export default HelpStatus;