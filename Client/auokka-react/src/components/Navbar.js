import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__item">
                <Link className="navbar__link" to="/contribution">
                    <i className="navbar__icon fas fa-circle-notch" />
                    <span className="navbar__content">Contribution</span>
                </Link>
            </div>
            <div className="navbar__item">
                <Link className="navbar__link" to="/course">
                    <i className="navbar__icon fas fa-circle-notch" />
                    <span className="navbar__content">Course</span>
                </Link>
            </div>
        </div>
    )
};

export default Navbar;