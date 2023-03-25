import React from "react";
import Message from "./Message";

function MesChat(props){

    return(
    <div className="p-4 mb-5 bg-light rounded">
        <h4 className="fst-italic text-black">Чат с ...</h4>
        <table className="table table-hover">
            <tbody className="table-group-divider">
                {props.messages.map(message => 
                    <Message data={message} key={message.id}/>
                )}
            </tbody>
        </table>
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-secondary">Загрузить ещё</button>
        </div>
    </div>
    );
}

export default MesChat;