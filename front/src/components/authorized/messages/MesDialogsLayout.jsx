import React from "react";
import MesDialogL from "./MesDialogL";

function MesDialogsLayout(props){
    if(props.type == 'chat'){
        document.title = 'Чаты';
    }else{
        document.title = 'История';
    }
    return(
        <div className="p-4 mb-3 bg-secondary rounded  z-index-1">
            <MesDialogL type={props.type} dialogsCount={props.dialogsCount} dialogs={props.dialogs} setDialog={props.setDialog} dialogsNull={props.dialogsNull} changeDialogPositionToTop={props.changeDialogPositionToTop}/>
        </div>
    );
}

export default MesDialogsLayout;