import React, { useEffect } from "react";
import FaqLayout from "./FaqLayout";

function FaqPageLayout(){

    useEffect(() => {
        document.title = 'FAQs';
    }, [])

    return(
        <main>
            <FaqLayout />
        </main>
    );
}

export default FaqPageLayout;