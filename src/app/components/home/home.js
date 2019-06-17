import React, { Component } from 'react';
import * as local from './home.module.css';
import { fetchAllClubs, fetchAllPlayers } from '../../actions';
import { connect } from 'react-redux';
import { Row, Grid, Col } from 'react-flexbox-grid';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllClubs();
        this.props.fetchAllPlayers();
    }

    render() {
        console.log(this.props);

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
                        {/* <div>{this.props.players[0].name}</div> */}
                    </Col>
                    <Col xs={12} lg={6} md={6}>
                        Club Section
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