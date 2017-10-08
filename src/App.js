import React, { Component } from 'react';
import './App.css';

const Card = function(props) {
  return (
    <div>
      <img width="75px" src={props.avatar_url} alt={props.name}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div> {props.location} </div>
      </div>
    </div>
  );
}
const CardList = function(props) {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
    // <div>
    //   <Card name="prakash" location="norwalk" src="https://avatars1.githubusercontent.com/u/3127498?v=4"/>
    //   <Card name="santhosh" location="norwalk" src="https://avatars2.githubusercontent.com/u/3846977?v=4"/>
    // </div>
  );
}

class Form extends Component {
  state = {
    userName : ""
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${this.state.userName}`)
    .then(res => res.json())
    .then(text => {console.log(text);this.props.onSubmit(text);})
    .catch((err) => console.log(err));
    this.setState( {userName : ""});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Github username" required />
        <button type="submit">Add card</button>
      </form>
    );
  }
}
class App extends Component {
  state = {
    cards : []
  };
  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
};
  render() {
    return (
        <div>
          <Form onSubmit={this.addNewCard}/>
          <CardList cards={this.state.cards}/>
        </div>
    );
  }
}

export default App;
