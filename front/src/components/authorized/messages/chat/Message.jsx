import React from "react";
import ReactMarkdown from 'react-markdown'

function Message(props){
    return(
      <tr className="border-bottom border-4">
        <th scope="row" className="table-secondary" width="15%">{props.data.from} 
        <br></br>
        <small className="text-primary">{props.data.date} {props.data.time}</small></th>
        <td><ReactMarkdown>{props.data.text}</ReactMarkdown></td>
      </tr>
    );
}

export default Message;