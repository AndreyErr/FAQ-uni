import React, { useState } from "react";
import AuUsersCard from "./AuUsersCard";

function AuUsers(){
    const [users, setUser] = useState([
        {id: 1, login: 'aaa', status: 'Пользователь', with: 'aaa', type: '1'},
        {id: 2, login: 'aaa', status: 'Пользователь', with: 'aaa', type: '1'},
        {id: 3, login: 'sdfghjkl', status: 'Пользователь', with: 'aaa', type: '1'},
        {id: 4, login: 'aaa', status: 'Пользователь', with: 'aaa', type: '1'},
        {id: 5, login: 'aaa', status: 'Пользователь', with: 'aaa', type: '1'},
    ]);
    return(
        <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic text-black">Все пользователи</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Логин</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                <tbody>
                    {users.map(user => 
                    <AuUsersCard data={user} key={user.id} />
                    )} 
                </tbody>
            </table>  
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-secondary">Загрузить ещё</button>
            </div> 
        </div>
    );
}

export default AuUsers;