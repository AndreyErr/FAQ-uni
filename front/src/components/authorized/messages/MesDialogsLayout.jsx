import React from "react";
import MesDialogL from "./MesDialogL";

function MesDialogsLayout(props){
    if(props.type == 'chat'){
        document.title = 'Чаты';
    }else{
        document.title = 'История';
    }
    return(
        <div className="p-4 mb-3 bg-secondary rounded  z-index-1 sticky-top" style={{top: '91px'}}>
            <span className="d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Диалоги</span>
            </span>
            <MesDialogL type={props.type} dialogsCount={props.dialogsCount} dialogs={props.dialogs} setDialog={props.setDialog} dialogsNull={props.dialogsNull} changeDialogPositionToTop={props.changeDialogPositionToTop} addPageWithDialogs={props.addPageWithDialogs} dialogsLimit={props.dialogsLimit} page={props.page}/>
        </div>
    );
}

export default MesDialogsLayout;