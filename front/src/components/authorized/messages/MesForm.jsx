import React, { useContext, useEffect, useState } from "react";
import MesLoockLike from "./chat/MesLoockLike";
import { addDialogByClientAct, addMessageAct, fileUploadAct } from "../../../http/chatAPI";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import socket from "../../../http/socket";
import MessageText from "../../ui/MessageText";

function MesForm(props){

  const [message, setMessage] = useState('')
  const [fileInput, setFileInput] = useState({file:null, filePreview:null})
  const {user} = useContext(Context)
  const history = useNavigate()
  
  const fileInputV = document.getElementById("formFile");
  window.addEventListener('paste', e => {
    if(fileInput.file !== null){
      if(fileInput.file.name != e.clipboardData.files[0].name){
        fileInputV.files = e.clipboardData.files;
        handleFileInputChange(fileInputV.files)
      }
    }else{
      fileInputV.files = e.clipboardData.files;
      handleFileInputChange(fileInputV.files)
    }
  })

  function addNewMessageAct(){
    if(props.type == 'chat' || props.type == 'chatall'){
      let file = false
      if(fileInput.file !== null){
        file = true
      }
      if(props.id === 'new' && user.user['status'] < 3){
        addDialogByClient(user.user['id'], file)
      }else{
        addMessage(file)
      }
    }
  }

  async function addMessage(file = false){
    try{
      await addMessageAct(props.id, message, 0, file).then((result) => {
        if(file === true){addFiles(result.messageid).then((resultFile) => {
          if(resultFile !== 'NOK'){
            props.create(result)
            setFileInput({file:null, filePreview:null})
          }
        })}else{
          props.create(result)
        }
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

  async function addDialogByClient(id, file = false){
    try{
      await addDialogByClientAct(id, message, file).then((result) => {
        if(file === true){addFiles(result[1].messageid).then((resultFile) => {
          if(resultFile !== 'NOK'){
            props.setDialog([result[0], ...props.dialogs])
            setFileInput({file:null, filePreview:null})
          }
        })}else{
          props.setDialog([result[0], ...props.dialogs])
        }
        props.setDialogCount(Number(props.dialogsCount) + 1)
        props.setDialogNull(false)
        setMessage('')
        socket.emit('newChatFor',{
          idUser: result[0].ansuser,   
          idChat: result[0].dialogid,
          changeUser: false
        })
        history('/chat/' + result[0].dialogid)
      })
    }catch(e){
      let massageErr = e.response.data.message
      props.setError(massageErr)
      console.log(e)
    }
  }

  async function addFiles(messageId){
    try{
      const formData = new FormData();
      formData.append('file', fileInput.file)
      formData.append('messageId', messageId)
      await fileUploadAct(formData).then((result) => {
        return result
      })
    }catch(e){
      let massageErr = e.response.data.message
      props.setError(massageErr)
      console.log(e)
      return 'NOK'
    }
  }

  function handleFileInputChange(fileInp){
    if(fileInp[0]){
      setFileInput({file:fileInp[0], filePreview:URL.createObjectURL(fileInp[0])})
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
          <div className="mb-3">
            <div class="btn-group">
              <label class="btn btn-outline-primary">
                  Вставить картинку в сообщение
                  <input className="form-control" accept="image/*,.png,.jpg" type="file" id="formFile" name="upload_file" onChange={e => {handleFileInputChange(e.target.files)}} hidden></input>
              </label>
              {fileInput.filePreview !== null 
              ? <button type="submit" id="inputGroupFileAddon04" onClick={() => {setFileInput({file:null, filePreview:null})}} className="btn btn-outline-secondary">Удалить картинку</button>
              : null}
            </div>
            <div id="inputGroupFileAddon04" className="form-text">Загрузить картинку до 2 mb по желанию. (Можно вставить скриншот используя комбинацию ctrl v)</div>
          </div>
          {fileInput.filePreview !== null 
          ? <a href={fileInput.filePreview} target="_blank"><img src={fileInput.filePreview} className="rounded mx-auto d-block" style={{'maxWidth': '40%'}}/></a>
          : null}
          <button type="submit" onClick={() => {addNewMessageAct()}} className="btn btn-primary">Отправить</button>
          {message.length > 0 ? <MesLoockLike text={message}/> : ''}
    </div>
  );
}

export default MesForm;