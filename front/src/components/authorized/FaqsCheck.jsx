import React, { useEffect } from "react";
import FaqLayout from "../faq/FaqLayout";

function FaqsCheck(){

    useEffect(() => {
        document.title = 'FAQs на проверку';
    }, [])

    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sticky-top" style={{top: '91px'}}>
            <FaqLayout type={'uncheck'} blockCount={1} />
        </div>
    );
}

export default FaqsCheck;