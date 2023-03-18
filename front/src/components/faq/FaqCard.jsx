import React from "react";
import '../../styles/faq.css';

function FaqCard(){
    return(
        <div className="card">
            <div className="card-header" id="faqHeading-1">
                <div className="mb-0">
                    <h5 className="faq-title" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <b>What is Lorem Ipsum?</b>
                    </h5>
                </div>
            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="card-body text-start">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <hr></hr>
                    <p>Вам помог данный ответ? </p>
                    <button type="button" className="btn btn-success btn-sm me-2"><i className="fa-solid fa-thumbs-up"></i></button>
                    <button type="button" className="btn btn-danger btn-sm"><i className="fa-solid fa-thumbs-down"></i></button>
                </div>
            </div>
        </div>
    );
}

export default FaqCard;