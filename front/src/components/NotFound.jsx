import React from "react";

function NotFound(){
    return(
        <div className="d-flex h-100 text-center pt-5">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
              <main className="px-3">
                <h1>404</h1>
                <p className="lead">Запрашиваемая вами страница не найдена!</p>
                <p className="lead">
                  <a href="/" className="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark">На главную</a>
                </p>
              </main>
            </div>
        </div>
    );
}

export default NotFound;