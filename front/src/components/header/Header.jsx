import React, { useContext } from "react";
import '../../styles/header.css';
import UserRightMenu from "./rightMenu/User";
import UnUserRightMenu from "./rightMenu/UnUser";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";

const Header = observer((props) => {
    const {user} = useContext(Context)

    let loading = props.loadingPageStatus
    const Menu = () => {
        if(loading){
            return <Loader />
        }else if(user.isAuth){
            return <UserRightMenu name={user.user['login']}/>
        }else{
            return <UnUserRightMenu />
        }
    }

    return(
        <header className="p-3 text-bg-dark fixed-top">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h3><b>Справка</b></h3>
                    </Link>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 leftItem">
                        <li><Link to="/faq" className="nav-link px-2 text-white">FAQs</Link></li>
                        {user.user['status'] > 2
                        ? <li><Link to="/me" className="nav-link px-2 text-white">Админка</Link></li>
                        : null
                        }
                    </ul>
                    {Menu()}
                </div>
            </div>
        </header>
    );
})

export default Header;