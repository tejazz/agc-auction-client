import React, { Component } from 'react';
import * as local from './squads.module.css';
import { connect } from 'react-redux';
import { fetchAllPlayers, updateClubData } from '../../actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Fixtures from '../../../assets/images/fixture.svg';
import Squad from '../../../assets/images/squad.svg';
import Refresh from '../../../assets/images/refresh.svg';
import Auction from '../../../assets/images/auction.svg';
import List from '../../../assets/images/list.svg';

class Squads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentClubIndex: 0
        };
    }

    componentDidMount() {
        // check if localStorage has club values
        if (!localStorage.getItem("clubs")) {
            this.props.history.push('/teamselect');
            return;
        }

        if (!this.props.clubs[0]) {
            this.props.updateClubData({}, JSON.parse(localStorage.getItem("clubs")));
        }
        this.props.fetchAllPlayers();
    }

    renderClubList(club, index) {
        return (
            <div
                className={local.clubContainer_item}
                onClick={() => {
                    this.setState({
                        currentClubIndex: index
                    });
                }}
                style={(this.state.currentClubIndex === index) ? { background: "white", width: "100%" } : { background: "rgba(255, 255, 255, 0.7)", width: "95%" }}
            >
                <img
                    src={club.clubLogo}
                    alt="club"
                    className={local.clubContainer_item_image}
                />
                <p className={local.clubContainer_item_name}>{club.club}</p>
            </div>
        );
    }

    renderPlayer(player) {
        return (
            <Col xs={6} lg={2} md={2}>
                <div className={local.playerThumbnail}>
                    <img
                        src={player.profilePhoto}
                        alt="player-profile"
                        className={local.playerThumbnail_image}
                    />
                    <p className={local.playerThumbnail_overall}>{player.overall}</p>
                    <span className={`${local.playerThumbnail_overall} ${local.playerThumbnail_position}`}>{player.position}</span>
                    <div className={local.playerThumbnail_datasection}>
                        <p className={local.playerThumbnail_data}>{player.name}</p>
                        <p className={local.playerThumbnail_data}>Price: <b>{player.soldPrice} FPS</b></p>
                    </div>
                </div>
            </Col>
        );
    }

    navigateTo(urlParam) {
        this.props.history.push(`/${urlParam}`);
    }

    render() {
        console.log('%c Squads', 'color: red');
        console.log(this.props);
        console.log(this.state);

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
                <Row className={local.squadMainContainer}>
                    <Col lg={3} md={3} xs={3}>
                        <div className={local.clubContainer}>
                            {(this.props.clubs.length === 0) ? null : this.props.clubs.map((club, index) => this.renderClubList(club, index))}
                        </div>
                    </Col>
                    <Col lg={9} md={9} xs={9}>
                        <div className={local.playerThumbnail_Container}>
                            {(this.props.clubs.length === 0) ? null :
                                <div>
                                    <p className={local.playerThumbnail_clubname}>{this.props.clubs[this.state.currentClubIndex].club}</p>
                                    <p className={local.playerThumbnail_clubdata}>CLUB BUDGET: {this.props.clubs[this.state.currentClubIndex].clubBudget} FPS</p>
                                    <p className={local.playerThumbnail_clubdata}>SQUAD SIZE: {this.props.clubs[this.state.currentClubIndex].players.length}</p>
                                </div>}

                            {(this.props.clubs.length === 0) ?
                                <p className={local.nosquadMessage}>No squads available</p> :
                                <Row>
                                    {this.props.clubs[this.state.currentClubIndex].players.map((player) => this.renderPlayer(player))}
                                </Row>}
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        clubs: state.clubs
    };
}

export default connect(mapStateToProps, { fetchAllPlayers, updateClubData })(Squads);