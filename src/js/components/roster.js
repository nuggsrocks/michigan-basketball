import React from "react";
import {Carousel, Button, Card, Accordion, Table} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import {players} from '../../data/data';
import {findPerGame, findFieldGoalPercentage, findPer40Mins, findMedian} from '../stats-functions';

// sorting constants
const GAMES = 'games';
const NAME = 'name';
const NUMBER = 'number';
const POSITION = 'position';
const YEAR = 'year';
const PPG = 'ppg';
const RPG = 'rpg';
const APG = 'apg;';
const FGS = 'fgs';
const POINTS = 'points';
const REBOUNDS = 'rebounds';
const ASSISTS = 'assists';
const FGM = 'fgm';
const FGA = 'fga';
const MPG = 'mpg';
const FGMPERGAME = 'FGMPERGAME';
const FGAPERGAME = 'FGAPERGAME';
const PP40 = 'pp40';
const RP40 = 'rp40';
const AP40 = 'ap40';
const FGMP40 = 'fgm40';
const FGAP40 = 'fga40';
const MINUTES = 'minutes';
const MEDIAN_PTS = 'median_pts';
const MEDIAN_REBS = 'median_rebs';
const MEDIAN_ASTS = 'median_asts';
const MEDIAN_FGM = 'median_fgm';
const MEDIAN_FGA = 'median_fga';
const yearSorting = {
    'Freshman': 1,
    'Sophomore': 2,
    'Junior': 3,
    'Senior': 4
};

const playerArr = [...players];

const UpperComponent = (props) => {
    return (
        <div className={props.className}>
            <Route exact path={'/roster'}>
                <div className={'text-center'}>
                    <h3>Coaching Staff</h3>
                    <Table size={'lg'} bordered>
                        <tr>
                            <th>Head Coach</th>
                            <td>Juwan Howard</td>
                        </tr>
                        <tr>
                            <th>Associate Head Coach</th>
                            <td>Phil Martelli</td>
                        </tr>
                        <tr>
                            <th>Assistant Coach</th>
                            <td>Saddi Washington</td>
                        </tr>
                        <tr>
                            <th>Assistant Coach</th>
                            <td>Howard Eisley</td>
                        </tr>
                        <tr>
                            <th>Strength & Conditioning</th>
                            <td>Jon Sanderson</td>
                        </tr>
                    </Table>
                </div>
            </Route>
            {playerArr.map(({name, path, pics}, key) =>
                <Route exact path={path} key={key + 1} className={`player-div ${key + 1}`}>
                    <Carousel id={'carousel'}>
                        {pics.map((img) =>
                            <Carousel.Item>
                                <img
                                    className={'d-block w-100'}
                                    src={img}
                                    alt={name}
                                />
                            </Carousel.Item>
                        )}
                    </Carousel>
                </Route>
            )}
        </div>
    )
};

const LowerComponent = (props) => {
    if (props.sortType === POINTS) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.points - a.points))
    }
    if (props.sortType === REBOUNDS) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.rebounds - a.rebounds))
    }
    if (props.sortType === ASSISTS) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.assists - a.assists))
    }
    if (props.sortType === FGM) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.fgm - a.fgm))
    }
    if (props.sortType === FGA) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.fga - a.fga))
    }
    if (props.sortType === MINUTES) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => b.mins - a.mins))
    }
    if (props.sortType === GAMES) {
        playerArr.forEach((obj) => obj.stats.sort((a, b) => a.opp[1] - b.opp[1]))
    }

    // sorting stats
    if (props.sortType === NAME) {
        playerArr.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (props.sortType === NUMBER) {
        playerArr.sort((a, b) => a.num - b.num);
    }
    if (props.sortType === POSITION) {
        playerArr.sort((a, b) => a.pos.localeCompare(b.pos));
    }
    if (props.sortType === YEAR) {
        playerArr.sort((a, b) => yearSorting[a.year] - yearSorting[b.year]);
    }
    if (props.sortType === PPG) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({points}) => points)) - findPerGame(a.stats.map(({points}) => points))
        )
    }
    if (props.sortType === RPG) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({rebounds}) => rebounds)) - findPerGame(a.stats.map(({rebounds}) => rebounds))
        );
    }
    if (props.sortType === APG) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({assists}) => assists)) - findPerGame(a.stats.map(({assists}) => assists))
        );
    }
    if (props.sortType === FGS) {
        playerArr.sort((a, b) =>
            findFieldGoalPercentage(b.stats.map(({fgm}) => fgm), b.stats.map(({fga}) => fga)) -
            findFieldGoalPercentage(a.stats.map(({fgm}) => fgm), a.stats.map(({fga}) => fga))
        );
    }
    if (props.sortType === FGMPERGAME) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({fgm}) => fgm)) - findPerGame(a.stats.map(({fgm}) => fgm))
        )
    }
    if (props.sortType === FGAPERGAME) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({fga}) => fga)) - findPerGame(a.stats.map(({fga}) => fga))
        )
    }
    if (props.sortType === MPG) {
        playerArr.sort((a, b) =>
            findPerGame(b.stats.map(({mins}) => mins)) - findPerGame(a.stats.map(({mins}) => mins))
        );
    }
    if (props.sortType === PP40) {
        playerArr.sort((a, b) =>
            findPer40Mins(b.stats.map(({points}) => points), b.stats.map(({mins}) => mins)) -
            findPer40Mins(a.stats.map(({points}) => points), a.stats.map(({mins}) => mins))
        )
    }
    if (props.sortType === RP40) {
        playerArr.sort((a, b) =>
            findPer40Mins(b.stats.map(({rebounds}) => rebounds), b.stats.map(({mins}) => mins)) -
            findPer40Mins(a.stats.map(({rebounds}) => rebounds), a.stats.map(({mins}) => mins))
        )
    }
    if (props.sortType === AP40) {
        playerArr.sort((a, b) =>
            findPer40Mins(b.stats.map(({assists}) => assists), b.stats.map(({mins}) => mins)) -
            findPer40Mins(a.stats.map(({assists}) => assists), a.stats.map(({mins}) => mins))
        )
    }
    if (props.sortType === FGMP40) {
        playerArr.sort((a, b) =>
            findPer40Mins(b.stats.map(({fgm}) => fgm), b.stats.map(({mins}) => mins)) -
            findPer40Mins(a.stats.map(({fgm}) => fgm), a.stats.map(({mins}) => mins))
        )
    }
    if (props.sortType === FGAP40) {
        playerArr.sort((a, b) =>
            findPer40Mins(b.stats.map(({fga}) => fga), b.stats.map(({mins}) => mins)) -
            findPer40Mins(a.stats.map(({fga}) => fga), a.stats.map(({mins}) => mins))
        )
    }
    if (props.sortType === MEDIAN_PTS) {
        playerArr.sort((a, b) =>
            findMedian(b.stats.map(({points}) => points)) - findMedian(a.stats.map(({points}) => points))
        );
    }
    if (props.sortType === MEDIAN_REBS) {
        playerArr.sort((a, b) =>
            findMedian(b.stats.map(({rebounds}) => rebounds)) - findMedian(a.stats.map(({rebounds}) => rebounds))
        )
    }
    if (props.sortType === MEDIAN_ASTS) {
        playerArr.sort((a, b) =>
            findMedian(b.stats.map(({assists}) => assists)) - findMedian(a.stats.map(({assists}) => assists))
        )
    }
    if (props.sortType === MEDIAN_FGM) {
        playerArr.sort((a, b) =>
            findMedian(b.stats.map(({fgm}) => fgm)) - findMedian(a.stats.map(({fgm}) => fgm))
        )
    }
    if (props.sortType === MEDIAN_FGA) {
        playerArr.sort((a, b) =>
            findMedian(b.stats.map(({fga}) => fga)) - findMedian(a.stats.map(({fga}) => fga))
        )
    }

    return (
        <div className={props.className}>
            <Route exact path={'/roster'}>
                <div className={'text-center'}>
                    <Accordion defaultActiveKey={'0'} as={Card} bg={'black'}>
                        <Accordion.Toggle eventKey={'0'} as={Button} variant={'secondary'} className={'clickable'}>
                            Per Game
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={'0'}>
                            <Card.Body>
                                <h3>Roster</h3>
                                <Table size={'md'} bordered>
                                    <thead>
                                    <tr>
                                        <th className={'clickable'} onClick={props.sortByName}>Name</th>
                                        <th className={'clickable'} onClick={props.sortByNumber}>Number</th>
                                        <th className={'clickable'} onClick={props.sortByPos}>Position</th>
                                        <th className={'clickable'} onClick={props.sortByYear}>Class</th>
                                        <th className={'clickable'} onClick={props.sortByPpg}>PPG</th>
                                        <th className={'clickable'} onClick={props.sortByRpg}>RPG</th>
                                        <th className={'clickable'} onClick={props.sortByApg}>APG</th>
                                        <th className={'clickable'} onClick={props.sortByFgPer}>FG%</th>
                                        <th className={'clickable'} onClick={props.sortByFgmPerGame}>FGM/G</th>
                                        <th className={'clickable'} onClick={props.sortByFgaPerGame}>FGA/G</th>
                                        <th className={'clickable'} onClick={props.sortByMpg}>MPG</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {playerArr.map(({name, num, pos, year,
                                                        path, injured, stats}, index) => (
                                        <tr>
                                            <th>
                                                <Link to={path}>
                                                    {name}
                                                    {Object.values(playerArr[index]).indexOf(injured) !== -1 ?
                                                        <span>
                                            &nbsp;&nbsp;
                                                            <span className={'fas fa-briefcase-medical text-danger'} title={'Injured'}/>
                                        </span> : ''}
                                                </Link>
                                            </th>
                                            <td>#{num}</td>
                                            <td>{pos}</td>
                                            <td>{year}</td>
                                            <td>
                                                {findPerGame(stats.map(({points}) => points))}
                                            </td>
                                            <td>
                                                {findPerGame(stats.map(({rebounds}) => rebounds))}
                                            </td>
                                            <td>
                                                {findPerGame(stats.map(({assists}) => assists))}
                                            </td>
                                            <td>
                                                {findFieldGoalPercentage(stats.map(({fgm}) => fgm), stats.map(({fga}) => fga))}
                                            </td>
                                            <td>
                                                {findPerGame(stats.map(({fgm}) => fgm))}
                                            </td>
                                            <td>
                                                {findPerGame(stats.map(({fga}) => fga))}
                                            </td>
                                            <td>
                                                {findPerGame(stats.map(({mins}) => mins))}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>

                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle eventKey={'1'} as={Button} variant={'secondary'} className={'clickable'}>
                            Per 40 Mins
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={'1'}>
                            <Card.Body>
                                <h3>Roster</h3>
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th className={'clickable'} onClick={props.sortByName}>Name</th>
                                        <th className={'clickable'} onClick={props.sortByNumber}>Number</th>
                                        <th className={'clickable'} onClick={props.sortByPos}>Position</th>
                                        <th className={'clickable'} onClick={props.sortByYear}>Class</th>
                                        <th className={'clickable'} onClick={props.sortByPP40}>Points/40Mins</th>
                                        <th className={'clickable'} onClick={props.sortByRP40}>Rebs/40Mins</th>
                                        <th className={'clickable'} onClick={props.sortByAP40}>Assists/40Mins</th>
                                        <th className={'clickable'} onClick={props.sortByFGM40}>FGM/40Mins</th>
                                        <th className={'clickable'} onClick={props.sortByFGA40}>FGA/40Mins</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {playerArr.map(({name, num, pos, year,
                                                        path, injured, stats}, index) => (
                                        <tr>
                                            <th>
                                                <Link to={path}>
                                                    {name}
                                                    {(Object.values(playerArr[index]).indexOf(injured) !== -1 ?
                                                        <span>&nbsp;&nbsp;<span className={'fas fa-briefcase-medical text-danger'} title={'Injured'}/></span> : '')}
                                                </Link>
                                            </th>
                                            <td>#{num}</td>
                                            <td>{pos}</td>
                                            <td>{year}</td>
                                            <td>
                                                {findPer40Mins(stats.map(({points}) => points), stats.map(({mins}) => mins))}
                                            </td>
                                            <td>
                                                {findPer40Mins(stats.map(({rebounds}) => rebounds), stats.map(({mins}) => mins))}
                                            </td>
                                            <td>
                                                {findPer40Mins(stats.map(({assists}) => assists), stats.map(({mins}) => mins))}
                                            </td>
                                            <td>
                                                {findPer40Mins(stats.map(({fgm}) => fgm), stats.map(({mins}) => mins))}
                                            </td>
                                            <td>
                                                {findPer40Mins(stats.map(({fga}) => fga), stats.map(({mins}) => mins))}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle eventKey={'2'} as={Button} variant={'secondary'} className={'clickable'}>
                            Median Stats
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={'2'}>
                            <Card.Body>
                                <h3>Roster</h3>
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th className={'clickable'} onClick={props.sortByName}>Name</th>
                                        <th className={'clickable'} onClick={props.sortByNumber}>Number</th>
                                        <th className={'clickable'} onClick={props.sortByPos}>Position</th>
                                        <th className={'clickable'} onClick={props.sortByYear}>Class</th>
                                        <th className={'clickable'} onClick={props.sortByMedianPts}>Median Points</th>
                                        <th className={'clickable'} onClick={props.sortByMedianRebs}>Median Rebs</th>
                                        <th className={'clickable'} onClick={props.sortByMedianAsts}>Median Assists</th>
                                        <th className={'clickable'} onClick={props.sortByMedianFgm}>Median FGM</th>
                                        <th className={'clickable'} onClick={props.sortByMedianFga}>Median FGA</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {playerArr.map(({name, num, pos, year,
                                                        path, injured, stats}, index) =>
                                        <tr>
                                            <th>
                                                <Link to={path}>
                                                    {name}
                                                    {(Object.values(playerArr[index]).indexOf(injured) !== -1 ?
                                                        <span>&nbsp;&nbsp;<span className={'fas fa-briefcase-medical text-danger'} title={'Injured'}/></span> : '')}
                                                </Link>
                                            </th>
                                            <td>#{num}</td>
                                            <td>{pos}</td>
                                            <td>{year}</td>
                                            <td>
                                                {findMedian(stats.map(({points}) => points))}
                                            </td>
                                            <td>
                                                {findMedian(stats.map(({rebounds}) => rebounds))}
                                            </td>
                                            <td>
                                                {findMedian(stats.map(({assists}) => assists))}
                                            </td>
                                            <td>
                                                {findMedian(stats.map(({fgm}) => fgm))}
                                            </td>
                                            <td>
                                                {findMedian(stats.map(({fga}) => fga))}
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>

                </div>
            </Route>
            {playerArr.map(({name, path, stats}) =>
                <Route exact path={path}>
                    <div className={'p-3'}>
                        <Button as={Link} to={'/roster'} onClick={props.sortByGames}>Back</Button>
                        <h4>{name}</h4>
                        <Table size={'md'} bordered>
                            <thead>
                            <tr>
                                <th className={'clickable'} onClick={props.sortByGames}>Game</th>
                                <th>Opponent</th>
                                <th className={'clickable'} onClick={props.sortByPoints}>Points</th>
                                <th className={'clickable'} onClick={props.sortByRebounds}>Rebounds</th>
                                <th className={'clickable'} onClick={props.sortByAssists}>Assists</th>
                                <th className={'clickable'} onClick={props.sortByFgsMade}>FGM</th>
                                <th className={'clickable'} onClick={props.sortByFgsAttempted}>FGA</th>
                                <th className={'clickable'} onClick={props.sortByMins}>MINUTES</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stats.map(({opp, points, rebounds, assists, fgm, fga, mins}) =>
                                <tr>
                                    <td>{opp[1]}</td>
                                    <td>{opp[0]}</td>
                                    <td>{points}</td>
                                    <td>{rebounds}</td>
                                    <td>{assists}</td>
                                    <td>{fgm}</td>
                                    <td>{fga}</td>
                                    <td>{mins}</td>
                                </tr>
                            )}
                            <tr>
                                <td className={'empty'} />
                                <th>Total</th>
                                <td>{stats.map(({points}) => points).reduce((a, b) => a + b)}</td>
                                <td>{stats.map(({rebounds}) => rebounds).reduce((a, b) => a + b)}</td>
                                <td>{stats.map(({assists}) => assists).reduce((a, b) => a + b)}</td>
                                <td>{stats.map(({fgm}) => fgm).reduce((a, b) => a + b)}</td>
                                <td>{stats.map(({fga}) => fga).reduce((a, b) => a + b)}</td>
                                <td>{stats.map(({mins}) => mins).reduce((a, b) => a + b)}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Route>
            )}
        </div>
    )
};

export class Roster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: GAMES
        };
        this.sortStats = this.sortStats.bind(this);
    }

    sortStats(sortType) {
        this.setState({
            sortType: sortType
        })
    }

    render() {
        return (
            <div className={'grid-container roster'}>
                <UpperComponent className={'grid-item roster'}/>
                <LowerComponent
                    className={'grid-item roster'} sortByName={() => this.sortStats(NAME)}
                    sortByNumber={() => this.sortStats(NUMBER)} sortByPos={() => this.sortStats(POSITION)}
                    sortByYear={() => this.sortStats(YEAR)} sortByPpg={() => this.sortStats(PPG)}
                    sortByRpg={() => this.sortStats(RPG)} sortByApg={() => this.sortStats(APG)}
                    sortByFgPer={() => this.sortStats(FGS)} sortByMpg={() => this.sortStats(MPG)}
                    sortByPP40={() => this.sortStats(PP40)} sortByRP40={() => this.sortStats(RP40)}
                    sortByAP40={() => this.sortStats(AP40)} sortByFGM40={() => this.sortStats(FGMP40)}
                    sortByFGA40={() => this.sortStats(FGAP40)} sortByGames={() => this.sortStats(GAMES)}
                    sortByPoints={() => this.sortStats(POINTS)} sortByRebounds={() => this.sortStats(REBOUNDS)}
                    sortByAssists={() => this.sortStats(ASSISTS)} sortByFgsMade={() => this.sortStats(FGM)}
                    sortByFgsAttempted={() => this.sortStats(FGA)} sortByMins={() => this.sortStats(MINUTES)}
                    sortByMedianPts={() => this.sortStats(MEDIAN_PTS)} sortByMedianRebs={() => this.sortStats(MEDIAN_REBS)}
                    sortByMedianAsts={() => this.sortStats(MEDIAN_ASTS)} sortByMedianFgm={() => this.sortStats(MEDIAN_FGM)}
                    sortByMedianFga={() => this.sortStats(MEDIAN_FGA)} sortType={this.state.sortType}
                    sortByFgmPerGame={() => this.sortStats(FGMPERGAME)} sortByFgaPerGame={() => this.sortStats(FGAPERGAME)}
                />
            </div>
        )
    }
}

