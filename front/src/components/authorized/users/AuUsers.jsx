import React, { useEffect, useMemo, useState } from "react";
import { deleteUser, fatchUsers, selectUsersTypes } from "../../../http/userAPI";
import Loader from "../../ui/Loader";
import MessageToast from "../../ui/MessageToast";
import AuUsersCard from "./AuUsersCard";
import MessageToastContainer from "../../ui/MessageToastContainer";
import { selectConfigData } from "../../../http/anotherAPI";

function AuUsers(){
    const [users, setUser] = useState([]);
    const [usersStatuses, setUsersStatuses] = useState([]);
    const [limitForPosts, setLimitForPosts] = useState(5);
    const [pageForPosts, setPageForPosts] = useState(1);
    const [totalPageForUsers, setTotalPageForUsers] = useState(0);
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [stat, setStat] = useState([])
    const [mainLogin, setMainLogin] = useState('')


    useEffect(() => {
        document.title = 'Пользователи';
        setTimeout(() => {
            fatchUsers(limitForPosts, pageForPosts).then((result) => {
                selectConfigData().then((result) => {
                    setMainLogin(result.data[0])
                })
                setUser(result.data[0])
                setTotalPageForUsers(getPageCount(result.data[1], limitForPosts))
                setIsUsersLoading(false)
                setStat([])
                //setStat(['', ...stat])
            })
            selectUsersTypes().then((result) => {
                setUsersStatuses(result)
            })
    }, 0)
    }, [pageForPosts])

    let pagesArray = []
    for(let i = 0; i < totalPageForUsers; i++){
        pagesArray.push(i+1)
    }

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const changePage = (pageNum) => {
        setIsUsersLoading(true)
        setPageForPosts(pageNum)
        if(pageNum === pageForPosts){
            setIsUsersLoading(false)
        }
    }

    async function dUser (id) {
        try{
            const status = await deleteUser(id)
            if(status.data == "OK"){
                setUser(users.filter(item => item.user_id !== id))
            }
        }catch(e){
            let massageErr = e.response.data.message
            setStat([massageErr, ...stat])
        }
    }
    
    return(
        <div className="p-4 mb-3 bg-light rounded">
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : ''}
            <h4 className="fst-italic text-black">Все пользователи {isUsersLoading ? <Loader /> : ''}</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Логин</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Действие / коэффициент выпадения чатов</th>
                    </tr>
                  </thead>
                <tbody>
                    {users.map(user => 
                    <AuUsersCard data={user} key={user.user_id} delete={dUser} usersStatuses={usersStatuses} mainLogin={mainLogin} setStat={setStat} stat={stat} />
                    )} 
                </tbody>
            </table>  
            <div className="d-grid gap-2">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                {pagesArray.map(p => 
                    <li key={p} onClick={() => changePage(p)} className={`page-item ${pageForPosts === p ? 'active' : ''}`}><a className="page-link" href="#">{p}</a></li>
                )}
                </ul>
            </nav>
            </div>
        </div>
    );
}

export default AuUsers;