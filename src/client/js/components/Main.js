import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {routes} from '../routes';



export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: null,
            schedule: null,
            playerStats: null,
            roster: null,
            teamStats: null
        };
        this.sortStats = this.sortStats.bind(this);
    }

    sortStats(statName) {
        this.setState({
            playerStats: this.state.playerStats.sort((a, b) => {
                if (statName === 'Name' || statName === 'Position') {
                    return a[statName.toLowerCase()].localeCompare(b[statName.toLowerCase()]);
                } else {
                    return b.data[statName] - a.data[statName];
                }
            })
        });
    }

    async componentDidMount() {
        try {
            const {default: axios} = await import('axios');

            let keys = Object.keys(this.state);

            let requests = keys.map(key => {
                let url = 'https://' + this.props.host + '/fetch/' + key;

                return axios.get(url);
            });

            let responses = await Promise.all(requests);

            let state = {};

            keys.forEach((key, i) => {
                state[key] = responses[i].data;
            })

            this.setState(state);

        } catch(e) {
            console.error(e);
        }
    }

    render () {
        return (
            <main>

                {
                    routes.map(({path, Component}) =>
                        <Route key={path} path={path}>
                            <Component data={this.state} sortStats={this.sortStats}/>
                        </Route>
                    )
                }
                <Route exact path='/'>
                    <Redirect to='/schedule'/>
                </Route>


            </main>
        )
    }
}