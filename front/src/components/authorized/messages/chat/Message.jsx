import React, { useContext } from "react";
import ReactMarkdown from 'react-markdown'
import { Context } from "../../../..";

function Message(props){
  const {user} = useContext(Context)
  const dateadd = props.data.dateadd.substring(0, props.data.dateadd.length - 14)
    return(
      <tr className="border-bottom border-4">
        <th scope="row" className="table-secondary" width="15%">
          {props.data.fromuser == -1 
          ? <b className="text-info">Система</b> 
          : props.data.fromuser == -2 
            ? <b className="text-info">Удалён</b> 
            : (!props.data.login || props.data.login == user.user['login']) 
              ? <b className="text-danger">Вы</b> 
              : props.data.login} 
        <br></br>
        <small className="text-primary">{dateadd} {props.data.timeadd}</small></th>
        <td><ReactMarkdown>{props.data.textmessage}</ReactMarkdown></td>
      </tr>
    );
}

export default Message;