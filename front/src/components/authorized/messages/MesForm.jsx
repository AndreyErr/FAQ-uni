import React, { useContext, useState } from "react";
import MesLoockLike from "./chat/MesLoockLike";
import { addDialogByClientAct, addMessageAct } from "../../../http/chatAPI";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import socket from "../../../http/socket";
import MessageText from "../../ui/MessageText";

function MesForm(props){

  const [message, setMessage] = useState('')
  const {user} = useContext(Context)
  const history = useNavigate()
  
  function addNewMessageAct(){
    if(props.type == 'chat' || props.type == 'chatall'){
      if(props.id === 'new' && user.user['status'] < 3){
        addDialogByClient(user.user['id'])
      }else{
        addMessage()
      }
    }
  }

  async function addMessage(){
    try{
      await addMessageAct(props.id, message).then((result) => {
        props.create(result)
        const token = localStorage.getItem('token')
        socket.emit('newMessage',{
          token: token,
          messageId: result.messageid,
          dialogId: result.dialogid,
          finFlag: 0  
        })
        setMessage('')
      })
    }catch(e){
      let massageErr = e.response.data.message
      props.setError(massageErr)
      console.log(e)
    }
  }

  async function addDialogByClient(id){
    try{
      await addDialogByClientAct(id, message).then((result) => {
        props.setDialogCount(props.dialogsCount + 1)
        props.setDialog([result, ...props.dialogs])
        props.setDialogNull(false)
        setMessage('')
        socket.emit('newChatFor',{
          idUser: result.ansuser,   
          idChat: result.dialogid      
        })
        history('/chat/' + result.dialogid)
      })
    }catch(e){
      let massageErr = e.response.data.message
      props.setError(massageErr)
      console.log(e)
    }
  }

  return(
    <div className="p-4 mb-3 bg-light rounded">
      {props.error.length > 0
      ? <MessageText text={props.error} typeOf={'danger'} /> 
      : ''}
      <h4 className="fst-italic text-black">Сообщение</h4>
          <div className="mb-3">
              <textarea className="form-control" id="message" value={message} onChange={e => setMessage(e.target.value)} rows="3"></textarea>
              <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div>
          </div>
          <button type="submit" onClick={() => {addNewMessageAct()}} className="btn btn-primary">Отправить</button>
          {message.length > 0 ? <MesLoockLike text={message}/> : ''}
    </div>
  );
}

export default MesForm;