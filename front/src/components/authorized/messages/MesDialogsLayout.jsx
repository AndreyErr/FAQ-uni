import React, { useContext, useEffect, useState } from "react";
import MesDialog from "./MesDialog";
import MesNew from "./MesNew";
import { Context } from "../../..";
import { useParams } from "react-router-dom";

function MesDialogsLayout(props){
    if(props.type == 'chat' || props.type == 'chatall'){
        document.title = 'Чаты';
    }else{
        document.title = 'История';
    }
    const {user} = useContext(Context)
    const params = useParams();

    function st(){
        let heightOut = '65vh'
        if(user.user['status'] > 2){
            heightOut = '56vh'
        }
        const style = {height: heightOut, overflowY: "scroll"}
        if(props.dialogsCount <= props.dialogsLimit){
            return {}
        }else{
            return style
        }
    }
    return(
        <div className="p-4 mb-3 bg-secondary rounded  z-index-1 sticky-top" style={{top: '91px'}}>
            <span className="d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Диалоги</span>
            </span>
            <div className="Skroll" style={st()}>
            <div className="list-group list-group-flush rounded">
                {user.user['status'] < 3 && props.dialogsCount < 5 && props.type == 'chat'
                ? <MesNew />
                : null
                }
                {props.dialogsNull 
                ? <span className="fs-4">Диалогов нет</span>
                : props.dialogs.map(dialog => 
                    dialog.dialogid == params.chatId 
                    ? <MesDialog type={props.type} dialogs={props.dialogs} setDialog={props.setDialog} data={dialog} key={dialog.dialogid} act={'active'} changeDialogPositionToTop={props.changeDialogPositionToTop} dialogsCount={props.dialogsCount} setDialogCount={props.setDialogCount} /> 
                    : <MesDialog type={props.type} dialogs={props.dialogs} setDialog={props.setDialog} data={dialog} key={dialog.dialogid} act={''} changeDialogPositionToTop={props.changeDialogPositionToTop} dialogsCount={props.dialogsCount} setDialogCount={props.setDialogCount}/>
                )
                }
                {(props.dialogsCount > props.dialogsLimit && props.page * props.dialogsLimit < props.dialogsCount)
                ?   <div className="d-grid gap-2 mt-2">
                        <button type="button" onClick={() => {props.addPageWithDialogs()}} className="btn btn-outline-light">Загрузить ещё</button>
                    </div>
                : null
                }
            </div>
        </div>
        </div>
    );
}

export default MesDialogsLayout;