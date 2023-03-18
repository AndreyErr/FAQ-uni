import React from "react";
import '../../../styles/header.css';

function UserRightMenu(){
    return(
        <div className="dropdown text-end">
            <a href="/profile" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"></img>
            </a>
            <ul className="dropdown-menu text-small">
                <li><a className="dropdown-item" href="!#">New project...</a></li>
                <li><a className="dropdown-item" href="!#">Settings</a></li>
                <li><a className="dropdown-item" href="!#">Profile</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="!#">Sign out</a></li>
            </ul>
        </div>
    );
}

export default UserRightMenu;