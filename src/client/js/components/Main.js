import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {routes} from '../routes';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: [],
            schedule: [],
            playerStats: undefined,
            roster: []
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
            let standingsRes = await fetch('http://localhost:8080/fetch/standings');
            let standings = await standingsRes.json();

            let playerStatsRes = await fetch('http://localhost:8080/fetch/player-stats');
            let playerStats = await playerStatsRes.json();


            let scheduleRes = await fetch('http://localhost:8080/fetch/schedule');
            let schedule = await scheduleRes.json();



            let rosterRes = await fetch('http://localhost:8080/fetch/roster');
            let roster = await rosterRes.json();



            this.setState({
                standings,
                playerStats,
                schedule,
                roster
            });

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