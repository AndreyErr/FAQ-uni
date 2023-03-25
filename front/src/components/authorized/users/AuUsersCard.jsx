import React from "react";

function AuUsersCard(props){
    return(
        <tr>
            <th scope="row">{props.data.id}</th>
            <td>{props.data.login}</td>
            <td>{props.data.status}</td>
            <td className="hstack gap-3"><button type="button" className="btn btn-outline-danger btn-sm">Удалить</button><button type="button" className="btn btn-outline-danger btn-sm">Заблокировать</button></td>
        </tr>
    );
}

export default AuUsersCard;