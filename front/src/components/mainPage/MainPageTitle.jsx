import React from "react";

function MainPageTitle(){
    return(
        <div className="container">
            <div className="row">
                <div className="bg-dark text-secondary px-4 py-5 text-center">
                    <div className="py-5">
                        <h1 className="display-5 fw-bold text-white">Поддержка</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="fs-5 mb-4">Чем мы можем вам помочь?</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a href="/faq"><button type="button" className="btn btn-outline-info btn-lg px-4 fw-bold">База знаний</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageTitle;