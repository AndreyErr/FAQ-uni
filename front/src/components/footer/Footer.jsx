import React, { useContext } from "react";
import '../../styles/footer.css';
import LoginModal from "../mainPage/LoginModal";
import { Context } from "../..";

function Footer(){
    const {user} = useContext(Context)
    return(
        <div>{!user.user['status'] 
        ? <LoginModal id={1}/>
        : null
        }
            <footer className="py-2 text-bg-dark footer">
                <span className="text-center text-muted">Поддержка от AndreyErr</span>
            </footer>
            </div>
    );
}

export default Footer;