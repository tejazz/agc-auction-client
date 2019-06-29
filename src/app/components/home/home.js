import React, { Component } from 'react';
import * as local from './home.module.css';
import { fetchAllPlayers, updateCurrentPlayer, updateClubData, fetchLocalPlayerData, updateLocalPlayerData } from '../../actions';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-flexbox-grid';
import Squad from '../../../assets/images/squad.svg';
import Refresh from '../../../assets/images/refresh.svg';
import Fixtures from '../../../assets/images/fixture.svg';
import Auction from '../../../assets/images/auction.svg';
import List from '../../../assets/images/list.svg';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startNextIndex: 1
        }
    }

    componentDidMount() {
        // check if localStorage has club values
        if (!localStorage.getItem("clubs")) {
            this.props.history.push('/teamselect');
            return;
        }

        if (localStorage.getItem("currentIndex")) {
            this.setState({
                startNextIndex: parseInt(localStorage.getItem("currentIndex")) + 1
            });
        }

        let currentBidClub = "";
        (localStorage.getItem("currentIndex")) ?
            this.props.fetchAllPlayers(parseInt(localStorage.getItem("currentIndex")) + 1) :
            this.props.fetchAllPlayers();

        if (!this.props.clubs[0]) {
            this.props.updateClubData({}, JSON.parse(localStorage.getItem("clubs")));
            currentBidClub = JSON.parse(localStorage.getItem("clubs"))[0].club;
        } else {
            currentBidClub = this.props.clubs[0].club;
        }

        this.props.fetchLocalPlayerData(0, currentBidClub);
    }

    valueChange(e, type) {
        if (type === "CurrentPrice") {
            const numPattern = /^[0-9\b]+$/;
            if (e.target.value === '' || numPattern.test(e.target.value)) {
                this.props.updateLocalPlayerData(e.target.value, this.props.localPlayerData.currentBidClub);
            }
        } else if (type === "ClubChange") {
            this.props.updateLocalPlayerData(this.props.localPlayerData.currentPlayerValue, e.target.value);
        }
    }

    updatePlayer(sellType) {
        if (sellType === "sold") {
            let endForce = false;

            this.props.clubs.map((club) => {
                if (club.club === this.props.localPlayerData.currentBidClub) {
                    if (club.clubBudget <= 0 || club.players.length === 20) {
                        alert("Current club is out of the bid");
                        endForce = true;
                    } else if (this.props.localPlayerData.currentPlayerValue > club.clubBudget) {
                        alert("Current club is out of budget");
                        endForce = true;
                    }
                }
            });

            if (endForce) {
                return;
            }

            if (parseInt(this.props.localPlayerData.currentPlayerValue) >= this.props.players.currentPlayer.basePrice) {
                this.props.players.currentPlayer.soldPrice = this.props.localPlayerData.currentPlayerValue;
                this.props.players.currentPlayer.currentClub = this.props.localPlayerData.currentBidClub;
                this.props.players.currentPlayer.active = false;

                this.props.updateClubData(this.props.players.currentPlayer, this.props.clubs);
                localStorage.setItem("clubs", JSON.stringify(this.props.clubs));
            } else {
                alert("Purchase price cannot be less than base price.");
                return;
            }
        } else if (sellType === "pass") {
            this.props.players.currentPlayer.active = false;
            this.props.players.currentPlayer.passPlayer = true;
        }

        this.props.updateCurrentPlayer(this.props.players.currentPlayerIndex, this.state.startNextIndex);
        this.props.fetchLocalPlayerData(this.props.players.currentPlayerIndex, this.props.localPlayerData.currentBidClub);

        localStorage.setItem("currentIndex", this.props.players.currentPlayerIndex);
        
        this.setState({
            startNextIndex: this.state.startNextIndex + 1
        });
    }

    renderParticipantClubs(club) {
        return (
            <Col xs={6} md={6} lg={4} key={club.club} className={local.clubListContainer_item}>
                <div className={local.clubListContainer_item_clubtile}>
                    <img
                        src={club.clubLogo}
                        alt="club-logo"
                        className={local.clubListContainer_item_photo}
                    />
                    <div className={local.clubListContainer_item_data}>
                        <p className={local.clubListContainer_item_datadetail}><b>{(club.club.length > 12) ? club.club.substring(0, 12) + "." : club.club}</b></p>
                        <p className={local.clubListContainer_item_datadetail}>Bgt: <b>{club.clubBudget}</b>FPS</p>
                        <p className={local.clubListContainer_item_datadetail}>Squad: <b>{club.players.length}</b></p>
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
                    alt="player"
                    className={local.nextContainer_item_playerphoto}
                />
                <img
                    src={player.defaultClubPhoto}
                    alt="player"
                    className={local.nextContainer_item_clubphoto}
                />
            </div>
        );
    }

    navigateTo(urlParam) {
        this.props.history.push(`/${urlParam}`);
    }

    render() {
        if (!this.props.players.currentPlayer) {
            return (
                <div>
                    Fetching all the data...
                </div>
            );
        }

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
                <Row className={local.homeMainContainer}>
                    <Col xs={12} lg={5} md={5}>
                        <div className={local.playerContainer}>
                            <h4 className={local.playerContainer_title}>CURRENT PLAYER</h4>
                            <p className={local.playerContainer_subtitle}>Confirm your bid</p>
                            <div className={local.playerContainer_currentPlayer}>
                                <p className={local.playerContainer_currentPlayer_name}>{this.props.players.currentPlayer.name}</p>
                                <div className={local.playerContainer_currentPlayer_image}>
                                    <img
                                        src={this.props.players.currentPlayer.profilePhoto}
                                        alt="player"
                                        className={local.playerContainer_currentPlayer_photo}
                                    />
                                    <img
                                        src={this.props.players.currentPlayer.defaultClubPhoto}
                                        alt="club"
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
                            <br />
                            <button className={local.playerContainer_confirmbtn} onClick={() => this.updatePlayer("sold")}>SELL</button>
                            <button className={local.playerContainer_confirmbtn} onClick={() => this.updatePlayer("pass")} style={{ background: "rgba(220, 20, 60, 0.7" }}>PASS</button>
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
                                {(this.props.clubs.length === 0) ? ("No clubs available") : this.props.clubs.map((club) => this.renderParticipantClubs(club))}
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

export default connect(mapStateToProps, { fetchAllPlayers, updateCurrentPlayer, updateClubData, fetchLocalPlayerData, updateLocalPlayerData })(Home);