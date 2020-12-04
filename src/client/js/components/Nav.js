import React from 'react';
import {routes} from '../routes';
import {Link} from 'react-router-dom';
import michLogo from '../../img/logo.png';

export class Nav extends React.Component {
    render() {
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
                                    {name.toUpperCase()}
                                </Link>
                            </button>

                        )
                    }
                </nav>

            </header>
        )
    }
}