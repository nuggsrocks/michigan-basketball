import michLogo from '../../img/logo.png';
import {getRoutes} from '../routes';

export const getNav = async () => {
    try {
        const {default: React} = await import('react');
        const {Link} = await import('react-router-dom');
        const routes = await getRoutes();

        return class Nav extends React.Component {
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
        };
    } catch(e) {
        console.error(e);
    }
};