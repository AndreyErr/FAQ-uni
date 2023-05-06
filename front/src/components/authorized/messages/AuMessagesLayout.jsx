import React, { useContext, useEffect, useState } from "react";
import { selectDialogs } from "../../../http/chatAPI";
import { Context } from "../../..";
import MesChatLayout from "./chat/MesChatLayout";
import MesDialogsLayout from "./MesDialogsLayout";
import { useParams } from "react-router-dom";
import socket from "../../../http/socket";
import Loader from "../../ui/Loader";

function AuMessagesLayout(props){
    const {user} = useContext(Context)
    const [dialogsNull, setDialogNull] = useState(false)
    const [dialogs, setDialog] = useState([]);
    const [dialogsCount, setDialogCount] = useState(0);
    const [dialogsLoading, setDialogLoading] = useState(true);
    const [page, setPage] = useState(1);
    const params = useParams();
    const dialogsLimit = 10

    let flag = ''
    let type = props.type

    useEffect(() => {
        socket.removeAllListeners()
        setDialogLoading(true)
        try{
        setTimeout(() => {
            if(props.type === 'historyall' && user.user['status'] > 3){
                flag = 'all'
                type = 'history'
            }else if(props.type === 'chatall' && user.user['status'] > 3){
                flag = 'all'
                type = 'chat'
            } 
            selectDialogs(user.user['id'], type, dialogsLimit, 1, flag).then((result) => {
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
            setDialogLoading(false)
        }
    }, [])

    if(props.type == 'chat'){
        socket.off('newChatFor' + user.user['id'])
        socket.on('newChatFor' + user.user['id'], (data) => {
            setDialog([data.data, ...dialogs])
            setDialogNull(false)
            setDialogCount(Number(dialogsCount) + 1)
        })
    }
    if(props.type == 'chatall'){
        socket.off('newChat')
        socket.on('newChat', (data) => {
            setDialog([data.data, ...dialogs])
            setDialogNull(false)
            setDialogCount(Number(dialogsCount) + 1)
        })
    }

    async function addPageWithDialogs(){
        if(props.type === 'historyall' && user.user['status'] > 3){
            flag = 'all'
            type = 'history'
        }else if(props.type === 'chatall' && user.user['status'] > 3){
            flag = 'all'
            type = 'chat'
        } 
        selectDialogs(user.user['id'], type, dialogsLimit, page + 1, flag).then((result) => {
            setDialog(dialogs.concat(result[0]))
            setPage(page + 1)
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
                : <MesDialogsLayout type={props.type} dialogsCount={dialogsCount} setDialogCount={setDialogCount} dialogs={dialogs} setDialog={setDialog} dialogsNull={dialogsNull} changeDialogPositionToTop={changeDialogPositionToTop} addPageWithDialogs={addPageWithDialogs} dialogsLimit={dialogsLimit} page={page}/>
                }
            </div>
            {params.chatId
            ?   <div className="col-md-9">
                    <MesChatLayout type={props.type} setDialogCount={setDialogCount} dialogsCount={dialogsCount} dialogs={dialogs} dialogsLoading={dialogsLoading} setDialog={setDialog} setDialogNull={setDialogNull}/>
                </div>
            : null
            }
        </div>
    );
}

export default AuMessagesLayout;