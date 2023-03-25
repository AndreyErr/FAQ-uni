import React from "react";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";

function FaqSearchResult(){
    return(
        <div className="col-md-12 themed-grid-col">
            <div className="faq " id="accordion">
                <FaqCard />
                <FaqCard />
            </div>
        </div>
    );
}

export default FaqSearchResult;