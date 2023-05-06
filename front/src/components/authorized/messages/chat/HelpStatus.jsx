import React, { useContext, useState } from "react";
import { addMessageAct, updateDialogStatusAct } from "../../../../http/chatAPI";
import { Context } from "../../../..";
import socket from "../../../../http/socket";
import { useNavigate } from "react-router-dom";

function HelpStatus(props){
    const {user} = useContext(Context)
    const [message, setMessage] = useState('');
    const history = useNavigate()

    async function finDialog(stat){
        try{
            props.setDialogCount(Number(props.dialogsCount) - 1)
            let mesExit = ''
            let fin = 8
            if(stat == 3 || stat == 4){
                let dialogStatus = 0
                let notification = ''
                if(stat == 3){
                    dialogStatus = 1
                    notification = 'NOT_READY_FOR_DIALOG'
                    props.setAbilityToTalk(false)
                }else if(stat == 4){
                    notification = 'READY_FOR_DIALOG'
                    props.setAbilityToTalk(true)
                }
                await updateDialogStatusAct(props.id, dialogStatus).then((result) => {
                    //const token = localStorage.getItem('token')
                    socket.emit('notification',{
                        dialogid: props.id,
                        notification: notification
                    })
                })
            }else{
                if(stat == 2){
                    mesExit = '##### Чат завершён!'
                    fin = 10
                }else if(stat == 0){
                    mesExit = '##### ' + user.user['login'] + ' завершил чат удовлетворённый поддержкой!'
                }else{
                    fin = 9
                    if(message == ''){
                        mesExit = '##### ' + user.user['login'] + ' завершил чат не удовлетворённый поддержкой!'
                    }else{
                        mesExit = '##### ' + user.user['login'] + ' завершил чат не удовлетворённый поддержкой, оставив следующий комментарий: ```' + message + '```'
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
            }
        }catch(e){
          let massageErr = e.response.data.message
          props.setError(massageErr)
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
                    <button type="button" onClick={() => {finDialog(2)}} className="btn btn-success">Понятно, завершить чат!</button>
                </div>
        </div>
        }else if(props.type == 'help'){
            return <div className="p-2 mb-3 bg-light rounded">
                <div className="d-grid gap-2 ps-5 pe-5">
                    <button type="button" onClick={() => {finDialog(3)}} className="btn btn-danger btn-sm">Я не могу вывезти чат, мне нужна помощь!</button>
                </div>
        </div>
        }else if(props.type == 'iCanDoIt'){
            return <div className="p-2 mb-3 bg-light rounded">
                <div className="d-grid gap-2 ps-5 pe-5">
                    <button type="button" onClick={() => {finDialog(4)}} className="btn btn-success btn-sm">Я смогу завершить чат!</button>
                </div>
        </div>
        }
    }

    return(
        exit()
    );
}

export default HelpStatus;