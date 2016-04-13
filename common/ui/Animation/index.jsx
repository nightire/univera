import React, {Component} from 'react';
import connect from 'react-redux/lib/components/connect';
import {bindActionCreators} from 'redux';
import {increase} from 'common/reducers/counter';
import styles from './styles.css';

export class Animation extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  triggerAnimation(event) {
    Velocity(event.currentTarget, 'transition.bounceIn')
      .then(button => Velocity(button, 'callout.flash'))
      .then(button => Velocity(button, 'callout.tada'));
    this.props.actions.increase(1);
  }

  render() {
    return <ul className={styles.animations}>
      <li>
        <button type="button" onClick={::this.triggerAnimation}>
          Bounce Me
        </button>
      </li>
    </ul>;
  }
}

export default connect(
  function(store) { return store.counter },
  dispatch =>({dispatch, actions: bindActionCreators({increase}, dispatch)})
)(Animation);
