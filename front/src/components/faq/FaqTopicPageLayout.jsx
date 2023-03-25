import React from "react";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";

function FaqTopicPageLayout(){
    return(
        <main>
            <div className="container">
                <div className="col-md-12 themed-grid-col">
                    <div className="faq-title text-center pb-3">
                        <h2>FAQ</h2>
                    </div>
                    <div className="faq " id="accordion">
                        <FaqCard />
                        <FaqCard />
                        <FaqCard />
                        <FaqCard />
                        <FaqCard />
                    </div>
                    <div className="d-grid gap-2 mt-5">
                      <a href="/faq" type="button" className="btn btn-secondary">Назад</a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FaqTopicPageLayout;