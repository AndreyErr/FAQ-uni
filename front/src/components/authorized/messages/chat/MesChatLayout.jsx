import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HelpStatus from "./HelpStatus";
import MesChat from "./MesChat";
import MesForm from "../MesForm";
import { deleteDialogAct, selectDialogAct, selectMessagesAct, setMessageReadAct } from "../../../../http/chatAPI";
import { Context } from "../../../..";
import socket from "../../../../http/socket";
import Loader from "../../../ui/Loader";

function MesChatLayout(props){

  const params = useParams();
  const {user} = useContext(Context)
  const history = useNavigate()
  const [messages, setMessage] = useState([]);
  const [messagesLoader, setMessageLoader] = useState(true);
  const [messagesNull, setMessageNull] = useState(true);
  const [page, setPage] = useState(1);
  const [lastDialog, setLastDialog] = useState(0);
  const [dialogType, setDialogType] = useState(props.type);
  const [dialogFin, setDialogFin] = useState(0);
  const [lastUserAddMessage, setLastUserAddMessage] = useState(user.user['id']);
  const [countAllMes, setCountAllMes] = useState(0);
  const [error, setError] = useState('')
  const messLimit = 10

  let dialogExist = -1
  props.dialogs.forEach(function(entry) {
    if(entry.dialogid == params.chatId){
      dialogExist = entry.dialogid
    }
  });


  useEffect(() => {
    try{
      setMessageLoader(true)
      setTimeout(() => {
        if(params.chatId != 'new' && dialogExist > -1){
          setPage(1)
          setCountAllMes(0)
          setMessageNull(true)
          setError('')
          if(dialogType == 'chat' || dialogType == 'chatall'){
            socket.off('newMessageForDialog' + lastDialog)
            socket.off('newMessageForDialog' + params.chatId)
            setLastDialog(params.chatId)
          }
          selectDialogAct(params.chatId).then((result) => {
            if(result.dialogstatus === 1){
              setDialogFin(2) ////////////////////////////////////////////////////////////////
            }else if(result.dialogstatus != 8 && result.dialogstatus != 9){
              setDialogFin(0)
            }else{
              setDialogFin(1)
            }
          })
          selectMessagesAct(params.chatId, messLimit, 1).then((result) => {
              if(result == 'null'){
                setMessageNull(true)
              }else{
                setMessage(result[0])
                setCountAllMes(Number(result[1]))
                setMessageNull(false)
                setLastUserAddMessage(result[0][0].fromuser)
                if(result[0][0].fromuser != user.user['id'] && result[2].needtoread == 1 && (dialogType == 'chat') && !(result[2].ansuser !== result[0][0].fromuser && result[2].askuser !== result[0][0].fromuser && result[2].ansuser === user.user['id'])){
                  setMessageReadAct(params.chatId).then((result) => {
                    socket.emit('readDialog',{
                      dialogid: params.chatId,
                      userreadId: user.user['id']
                    })
                  })
                }
              }
              setMessageLoader(false)
          })
        }
      }, 0)
    }catch(e){
        console.log(e)
        setMessageLoader(false)
        if(dialogType == 'chat'){
          history('/chat')
        }else{
          history('/history')
        }
    }
  }, [params.chatId, dialogExist])

  async function addPageWithMessages(){
    selectMessagesAct(params.chatId, messLimit, page + 1).then((result) => {
      setMessage(messages.concat(result[0]))
      setPage(page + 1)
    })
  }

  async function deleteDialog(){
    const chat = Number(params.chatId)
    deleteDialogAct(chat).then((result) => {
      console.log(chat, props.dialogs, props.dialogs.filter(item => item.dialogid !== chat))
      props.setDialog(props.dialogs.filter(item => item.dialogid !== chat))
      //history('/history')
    })
  }

  function createMessage (newMessage) {
    if(dialogType == 'chat' || dialogType == 'chatall'){
      setMessage([newMessage, ...messages])
      setCountAllMes(Number(countAllMes) + 1)
      setLastUserAddMessage(user.user['id'])
    }
  }

  if(dialogType == 'chat' || dialogType == 'chatall'){
    socket.off('newMessageForDialog' + lastDialog)
    socket.off('newMessageForDialog' + params.chatId)
    socket.on('newMessageForDialog' + params.chatId, (data) => { 
      if(user.user['id'] != data.userSend && Number(data.finFlag) != 10){
        setMessage([data.data, ...messages])
        setCountAllMes(Number(countAllMes) + 1)
        setLastUserAddMessage(0)
        if(data.finFlag == 8 || data.finFlag == 9){
          setDialogFin(1)
        }
        console.log('АХУЕТЬ 2.0 ->', data)
      }
    })
  }
  
  function rend(){
    if(props.dialogsLoading){
      return <div className="p-4 mb-3 bg-light rounded"><h4 className="fst-italic text-black">Загрузка... </h4><Loader /></div>
    }else{
      return <div> {/*className="sticky-top" style={{top: '91px'}}*/}
      {user.user['status'] === 3 && (dialogFin == 0) && dialogType == 'chat' ? <HelpStatus id={params.chatId} type={'help'} setDialogCount={props.setDialogCount} dialogsCount={props.dialogsCount} /> : ''}
      {((params.chatId == 'new' && props.dialogsCount < 5) || dialogExist > -1) && (dialogType == 'chat' || dialogType == 'chatall') && dialogFin != 1 && dialogFin != 2
      ? <MesForm error={error} type={dialogType}  setError={setError} create={createMessage} dialogs={props.dialogs} setDialog={props.setDialog} id={params.chatId} setDialogNull={props.setDialogNull} setDialogCount={props.setDialogCount} dialogsCount={props.dialogsCount} />
      : params.chatId == 'new' 
        ? <div className="p-4 mb-3 bg-light rounded"><h4 className="fst-italic text-black">Вы достигли максимально доступное кол-во онлайн чатов! Общайтесь в тех, что уже есть!</h4></div> 
        : (dialogType == 'chat') && dialogFin != 1
          ? <div className="p-4 mb-3 bg-light rounded"><h4 className="fst-italic text-black">Не найдено</h4></div> 
          : ''
      }
      {params.chatId != 'new' && dialogExist > -1 ? (
        <div>
          {user.user['status'] === 5 && (dialogType == 'history' || dialogType == 'historyall') 
          ? <div className="p-4 mb-3 bg-light rounded">
              <div className="d-grid gap-2">
                <button type="button" onClick={() => {deleteDialog()}}className="btn btn-danger">Удалить чат!</button>
              </div>
             </div>
          : ''}
          {user.user['status'] < 3 && countAllMes > 1 && lastUserAddMessage != user.user['id'] && dialogType == 'chat' ? <HelpStatus id={params.chatId} type={'user'} setDialogCount={props.setDialogCount} dialogsCount={props.dialogsCount} /> : ''}
          {user.user['status'] >= 3 && (dialogFin == 1) && dialogType == 'chat' ? <HelpStatus id={params.chatId} type={'fin'} setDialogCount={props.setDialogCount} dialogsCount={props.dialogsCount} /> : ''}
          <MesChat messages={messages} messagesLoader={messagesLoader} page={page} messLimit={messLimit} countAllMes={countAllMes} addPageWithMessages={addPageWithMessages}/>
        </div>
      ) : ''}
    </div>
    }
  }

  return(
    rend()
  );
}

export default MesChatLayout;