import React, { Component } from 'react';
import * as local from './home.module.css';
import { fetchAllClubs, fetchAllPlayers, updateCurrentPlayer, updateClubData, fetchLocalPlayerData, updateLocalPlayerData } from '../../actions';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-flexbox-grid';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startNextIndex: 1
        }
    }

    componentDidMount() {
        this.props.fetchAllClubs();
        this.props.fetchAllPlayers();
        this.props.fetchLocalPlayerData(0);
    }

    valueChange(e, type) {
        if (type === "CurrentPrice") {
            this.props.updateLocalPlayerData(e.target.value, this.props.localPlayerData.currentBidClub);
        } else if (type === "ClubChange") {
            this.props.updateLocalPlayerData(this.props.localPlayerData.currentPlayerValue, e.target.value);
        }
    }

    updatePlayer() {
        if (parseInt(this.props.localPlayerData.currentPlayerValue) >= this.props.players.currentPlayer.basePrice) {
            this.props.players.currentPlayer.soldPrice = this.props.localPlayerData.currentPlayerValue;
            this.props.players.currentPlayer.currentClub = this.props.localPlayerData.currentBidClub;

            this.props.updateClubData(this.props.players.currentPlayer, this.props.clubs);
        } else {
            alert("Sold price cannot be less than base price.");
            return;
        }

        this.props.updateCurrentPlayer(this.props.players.currentPlayerIndex, this.state.startNextIndex);
        this.props.fetchLocalPlayerData(this.props.players.currentPlayerIndex);

        this.setState({
            startNextIndex: this.state.startNextIndex + 1
        });
    }

    renderParticipantClubs(club) {
        return (
            <Col xs={12} md={6} lg={4} key={club.club} className={local.clubListContainer_item}>
                <div className={local.clubListContainer_item_clubtile}>
                    <img
                        src={club.clubLogo}
                        alt="club-logo"
                        className={local.clubListContainer_item_photo}
                    />
                    <div className={local.clubListContainer_item_data}>
                        <p className={local.clubListContainer_item_datadetail}><b>{club.club}</b></p>
                        <p className={local.clubListContainer_item_datadetail}>BUDGET: <b>{club.clubBudget}</b> FPS</p>
                        <p className={local.clubListContainer_item_datadetail}>PLAYERS LEFT: <b>{20 - club.players.length}</b></p>
                    </div>
                </div>
            </Col>
        );
    }

    renderNextlist(player) {
        return (
            <div key={player.name} className={local.nextContainer_item}>
                <img
                    src={player.profilePhoto}
                    alt="player-image"
                    className={local.nextContainer_item_playerphoto}
                />
                <img
                    src={player.defaultClubPhoto}
                    alt="player-image"
                    className={local.nextContainer_item_clubphoto}
                />
            </div>
        );
    }

    render() {
        if (!this.props.players || !this.props.clubs[0]) {
            return (
                <div>
                    Fetching all the data...
                </div>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} lg={12} md={12}>
                        <h3 className={local.mainHeader}>AGC AUCTION CENTRAL</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={5} md={5}>
                        <div className={local.playerContainer}>
                            <h4 className={local.playerContainer_title}>CURRENT PLAYER</h4>
                            <p className={local.playerContainer_subtitle}>Confirm your bid</p>
                            <div className={local.playerContainer_currentPlayer}>
                                <p className={local.playerContainer_currentPlayer_name}>{this.props.players.currentPlayer.name}</p>
                                <div className={local.playerContainer_currentPlayer_image}>
                                    <img
                                        src={this.props.players.currentPlayer.profilePhoto}
                                        alt="player-photo"
                                        className={local.playerContainer_currentPlayer_photo}
                                    />
                                    <img
                                        src={this.props.players.currentPlayer.defaultClubPhoto}
                                        alt="club-photo"
                                        className={local.playerContainer_currentPlayer_club}
                                    />
                                </div>
                                <div className={local.playerContainer_currentPlayer_data}>
                                    <p><b>{this.props.players.currentPlayer.overall}XP {this.props.players.currentPlayer.position}</b></p>
                                </div>
                            </div>
                            <input className={local.playerContainer_bidInput} type="text" onChange={(e) => this.valueChange(e, "CurrentPrice")} value={this.props.localPlayerData.currentPlayerValue} />
                            <select className={local.playerContainer_clubSelect} onChange={(e) => this.valueChange(e, "ClubChange")}>
                                {this.props.clubs.map((club) => {
                                    return (<option key={club.club} value={club.club}>{club.club}</option>)
                                })}
                            </select>
                            <button className={local.playerContainer_confirmbtn} onClick={() => this.updatePlayer()}>SELL</button>
                        </div>
                        <div>
                            <Row className={local.nextContainer}>
                                {this.props.players.nextPlayers.map((player) => this.renderNextlist(player))}
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} lg={7} md={7}>
                        <div className={local.clubContainer}>
                            <Row className={local.clubListContainer}>
                                {this.props.clubs.map((club) => this.renderParticipantClubs(club))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Grid >
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
        clubs: state.clubs,
        localPlayerData: state.localPlayerData
    };
}

export default connect(mapStateToProps, { fetchAllClubs, fetchAllPlayers, updateCurrentPlayer, updateClubData, fetchLocalPlayerData, updateLocalPlayerData })(Home);