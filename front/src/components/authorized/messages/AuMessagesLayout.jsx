import React, { useContext, useEffect, useState } from "react";
import MesDialog from "./MesDialog";
import MesNew from "./MesNew";
import { addDialogByClientAct, selectDialogs } from "../../../http/chatAPI";
import { Context } from "../../..";
import MesChatLayout from "./chat/MesChatLayout";
import MesDialogsLayout from "./MesDialogsLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import socket from "../../../http/socket";
import Loader from "../../ui/Loader";

function AuMessagesLayout(props){
    const {user} = useContext(Context)
    const [dialogsNull, setDialogNull] = useState(false)
    const [dialogs, setDialog] = useState([]);
    const [dialogsCount, setDialogCount] = useState(0);
    const [dialogsLoading, setDialogLoading] = useState(true);
    const params = useParams();

    console.log(props.type)

    useEffect(() => {
        setDialogLoading(true)
        try{
        setTimeout(() => {
            let flag = ''
            let type = props.type
            if(props.type === 'historyall' && user.user['status'] > 3){
                flag = 'all'
                type = 'history'
            }
            selectDialogs(user.user['id'], type, flag).then((result) => {
                setDialogLoading(true)
                if(result == 'null'){
                    setDialogNull(true)
                }else{
                    setDialog(result[0])
                    setDialogCount(result[1])
                }
                setDialogLoading(false)
            })
        }, 0)
        }catch(e){
            console.log(e)
            setDialogLoading(false)
        }
    }, [])

    if(props.type == 'chat'){
        socket.off('newChatFor' + user.user['id'])
        socket.on('newChatFor' + user.user['id'], (data) => {
            setDialog([data.data, ...dialogs])
            setDialogNull(false)
            console.log('АХУЕТЬ ->', data)
        })
    }


    function changeDialogPositionToTop(dialogId){
        const needDialog = dialogs.filter(item => item.dialogid === dialogId)
        const withoutNeedDialog = dialogs.filter(item => item.dialogid !== dialogId)
        setDialog([needDialog[0], ...withoutNeedDialog])
    }

    function DialogsLayout () {
        if(params.chatId){
            return '3'
        }else{
            return '12'
        }
    }

    return(
        <div className="row">
            <div className={`col-md-${DialogsLayout()}`}>
                {dialogsLoading 
                ? <div className="p-4 mb-3 bg-secondary rounded  z-index-1"><span className="fs-4">Диалоги</span><br></br><Loader /></div>
                : <MesDialogsLayout type={props.type} dialogsCount={dialogsCount} dialogs={dialogs} setDialog={setDialog} dialogsNull={dialogsNull} changeDialogPositionToTop={changeDialogPositionToTop}/>
                }
            </div>
            {params.chatId
            ?   <div className="col-md-9">
                    <MesChatLayout type={props.type} setDialogCount={setDialogCount} dialogsCount={dialogsCount} dialogs={dialogs} dialogsLoading={dialogsLoading} setDialog={setDialog} setDialogNull={setDialogNull}/>
                </div>
            : ''
            }
        </div>
    );
}

export default AuMessagesLayout;