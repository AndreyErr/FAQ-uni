import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";

function MainPageTitle(){

    const {user} = useContext(Context)

    return(
        <div className="container">
            <div className="row">
                <div className="bg-dark text-secondary px-4 py-5 text-center">
                    <div className="py-5">
                        <h1 className="display-5 fw-bold text-white">Поддержка</h1>
                        <div className="col-lg-6 mx-auto">
                            {user.user['status'] > 2
                            ?
                            <div>
                            <p className="fs-5 mb-4">Приступим к ответам</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <Link to="/faq"><button type="button" className="btn btn-outline-info btn-lg px-4 fw-bold">База знаний</button></Link>
                                <Link to="/chat"><button type="button" className="btn btn-outline-info btn-lg px-4 fw-bold">Чаты</button></Link>
                            </div></div>
                            :
                            <div>
                            <p className="fs-5 mb-4">Чем мы можем вам помочь?</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <Link to="/faq"><button type="button" className="btn btn-outline-info btn-lg px-4 fw-bold">База знаний</button></Link>
                            </div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageTitle;