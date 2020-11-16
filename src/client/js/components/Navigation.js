import michLogo from "../../img/logo.png";
import {Link} from "react-router-dom";
import React from "react";

import routes from '../routes';

const Navigation = () => {
    return (
        <header>


            <img
                id='menu-logo'
                src={michLogo}
                alt='Michigan Block M'
            />


            <nav>
                {
                    routes.map(({path, name}) =>
                        <button key={path}>
                            <Link to={path}>
                                {name}
                            </Link>
                        </button>

                    )
                }
            </nav>

        </header>
    )
};

export default Navigation;