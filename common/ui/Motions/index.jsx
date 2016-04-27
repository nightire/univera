import React, {Component} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styles from './styles.css';


export default class Motions extends Component {
  componentDidMount() {
    this.controller = new ScrollMagic.Controller({
      addIndicators: true
    });

    new ScrollMagic.Scene().addTo(this.controller);
  }

  render() {
    /**
     * NOTE: the OR condition is only for SSR bootup process, because on
     * server-side there's only a basic location object can be use which
     * doesn't maintain inner state object.
     */
    const {enter, leave} = this.props.location.state || {
      enter: 'Right', leave: 'Left'
    };

    return <VelocityTransitionGroup
      runOnMount
      component="section"
      className={styles.motions}
      enter={{animation: `transition.slide${enter}BigIn`, duration: 300}}
      leave={{animation: `transition.slide${leave}BigOut`, duration: 300}}
    >
      {React.cloneElement(this.props.children, {key: this.props.location.key})}
    </VelocityTransitionGroup>;
  }
}
