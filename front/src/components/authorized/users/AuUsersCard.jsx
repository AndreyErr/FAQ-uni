import React, { useContext, useState } from "react";
import { Context } from "../../..";
import MessageToastContainer from "../../ui/MessageToastContainer";
import MessageToast from "../../ui/MessageToast";
import { updateUserProbAct, updateUserStatusAct } from "../../../http/userAPI";
import { selectConfigData } from "../../../http/anotherAPI";

function AuUsersCard(props){
    const {user} = useContext(Context)
    const [status, setStatus] = useState(props.data.status);
    const [textStatus, setTextStatus] = useState(props.data.status_text);
    const [prob, setProb] = useState(props.data.prob);
    const [probabs, setProbabs] = useState([
        {id: 1, value: 0},
        {id: 2, value: 10},
        {id: 3, value: 20},
        {id: 4, value: 40},
        {id: 5, value: 50},
        {id: 6, value: 80},
        {id: 7, value: 100},
        {id: 8, value: 150},
        {id: 9, value: 200},
    ]);

    async function updateUserStatus (newStatus) {
        try{
            await updateUserStatusAct(props.data.user_id, newStatus).then((result) => {
                if(result.data[0] == "OK"){
                    setStatus(newStatus)
                    setProb(Number(result.data[1]))
                    let textStatus = ''
                    props.usersStatuses.forEach(function(status) {
                        if(status['usersstatusid'] == newStatus){
                            textStatus = status['title']
                        }
                    });
                    setTextStatus(textStatus)
                }
            })
        }catch(e){
            console.log(e.response.data.message)
            let massageErr = e.response.data.message
            props.setStat([massageErr, ...props.stat])
        }
    }

    async function changeProb (newProb) {
        try{
            await updateUserProbAct(props.data.user_id, newProb).then((result) => {
                if(result.data == "OK"){
                    setProb(newProb)
                }
            })
        }catch(e){
            console.log(e.response.data.message)
            let massageErr = e.response.data.message
            props.setStat([massageErr, ...props.stat])
        }
    }

    function actions(){
        if((props.data.status == 4 && user.user['status'] == 4) || (props.data.status == 5 && user.user['login'] != props.mainLogin) || props.data.login == user.user['login']){
            if(user.user['login'] == props.mainLogin || (user.user['login'] == props.data.login && (props.data.status == 5 || props.data.status == 4))){
                return  <select value={prob} onChange={e => changeProb(e.target.value)} id="prob" className="form-select form-select-sm mt-2" aria-label=".form-select-lg example">
                            {probabs.map(probb => 
                                <option key={probb.id} value={probb.value}>{probb.value}</option>
                            )}
                        </select>
            }else{
                return 'Нет действий'
            }
        }else{
            return <div>
                <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#deleteUs${props.data.user_id}`}>
                  Удалить
                </button>
                <div className="modal fade" id={`deleteUs${props.data.user_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Удалить пользователя {props.data.login}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <h2 className="fs-5">ПОЛЬЗОВАТЕЛЬ {props.data.login} БУДЕТ БЕЗВОЗВРАТНО УДАЛЁН</h2>
                        <button type="button" data-bs-dismiss="modal" onClick={() => {props.delete(props.data.user_id)}} className="btn btn-outline-danger btn-sm">Удалить</button>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {user.user['status'] === 5
                ?   <span><select value={status} onChange={e => updateUserStatus(e.target.value)} id="status" className="form-select form-select-sm mt-2" aria-label=".form-select-lg example">
                        {props.usersStatuses.map(status => 
                            // <option key={status.usersstatusid} value={status.usersstatusid}>{status.title}</option>
                          (status.usersstatusid == 5 && user.user['login'] != props.mainLogin)? '' :<option key={status.usersstatusid} value={status.usersstatusid}>{status.title}</option>
                        )}
                    </select>
                    </span>
                : ''
                }
                {(user.user['status'] > 3 && status > 2) ? <select value={prob} onChange={e => changeProb(e.target.value)} id="prob" className="form-select form-select-sm mt-2" aria-label=".form-select-lg example">
                    {probabs.map(probb => 
                        <option key={probb.id} value={probb.value}>{probb.value}</option>
                    )}
                </select> : ''}
            </div>
        }
    }
    return(
        <tr>
            <th scope="row">{props.data.user_id}</th>
            <td>{props.data.login}</td>
            <td>{textStatus} ({status})</td>
            <td className="hstack gap-3">
                {actions()}

                {/* <button type="button" className="btn btn-outline-danger btn-sm">Заблокировать</button> */}
            </td>
        </tr>
    );
}

export default AuUsersCard;