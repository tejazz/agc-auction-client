import React, { Component } from 'react';
import * as local from './team-selection.module.css';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { fetchAllClubs, updateClubData, fetchAllPlayers, searchClubs } from '../../actions';
import SelectTick from '../../../assets/images/checked.svg';
import Shield from '../../../assets/images/shield.svg';

class TeamSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamsSelected: false,
            selectedClubs: []
        };

        localStorage.clear();
    }

    componentDidMount() {
        this.props.fetchAllClubs("all", []);
        this.props.fetchAllPlayers(0, true);
    }

    getSearchValue(e) {
        this.props.searchClubs(e.target.value);
    }

    singleClubClicked(club, keyIndex) {
        let exists = false;
        this.props.clubs[keyIndex].selected = !this.props.clubs[keyIndex].selected;

        this.state.selectedClubs.map((clubItem, index) => {
            if (clubItem.club === club.club) {
                exists = true;

                let copyArr = this.state.selectedClubs;
                copyArr.splice(index, 1);

                this.setState({
                    selectedClubs: copyArr
                });
            }
        });

        if (!exists) {
            let copyArr = this.state.selectedClubs;
            copyArr.push(club);

            this.setState({
                selectedClubs: copyArr
            });
        }
    }

    renderClubSelect(club, index) {
        return (
            <div className={local.searchContainer_listitem} onClick={() => this.singleClubClicked(club, index)} key={index}>
                <img
                    src={club.clubLogo}
                    alt="logo"
                    className={local.searchContainer_listitem_logo}
                />
                <p className={local.searchContainer_listitem_name}>{club.club}</p>
                <img
                    src={SelectTick}
                    alt="select-tick"
                    className={local.searchContainer_listitem_tick}
                    style={(club.selected) ? { visibility: "visible" } : { visibility: "hidden" }}
                />
            </div>
        );
    }

    renderSelectedClubs(club) {

        return (
            <Col xs={6} lg={4} md={4} className={local.selectedContainer_clublist_main} key={club.name}>
                <div className={local.selectedContainer_clublist_item}>
                    <img
                        src={club.clubLogo}
                        alt="logo"
                        className={local.item_image}
                    />
                    <p className={local.item_name}>{(club.club.length > 12) ? club.club.substring(0, 12) + "." : club.club}</p>
                </div>
            </Col>
        );
    }

    confirmClubs() {
        // store the clubs obtained in local storage
        localStorage.setItem("clubs", JSON.stringify(this.state.selectedClubs));

        this.props.fetchAllClubs("", this.state.selectedClubs);

        this.props.history.push('/');
    }

    render() {
        return (
            <Grid fluid style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
                <Row className={local.mainContainer}>
                    <Col xs={12} md={6} lg={6} className={local.searchContainer}>
                        <div>
                            <div className={local.searchContainer_info}>
                                <h3>AGC Auction Central</h3>
                                <p>Decide which clubs compete in your tournament.<br />Search and select clubs you want to participate. Select/deselect based on your choice.</p>
                            </div>

                            <input
                                type="text"
                                className={local.searchContainer_search}
                                onChange={(e) => this.getSearchValue(e)}
                                placeholder="Search club..."
                            />
                            <div className={local.searchContainer_clublist}>
                                {(this.props.clubs.length === 0) ? <p className={local.searchNotFoundText}>No clubs match the criteria</p> : this.props.clubs.map((club, index) => this.renderClubSelect(club, index))}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={6} className={local.selectedDivision}>
                        <div className={local.selectedContainer}>
                            <div className={local.selectedContainer_info}>
                                <h3>Selected Clubs</h3>
                                <p>The clubs selected can be found below</p>
                            </div>

                            <Row className={local.selectedContainer_clublist}>
                                {(this.state.selectedClubs.length === 0) ?
                                    (<Col xs={6} lg={4} md={4} className={local.selectedContainer_clublist_main}>
                                        <div className={local.selectedContainer_clublist_item}>
                                            <img
                                                src={Shield}
                                                style={{ opacity: 0.5 }}
                                                alt="logo"
                                                className={local.item_image}
                                            />
                                            <p className={local.item_name}>Chosen Club</p>
                                        </div>
                                    </Col>)
                                    : this.state.selectedClubs.map((club) => this.renderSelectedClubs(club))}
                            </Row>

                            <button
                                style={
                                    (this.state.selectedClubs.length >= 4) ?
                                        { opacity: 1 } :
                                        { opacity: 0.5 }
                                }
                                onClick={
                                    (this.state.selectedClubs.length >= 4) ?
                                        () => this.confirmClubs() :
                                        null
                                }
                                className={local.selectedContainer_confirmbtn}
                            >
                                CONFIRM
                            </button>
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

export default connect(mapStateToProps, { fetchAllClubs, updateClubData, fetchAllPlayers, searchClubs })(TeamSelection);