import React from "react";

function AuAccaunt(){
    return(
        <div className="p-4 mb-3 bg-light rounded">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="fst-italic text-black">Обо мне</h4>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">Логин</th>
                                <td>Mark</td>
                            </tr>
                            <tr>
                                <th scope="row">Имя</th>
                                <td>Jacob</td>
                            </tr>
                            <tr>
                                <th scope="row">Фамилия</th>
                                <td>Jacob</td>
                            </tr>
                            <tr>
                                <th scope="row">Статус</th>
                                <td>Статус</td>
                            </tr>
                          </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className="fst-italic text-black">Статистика</h4>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                              <th scope="row">Завершено задач</th>
                              <td>10</td>
                            </tr>
                          </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AuAccaunt;