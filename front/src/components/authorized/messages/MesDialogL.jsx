import React, { useContext, useEffect, useState } from "react";
import MesDialog from "./MesDialog";
import MesNew from "./MesNew";
import { selectDialogs } from "../../../http/chatAPI";
import { Context } from "../../..";
import { useParams } from "react-router-dom";

function MesDialogL(props){
    const {user} = useContext(Context)
    const params = useParams();

    return(
        <div>
            <span className="d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Диалоги</span>
              </span>
            <div className="list-group list-group-flush rounded">
                {user.user['status'] < 3 && props.dialogsCount < 5 && props.type == 'chat'
                ? <MesNew />
                : ''
                }
                {props.dialogsNull 
                ? <span className="fs-4">Диалогов нет</span>
                : props.dialogs.map(dialog => 
                    dialog.dialogid == params.chatId ? <MesDialog type={props.type} dialogs={props.dialogs} setDialog={props.setDialog} data={dialog} key={dialog.dialogid} act={'active'} changeDialogPositionToTop={props.changeDialogPositionToTop} /> : <MesDialog type={props.type} dialogs={props.dialogs} setDialog={props.setDialog} data={dialog} key={dialog.dialogid} act={''} changeDialogPositionToTop={props.changeDialogPositionToTop}/>
                )
                }
            </div>
        </div>
    );
}

export default MesDialogL;