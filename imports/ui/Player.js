import React from 'react';
import PropTypes from 'prop-types';

import {Players} from './../api/players';

export default class Player extends React.Component {
  render() {
    let { name, score, _id, rank, position } = this.props.player;
    let itemClassName = `item item--position-${rank}`;
    return (
      <div className={itemClassName}>
        <div className="player">
          <div>
            <h3 className="player__name">{name}</h3>
            <p className="player__stats">{position} place - {score} point(s).</p>
          </div>
          <div className="player__actions">
            <button className="button button--round" onClick={() => {
              Players.update(_id, {
                $inc: {
                  score: -1
                }
              });
            }}>-1</button>
            <button className="button button--round" onClick={() => {
              Players.update(_id, {
                $inc: {
                  score: 1
                }
              });
            }}>+1</button>
            <button className="button button--round" onClick={() => Players.remove(_id)}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

Player.PropTypes = {
  player: PropTypes.object.isRequired
}
