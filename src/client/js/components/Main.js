import {getRoutes} from '../routes';

export const getMain = async () => {
    try {
        const {default: React} = await import('react');
        const {Redirect, Route} = await import('react-router-dom');
        const routes = await getRoutes();


        return class Main extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    standings: [],
                    schedule: [],
                    stats: [],
                    roster: []
                };
                this.sortStats = this.sortStats.bind(this);
            }

            sortStats(statName) {
                this.setState({
                    stats: this.state.stats.sort((a, b) => {
                        if (statName === 'Name' || statName === 'Position') {
                            return a[statName.toLowerCase()].localeCompare(b[statName.toLowerCase()]);
                        } else {
                            return b.data[statName] - a.data[statName];
                        }
                    })
                });
            }

            componentDidMount() {
                fetch('http://localhost:8080/fetch/standings')
                    .then(res => res.json())
                    .then(standings => this.setState({standings}))
                    .catch(e => console.error(e));

                fetch('http://localhost:8080/fetch/stats')
                    .then(res => res.json())
                    .then(stats => this.setState({stats}))
                    .catch(e => console.error(e));

                fetch('http://localhost:8080/fetch/schedule')
                    .then(res => res.json())
                    .then(schedule => this.setState({schedule}))
                    .catch(e => console.error(e));

                fetch('http://localhost:8080/fetch/roster')
                    .then(res => res.json())
                    .then(roster => this.setState({roster}))
                    .catch(e => console.error(e));

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

    } catch(e) {
        console.error(e);
    }
};