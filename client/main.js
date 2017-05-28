import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';
import TitleBar from './../imports/ui/TitleBar';
import AddPlayer from './../imports/ui/AddPlayer';

const renderPlayers = (playersList) => {

  return playersList.map((player) => {
    return (
      <p key={player._id}>
        {player.name} has {player.score} points.
        <button onClick={() => {
          Players.update(player._id, {
            $inc: {
              score: 1
            }
          });
        }}>+</button>
        <button onClick={() => {
          Players.update(player._id, {
            $inc: {
              score: -1
            }
          });
        }}>-</button>
        <button onClick={() => Players.remove(player._id)}>X</button>
      </p>
    );
  });
}

const handleSubmit = (e) => {
  let playerName = e.target.playerName.value;
  e.preventDefault();

  if (playerName) {
    e.target.playerName.value = '';
    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

Meteor.startup(() => {
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let title = 'Score Keep';
    let subtitle = 'Created by Brett East'
    let jsx = (
      <div>
        <TitleBar title={title} subtitle={subtitle}/>
        {renderPlayers(players)}
        <AddPlayer />
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name" />
          <button>Add player</button>
        </form>
      </div>
    );
    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
