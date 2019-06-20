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
        this.props.fetchAllClubs();
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
        );
    }

    render() {
        console.log(this.state);

        if (Object.entries(this.props.clubs).length === 0) {
            return (
                <div>
                    Fetching all data...
                </div>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    <Col lg={3} md={3} xs={3}>
                        <div className={local.clubContainer}>
                            {this.props.clubs.map((club, index) => this.renderClubList(club, index))}
                        </div>
                    </Col>
                    <Col lg={9} md={9} xs={9}>
                        <div className={local.playerThumbnail_Container}>
                            <h4 className={local.playerThumbnail_clubname}>{this.props.clubs[this.state.currentClubIndex].club}</h4>
                            <p className={local.playerThumbnail_clubdata}>CLUB BUDGET: {this.props.clubs[this.state.currentClubIndex].clubBudget} FPS</p>
                            <p className={local.playerThumbnail_clubdata}>SQUAD SIZE: {this.props.clubs[this.state.currentClubIndex].players.length}</p>

                            {this.props.clubs[this.state.currentClubIndex].players.map((player) => this.renderPlayer(player))}
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