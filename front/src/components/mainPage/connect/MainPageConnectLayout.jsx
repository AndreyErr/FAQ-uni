import React from "react";
import MainPageConnectCard from "./MainPageConnectCard";


function MainPageConnectLayout(){
    return(
        <div className="container">
            <div className="row">
                <div className="container px-4 py-5">
                    <h2 className="pb-2 border-bottom">Моего вопроса нет в базе знаний, что делать?</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 justify-content-md-center">
                        <MainPageConnectCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageConnectLayout;