import React from 'react';
import {Link, BrowserRouter, Route, Redirect} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {Schedule} from "./schedule";
import {Roster} from "./roster";
import '../../scss/index.scss';

const routes = [
    {path: '/schedule', name: 'Schedule', Component: Schedule},
    {path: '/roster', name: 'Roster', Component: Roster}            
];

const App = () => {
        return (
            <BrowserRouter>
                <Navigation />
                <Main />
            </BrowserRouter>
        )
};

const Navigation = () => {
        return (
            <Navbar variant={'dark'} bg={'dark'} fixed={'top'}>
                <Container className={'w-25'}>
                    <Navbar.Brand>
                        <img
                            id={'menu-logo'}
                            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan' +
                            '_Wolverines_logo.svg/2000px-Michigan_Wolverines_logo.svg.png'}
                            alt={'mich'}
                        />
                    </Navbar.Brand>
                    {routes.map(({path, name}) => (
                        <Nav.Item className={''}>
                            <Nav.Link as={Link} to={path}>
                                {name}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Container>
            </Navbar>
        )
};

const Main = () => {
        return (
            <div id={'component-div'}>
                {routes.map(({path, Component}) => (
                    <Route key={path} path={path}>
                        {({match}) => (
                            <CSSTransition
                                in={match != null}
                                timeout={500}
                                classNames={'route-transition'}
                                unmountOnExit
                            >
                                <div className={'route-transition'}>
                                    <Component />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
                <Redirect to={'/schedule'} />
            </div>
        )
};

export default App;
