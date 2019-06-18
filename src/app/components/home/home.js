import React, { Component } from 'react';
import * as local from './home.module.css';
import { fetchAllClubs, fetchAllPlayers } from '../../actions';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-flexbox-grid';
import PlayerData from '../../../mock-data/players.json';
import ClubData from '../../../mock-data/clubs.json';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayerIndex: 0,
            nextPlayers: PlayerData.slice(0, 5),
            currentPlayer: PlayerData[0],
            currentPlayerValue: PlayerData[0].basePrice,
            currentBidClub: ClubData[0].club,
            participatingClubs: ClubData.splice(0, 20)
        };
    }

    componentDidMount() {
    }

    valueChange(e, type) {
        if (type === "CurrentPrice") {
            this.setState({
                currentPlayerValue: e.target.value
            });
        } else if (type === "ClubChange") {
            this.setState({
                currentBidClub: e.target.value
            });
        }
    }

    updatePlayer() {
        if (this.state.currentPlayerValue >= this.state.currentPlayer.basePrice) {
            PlayerData[this.state.currentPlayerIndex].soldPrice = this.state.currentPlayerValue;
            PlayerData[this.state.currentPlayerIndex].currentClub = this.state.currentBidClub;

            let participantClubsCopy = this.state.participatingClubs;

            participantClubsCopy.map((club) => {
                if (club.club === this.state.currentBidClub) {
                    console.log(club);
                    club.clubBudget -= this.state.currentPlayerValue;
                    club.players.push(this.state.currentPlayer);
                }
            });

            console.log(participantClubsCopy);

            this.setState({
                participatingClubs: participantClubsCopy
            });

        } else {
            alert("Sold price cannot be less than base price.");
            return;
        }

        this.setState({
            currentPlayerIndex: this.state.currentPlayerIndex + 1,
            nextPlayers: PlayerData.slice(this.state.currentPlayerIndex + 1, this.state.currentPlayerIndex + 6),
            currentPlayer: PlayerData[this.state.currentPlayerIndex + 1],
            currentPlayerValue: PlayerData[this.state.currentPlayerIndex + 1].basePrice
        });
    }

    renderParticipantClubs(club) {
        return (
            <div>
                <div>
                    Club: {club.club}
                </div>
                <div>
                    Budget: {club.clubBudget}
                </div>
            </div>
        );
    }

    render() {
        console.log(this.state);
        console.log(PlayerData);

        if (!this.props.players) {
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
                        Player Section
                        <input type="text" onChange={(e) => this.valueChange(e, "CurrentPrice")} value={this.state.currentPlayerValue} />
                        <select onChange={(e) => this.valueChange(e, "ClubChange")}>
                            {this.state.participatingClubs.map((club) => {
                                return (<option value={club.club}>{club.club}</option>)
                            })}
                        </select>
                        <button onClick={() => this.updatePlayer()}>Update Player</button>
                    </Col>
                    <Col xs={12} lg={6} md={6}>
                        Club Section
                        {this.state.participatingClubs.map((club) => this.renderParticipantClubs(club))}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
        clubs: state.clubs
    };
}

export default connect(mapStateToProps, { fetchAllClubs, fetchAllPlayers })(Home);