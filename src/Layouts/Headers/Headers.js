import React, {useState} from "react";
import Profile from "./Profile";
import SearchForm from "./SearchForm";
import './Header.scss';


export default function Headers() {

  return (
    <header className={"header"}>
      <div className="row">
        <div className="col-1 d-flex align-items-center">
          <div className="d-flex header__navigation">
            <i className="fa-solid fa-arrow-left me-2"></i>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="col-9">
          <SearchForm />
        </div>

        <div className="col-2 d-flex justify-content-end">
          <Profile />
        </div>
      </div>
    </header>
  );
}
