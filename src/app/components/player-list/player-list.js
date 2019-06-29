import React, { Component } from 'react';
import * as local from './player-list.module.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchPlayers, filterPlayers } from '../../actions';
import Squad from '../../../assets/images/squad.svg';
import Refresh from '../../../assets/images/refresh.svg';
import Fixtures from '../../../assets/images/fixture.svg';
import Auction from '../../../assets/images/auction.svg';
import List from '../../../assets/images/list.svg';
import { connect } from 'react-redux';

class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterOption: 'all',
            listPlayers: this.props.listPlayers.slice(0, 1)
        }
    }

    recursiveStrategy() {
        setTimeout(() => {
            let hasMore = this.state.listPlayers.length + 1 < this.props.listPlayers.length;

            this.setState((prev, props) => ({
                listPlayers: props.listPlayers.slice(0, prev.listPlayers.length + 1)
            }));

            if (hasMore)
                this.recursiveStrategy();
        }, 0);
    }

    componentDidMount() {
        this.recursiveStrategy();
        (localStorage.getItem("players")) ? this.props.fetchPlayers(JSON.parse(localStorage.getItem("players"))) : this.props.fetchPlayers();
    }

    navigateTo(urlParam) {
        this.props.history.push(`/${urlParam}`);
    }

    filterList(term) {
        this.setState({
            filterOption: term.toLowerCase()
        });
        this.props.filterPlayers(term);
    }

    renderPlayers(player) {
        return (
            <Col xs={6} lg={2} md={3} style={{ padding: 0 }} key={player.name}>
                <div className={local.playerItem} style={(player.active) ? { opacity: 1 } : { opacity: 0.5 }}>
                    <div className={local.playerData}>
                        <p>{player.name}</p>
                        <p style={{ textTransform: 'uppercase' }}><b>{(!player.currentClub) ? ((!player.defaultClub) ? 'FREE AGENT' : player.defaultClub.substring(0, 14)) : player.currentClub.substring(0, 14)}</b></p>
                        <p>Position: {player.position}</p>
                        <p>Overall: {player.overall}</p>
                        <p>SP: <b>{(player.soldPrice) ? player.soldPrice : 0}</b>FPS</p>
                    </div>
                </div>
            </Col>
        )
    }

    render() {
        return (
            <Grid fluid style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
                <Row className={local.navBar}>
                    <Col xs={12} lg={12} md={12}>
                        <div className={local.mainNavBar}>
                            <img
                                src={Auction}
                                alt="auction"
                                className={local.nav_icon}
                                onClick={() => this.navigateTo('')}
                            />
                            <img
                                src={Refresh}
                                alt="refresh"
                                className={local.nav_icon}
                                onClick={() => this.navigateTo('teamselect')}
                            />
                            <img
                                src={List}
                                alt="list"
                                className={local.nav_icon}
                                onClick={() => this.navigateTo('list')}
                            />
                            <img
                                src={Squad}
                                alt="squad"
                                className={local.nav_icon}
                                onClick={() => this.navigateTo('squad')}
                            />
                            <img
                                src={Fixtures}
                                alt="fixture"
                                className={local.nav_icon}
                            // onClick={() => this.navigateTo('fixture')}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className={local.mainContainer}>
                    <Col xs={12} lg={2} md={2} className={local.sideContainer}>
                        <div className={local.mainContainer_filter}>
                            <button style={(this.state.filterOption === 'all') ? { color: 'white', background: 'cadetblue' } : { color: 'cadetblue', background: 'white' }} className={local.filterBtn} onClick={() => this.filterList('ALL')}>ALL</button>
                            <button style={(this.state.filterOption === 'gk') ? { color: 'white', background: 'cadetblue' } : { color: 'cadetblue', background: 'white' }} className={local.filterBtn} onClick={() => this.filterList('GK')}>GK</button>
                            <button style={(this.state.filterOption === 'def') ? { color: 'white', background: 'cadetblue' } : { color: 'cadetblue', background: 'white' }} className={local.filterBtn} onClick={() => this.filterList('DEF')}>DEF</button>
                            <button style={(this.state.filterOption === 'mid') ? { color: 'white', background: 'cadetblue' } : { color: 'cadetblue', background: 'white' }} className={local.filterBtn} onClick={() => this.filterList('MID')}>MID</button>
                            <button style={(this.state.filterOption === 'att') ? { color: 'white', background: 'cadetblue' } : { color: 'cadetblue', background: 'white' }} className={local.filterBtn} onClick={() => this.filterList('ATT')}>ATT</button>
                        </div>
                    </Col>
                    <Col xs={12} lg={10} md={10} className={local.playerListContainer}>
                        <Row className={local.playerList}>
                            {(this.state.listPlayers.length === 0) ? <div>No players found</div> : this.state.listPlayers.map((player) => this.renderPlayers(player))}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        listPlayers: state.listPlayers
    };
}

export default connect(mapStateToProps, { fetchPlayers, filterPlayers })(PlayerList);