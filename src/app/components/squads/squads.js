import React, { Component } from 'react';
import * as local from './squads.module.css';
import { connect } from 'react-redux';
import { fetchAllClubs, fetchAllPlayers } from '../../actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Squads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentClubIndex: 0
        };
    }

    componentDidMount() {
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

    render() {
        console.log(this.props);

        return (
            <Grid fluid style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
                <Row className={local.navBar}>
                    <Col xs={12} md={12} lg={12}>
                    </Col>
                </Row>
                <Row className={local.squadMainContainer}>
                    <Col lg={3} md={3} xs={3}>
                        <div className={local.clubContainer}>
                            {(this.props.clubs.length === 0) ? "No clubs available" : this.props.clubs.map((club, index) => this.renderClubList(club, index))}
                        </div>
                    </Col>
                    <Col lg={9} md={9} xs={9}>
                        <div className={local.playerThumbnail_Container}>
                            {(this.props.clubs.length === 0) ? "No clubs available" :
                                <p className={local.playerThumbnail_clubname}>{this.props.clubs[this.state.currentClubIndex].club}
                                    <p className={local.playerThumbnail_clubdata}>CLUB BUDGET: {this.props.clubs[this.state.currentClubIndex].clubBudget} FPS</p>
                                    <p className={local.playerThumbnail_clubdata}>SQUAD SIZE: {this.props.clubs[this.state.currentClubIndex].players.length}</p>
                                </p>}

                            {(this.props.clubs.length === 0) ? "No clubs available" :
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

export default connect(mapStateToProps, { fetchAllClubs, fetchAllPlayers })(Squads);