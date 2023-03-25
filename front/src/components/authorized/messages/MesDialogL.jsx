import React, { useState } from "react";
import MesDialog from "./MesDialog";
import MesNew from "./MesNew";

function MesDialogL(props){
    const [dialogs, setDialog] = useState([
        {id: 1, dateFinalMessage: '2012-01-03', timeFinalMessage: '12:00', with: 'aaa', type: '1'},
        {id: 2, dateFinalMessage: '2012-01-03', timeFinalMessage: '12:00', with: 'aaa', type: '1'},
        {id: 3, dateFinalMessage: '2012-01-03', timeFinalMessage: '12:00', with: 'aaa', type: '1'},
        {id: 4, dateFinalMessage: '2012-01-03', timeFinalMessage: '12:00', with: 'aaa', type: '1'},
    ]);
    return(
        <div>
            <span className="d-flex align-items-center mb-3 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Диалоги</span>
              </span>
            <div className="list-group list-group-flush rounded">
                <MesNew />
                {dialogs.map(dialog => 
                    <MesDialog data={dialog} key={dialog.id}/>
                )}
            </div>
        </div>
    );
}

export default MesDialogL;