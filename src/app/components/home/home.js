import React, { Component } from 'react';
import * as local from './home.module.css';
import { fetchAllClubs, fetchAllPlayers, updateCurrentPlayer, updateClubData, fetchLocalPlayerData, updateLocalPlayerData } from '../../actions';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-flexbox-grid';

class Home extends Component {
    constructor(props) {
        super(props);
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

        this.props.updateCurrentPlayer(this.props.players.currentPlayerIndex);
        this.props.fetchLocalPlayerData(this.props.players.currentPlayerIndex);
    }

    renderParticipantClubs(club) {
        return (
            <Col xs={6} md={6} lg={6} key={club.club} className={local.clubListContainer_item}>
                <div>
                    Club: {club.club}
                </div>
                <div>
                    Budget: {club.clubBudget}
                </div>
            </Col>
        );
    }

    renderNextlist(player) {
        return (
            <div key={player.name} className={local.nextContainer_item}>
                {player.name}
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
                    <Col xs={12} lg={6} md={6}>
                        <div className={local.playerContainer}>
                            Player Section
                            <input type="text" onChange={(e) => this.valueChange(e, "CurrentPrice")} value={this.props.localPlayerData.currentPlayerValue} />
                            <select onChange={(e) => this.valueChange(e, "ClubChange")}>
                                {this.props.clubs.map((club) => {
                                    return (<option key={club.club} value={club.club}>{club.club}</option>)
                                })}
                            </select>
                            <button onClick={() => this.updatePlayer()}>Update Player</button>
                            <Row className={local.nextContainer}>
                                {this.props.players.nextPlayers.map((player) => this.renderNextlist(player))}
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} lg={6} md={6}>
                        <div className={local.clubContainer}>
                            Club Section
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