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
    console.log(props.data)
    if(props.data.dialogstatus === 8 && props.type == 'chat'){
      setReadStatus('bg-success bg-opacity-50')
    }else if(props.data.dialogstatus === 9 && props.type == 'chat'){
      setReadStatus('bg-danger bg-opacity-50')
    }else if(props.data.ansuser !== props.data.last_mes_user_add && props.data.askuser !== props.data.last_mes_user_add && props.data.ansuser === user.user['id'] && props.type == 'chat'){
      setReadStatus('bg-info bg-opacity-50')
    }else if(props.data.needtoread === 1 && user.user['id'] !== props.data.last_mes_user_add  && props.type == 'chat'){
      setReadStatus('bg-warning bg-opacity-50')
    }
  }, [])

  if(props.type == 'chat' || props.type == 'chatall'){
    socket.off('newMessageForDialogN' + props.data.dialogid)
    socket.on('newMessageForDialogN' + props.data.dialogid, (data) => {
      console.log('АХУЕТЬ 2.1 ->', data)
      setDate(data.data.dateadd.substring(0, props.data.dateadd.length - 14))
      setTime(data.data.timeadd)
      if(data.finFlag === 1){
        setReadStatus('bg-warning bg-opacity-10')
        console.log(1000)
      }
      if(props.type == 'chat'){
        props.changeDialogPositionToTop(props.data.dialogid)
        if((data.data.fromuser === user.user['id'] && (data.finFlag === 8 || data.finFlag === 9)) || data.finFlag === 10){
          props.setDialog(props.dialogs.filter(item => item.dialogid !== data.data.dialogid))
          socket.off('newMessageForDialogN' + props.data.dialogid)
          console.log(1)
        }else if(data.finFlag === 8){
          setReadStatus('bg-success bg-opacity-50')
          console.log(2)
        }else if(data.finFlag === 9){
          setReadStatus('bg-danger bg-opacity-50')
          console.log(3)
        }else if(data.dataDialog.ansuser !== data.data.fromuser && data.dataDialog.askuser !== data.data.fromuser && data.dataDialog.ansuser === user.user['id'] && data.finFlag != 10){
          console.log(data.dataDialog.ansuser !== data.data.fromuser && data.dataDialog.askuser !== data.data.fromuser && data.dataDialog.ansuser === user.user['id'] && data.finFlag != 10)
          console.log(4)
          setReadStatus('bg-info bg-opacity-50')
        }else if(props.act == '' && data.finFlag != 10){
          console.log(5)
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
      console.log('АХУЕТЬ 2.2 ->', data)
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
      <div className="col-md-10">
        <strong className="mb-1">
          {user.user['status'] > 2 
          ? props.data.userasklogin 
            ? props.data.userasklogin
            : 'Не найден'
          : props.data.dialogid}
          </strong><br></br>
        <small className="text-info">{date} {time} {user.user['status'] > 2 ? '|' : ''} </small>
        <small className="text-secondary">{user.user['status'] > 2 ? props.data.dialogid : ''}</small>
      </div>
      <div className="col-md-2">
          {/* <small className="text-danger"><i className="fa-solid fa-circle-dot"></i></small> */}
      </div>
    </div>
  </Link>
  );
}

export default MesDialog;