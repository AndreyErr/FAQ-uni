import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { selectData } from "../../http/userAPI";
import Loader2 from "../ui/Loader2";

function AuAccaunt(){

    const {user} = useContext(Context)
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'Аккаунт';
        setTimeout(() => {
        selectData('statusText').then((result) => {
          setStatus(result)
        })
        setLoading(false)
    }, 0)
    }, [])

    const stat = () => {
        if(loading){
            return <Loader2 />
        }else{
            return status
        }
    }

    return(
        <div className="p-4 mb-3 bg-light rounded">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="fst-italic text-black">Обо мне</h4>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">Логин</th>
                                <td>{user.user['login']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Почта</th>
                                <td>{user.user['email']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Статус</th>
                                <td>{stat()}</td>
                            </tr>
                          </tbody>
                    </table>
                </div>
                {/* <div className="col-md-6">
                    <h4 className="fst-italic text-black">Статистика</h4>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                              <th scope="row">Завершено задач</th>
                              <td>10</td>
                            </tr>
                          </tbody>
                    </table>
                </div> */}
            </div>
        </div>
    );
}

export default AuAccaunt;