import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socket from "../../../http/socket";
import { Context } from "../../..";
import { selectDialogAct, setMessageReadAct } from "../../../http/chatAPI";

function MesDialog(props){

  const {user} = useContext(Context)
  const [date, setDate] = useState(props.data.last_mes_date_add.substring(0, props.data.dateadd.length - 14));
  const [time, setTime] = useState(props.data.last_mes_time_add);
  const [readStatus, setReadStatus] = useState('');

  if(!props.data.userasklogin && props.type == 'chat'){
    props.data.userasklogin = "новый чат"
  }

  useEffect(() => {
    if(props.data.dialogstatus === 8 && props.type == 'chat'){
      setReadStatus('bg-success bg-opacity-50')
    }else if(props.data.dialogstatus === 9 && props.type == 'chat'){
      setReadStatus('bg-danger bg-opacity-50')
    }else if(props.data.ansuser !== props.data.last_mes_user_add && props.data.askuser !== props.data.last_mes_user_add && props.data.ansuser === user.user['id'] && props.type == 'chat'){
      setReadStatus('bg-info bg-opacity-50')
    }else if(props.data.needtoread === 1 && user.user['id'] !== props.data.last_mes_user_add  && props.type == 'chat'){
      setReadStatus('bg-warning bg-opacity-50')
    }
    if(props.data.dialogstatus === 1 && (props.type == 'chatall' || props.data.ansuser === user.user['id'])){
      setReadStatus('bg-danger bg-opacity-20')
    }
  }, [])

  
  socket.off('notificationFor' + props.data.dialogid)
  socket.on('notificationFor' + props.data.dialogid, (data) => {
    if(props.type == 'chatall' || props.data.ansuser === user.user['id']){
      if(data.notification === 'NOT_READY_FOR_DIALOG'){
        setReadStatus('bg-danger bg-opacity-20')
      }else if(data.notification === 'READY_FOR_DIALOG'){
        setReadStatus('')
      }
    }
    if(props.type == 'chat'){
      if(data.notification === 'CHANGE_CHAT_FOR_ANS_USER' && props.data.ansuser === user.user['id']){
        props.setDialog(props.dialogs.filter(item => item.dialogid !== props.data.dialogid))
        props.setDialogCount(props.dialogsCount - 1)
        socket.off('newMessageForDialogDIALOGS' + props.data.dialogid)
        socket.off('notificationFor' + props.data.dialogid)
      }
    }
  })
  

  if(props.type == 'chat' || props.type == 'chatall'){
    
    socket.off('newMessageForDialogDIALOGS' + props.data.dialogid)
    socket.on('newMessageForDialogDIALOGS' + props.data.dialogid, (data) => {
      setDate(data.data.dateadd.substring(0, props.data.dateadd.length - 14))
      setTime(data.data.timeadd)
      if(data.dataDialog.dialogstatus === 0){
        setReadStatus('')
      }
      if(data.finFlag === 1){
        setReadStatus('bg-warning bg-opacity-10')
      }
      if(props.type == 'chat'){
        props.changeDialogPositionToTop(props.data.dialogid)
        if((data.data.fromuser === user.user['id'] && (data.finFlag === 8 || data.finFlag === 9)) || data.finFlag === 10){
          props.setDialog(props.dialogs.filter(item => item.dialogid !== data.data.dialogid))
          socket.off('newMessageForDialogDIALOGS' + props.data.dialogid)
        }else if(data.finFlag === 8){
          setReadStatus('bg-success bg-opacity-50')
        }else if(data.finFlag === 9){
          setReadStatus('bg-danger bg-opacity-50')
        }else if(data.dataDialog.ansuser !== data.data.fromuser && data.dataDialog.askuser !== data.data.fromuser && data.dataDialog.ansuser === user.user['id'] && data.finFlag != 10){
          setReadStatus('bg-info bg-opacity-50')
        }else if(props.act == '' && data.finFlag != 10){
          setReadStatus('bg-warning bg-opacity-50')
        }else if(data.finFlag !== 10){
          if(readStatus !== 'bg-info bg-opacity-50'){
            setMessageReadAct(props.data.dialogid)
          }
          setReadStatus('')
        }
      }
    })

    socket.off('readedDialog' + props.data.dialogid + user.user['id'])
    socket.on('readedDialog' + props.data.dialogid + user.user['id'], (data) => {
      selectDialogAct(props.data.dialogid).then((result) => {
        if(result.dialogstatus == 0){
          setReadStatus('')
        }
      })
    })
  }

  let href = props.type
  if(props.type === 'historyall'){
    href = 'history/all'
  }else if(props.type === 'chatall'){
    href = 'chat/all'
  } 

  return(
    <Link to={"/" + href + "/" + props.data.dialogid} className={`list-group-item list-group-item-action py-3 lh-sm ${readStatus} ${props.act}`} aria-current="true">
    <div className="row">
      <div className="col-md-12">
        <strong className="mb-1 text-break">
          {user.user['status'] > 2 
          ? props.data.userasklogin 
            ? props.data.userasklogin
            : 'Не найден'
          : props.data.dialogid}
          </strong>
          {props.data.dialogtype === 2 && user.user['status'] > 2 ? <small className="text-danger float-end"><i className="fa-solid fa-circle-dot"></i></small> : null}
          <br></br>
        <small className="text-info">{date} {time} {user.user['status'] > 2 ? '|' : null} </small>
        <small className="text-secondary">{user.user['status'] > 2 ? props.data.dialogid : null}</small>
      </div>
    </div>
  </Link>
  );
}

export default MesDialog;