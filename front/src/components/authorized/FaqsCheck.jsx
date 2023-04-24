import React, { useContext } from "react";
import FaqLayout from "../faq/FaqLayout";

function FaqsCheck(){
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sticky-top" style={{top: '91px'}}>
            <FaqLayout type={'uncheck'} blockCount={1} />
        </div>
    );
}

export default FaqsCheck;