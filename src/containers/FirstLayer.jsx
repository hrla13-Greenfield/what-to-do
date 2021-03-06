import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice } from '../actions/index.jsx';

//this component renders the initial state and onClick the respective second FirstLayer
//firstLoad is the action payload that is being updated after the first click on any of the initial state items
class FirstLayer extends React.Component {
  renderChoices() {
    return this.props.choices.firstLoad.map((choice, idx) => (
      <div key={idx} className="col-md-4 col-sm-6 col-xs-12">
        <div className="space" />
        <h2>{choice.title}</h2>
        <img
          className="allPics"
          key={choice.img}
          /* {//the below function renders the views for the two layers as well as the final suggestion}*/
          onClick={() => this.props.selectChoice(
            choice.option, this.props.choices.updatedZipcode,
            this.props.userdata.userID, this.props.userdata.username)}
          src={choice.img}
          style={{ borderRadius: 5, tintColor: '#0000CD' }}
        />
        <div className="space" /></div>
      ));
  }

  render() {
    return (
      <div>
        <div className="spaceSmall" />
        <h1 className="headings">Click what you feel like</h1>
        <h4 className="headingsW">Goats will help you make a decision</h4>
        <div>
          { this.renderChoices() }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
    userdata: state.userdata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChoice }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstLayer);
