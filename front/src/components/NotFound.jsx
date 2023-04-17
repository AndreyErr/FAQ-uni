import React from "react";
import { Link } from "react-router-dom";
import Loader from "./ui/Loader";

function NotFound(props){

  let loading = props.loadingPageStatus
  return(
      <div className="d-flex h-100 text-center pt-5">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main className="px-3">
            {loading 
            ? <Loader />
            :
              <div>
                <h1>404</h1>
                <p className="lead">Запрашиваемая вами страница не найдена!</p>
                <p className="lead">
                  <Link to="/" className="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark">На главную</Link>
                </p>
              </div>
            }
          </main>
        </div>
      </div>
  );
}

export default NotFound;