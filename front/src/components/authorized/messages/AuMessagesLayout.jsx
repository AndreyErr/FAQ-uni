import React from "react";
import MesChatLayout from "./chat/MesChatLayout";
import MesDialogsLayout from "./MesDialogsLayout";

function AuMessagesLayout(props){
    return(
        <div className="row">
            <div className="col-md-3">
                <MesDialogsLayout />
            </div>
            <div className="col-md-9">
                <MesChatLayout />
            </div>
        </div>
    );
}

export default AuMessagesLayout;