import React from "react";
import Message from "./Message";
import Loader from "../../../ui/Loader";

function MesChat(props){
    console.log('meschat', props.messages)
    return(
    <div className="p-4 mb-5 bg-light rounded">
        <h4 className="fst-italic text-black">Чат<span className="float-end">{props.messagesLoader ? <Loader /> : ''}</span></h4>
        <table className="table table-hover">
            <tbody className="table-group-divider">
                {props.messages.map(message => 
                    <Message data={message} key={message.messageid}/>
                )}
            </tbody>
        </table>
        {(props.countAllMes > props.messLimit && props.page * props.messLimit < props.countAllMes) 
        ?   <div className="d-grid gap-2">
              <button type="button" onClick={() => {props.addPageWithMessages()}} className="btn btn-secondary">Загрузить ещё</button>
            </div>
        : <div className="text-muted">Это всё</div>}
    </div>
    );
}

export default MesChat;