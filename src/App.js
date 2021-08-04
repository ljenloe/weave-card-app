import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import testUtils from 'react-dom/test-utils';
import CARDS from './cards/collection.js';
let deal = require('./sounds/dealcards.mp3').default;
let flip = require('./sounds/flipcard.mp3').default;

//let myDeck = deck.slice();
//import deck from './cards';

class Card extends React.Component{

  constructor(props) {

    
    super(props);
    this.state = {

      value: props.value,

    };

  }

  zoom(){

    //alert("Hovered on" + this.props.value);

  }

  smaller(){

    alert("When did this happen");

  }

  render() {

    return(

        <img src={CARDS[this.props.value]} onMouseEnter={this.zoom.bind(this)} className="zoom"/>

    );

  }

}

class Table extends React.Component{

  constructor(props){

    super(props);
    this.state={
      played: []
    }

  }


  renderCard(name){

    return <Card value={name} key={name} />;

  }

  render() {

    let playedTable = this.props.played;
    let renderedTable = [];

    for(let i=0; i<playedTable.length; i++){

      renderedTable[i] = this.renderCard(playedTable[i]);

    }
    console.log(renderedTable);
    return(

      <div id="table">

        {renderedTable}

      </div>

    );


  }

}


class App extends React.Component{
  
  constructor(props){

    super(props);
    this.state = {
      deck: [],
      played: [],
      drawAllVisible: true
    }
    let count = 0;
    //Creates local deck
    for(let i in CARDS){

        this.state.deck[count] = i;
        count++;

    }

    //Binding methods
    this.draw = this.draw.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.drawAll = this.drawAll.bind(this);

  }

  

  //Draw a new card
  draw(){

  
    const currentDeck = this.state.deck;
    if(currentDeck.length==0){
      alert("Deck is empty!");
    }
    else{
    let cardFlip = document.getElementById("oneCard");
    cardFlip.play();

    const drawnCard = Math.floor(Math.random() * currentDeck.length);
    console.log("Drew a card");
    let newCard = currentDeck[drawnCard];
    //remove card just drawn from deck
    console.log(currentDeck[drawnCard]);
    currentDeck.splice(drawnCard, 1);
    console.log(currentDeck);
    let myTable = this.state.played;
    myTable[myTable.length] = newCard;
    this.setState(
      {
        deck: currentDeck,
        played: myTable
      }
    );
    }
  
  }

  drawAll(){

    console.log("All shall be drawn");
    let cardFlip = document.getElementById("multipleCards");
    cardFlip.play();
    while(this.state.deck.length>0){

      this.draw();

    }
    this.setState({

      drawAllVisible: false

    });


  }

  shuffle(){

    window.location.reload(false);

  }

  render(){
    let back = require('./cards/back.jpg').default;
    let currentTable = this.state.played;
    let drawVisible = this.state.drawAllVisible;
    let drawAllStyle;
    if(drawVisible){

      drawAllStyle = {

        visibility: "visible",

      }

    }
    else{

      drawAllStyle = {

        visibility: "hidden",

      }

    }
    return (
    <div className="App">
       <audio id="oneCard">
        <source src={flip} type="audio/mpeg" />
      </audio>

    <audio id="multipleCards">
        <source src={deal} type="audio/mpeg" />
      </audio>
      <h1>Weave Card Deck
      <br />
      <br />
      <img src={back} alt="back" onClick={this.draw}/>
      </h1>
      <h2>Click deck to draw a card!</h2>
      <Table 
        played = {currentTable}
        />
        <br />
        <button onClick={this.shuffle}>Shuffle Deck</button>
        <br />
        <button onClick={this.drawAll} style={drawAllStyle}>Draw All</button>
    </div>
  );
    }
}

export default App;
