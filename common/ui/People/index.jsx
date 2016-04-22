import React, {Component} from 'react';
import connect from 'react-redux/lib/components/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import actions from './actions';
import * as API from './api';
import styles from './styles.css';

const endpoint = `https://api.github.com/users`;

export class People extends Component {
  constructor() {
    super();
    this.state = {
      multiple: false,
      limited: null,
      selected: null,
    };
  }

  static fetchData() {
    return actions.listPeople(API.searchPeople(endpoint));
  }

  componentDidMount() {
    this.props.actions.listPeople(API.searchPeople(endpoint));
    Velocity.animate(this.list.querySelectorAll('li'),
                     'transition.expandIn',
                     {display: null, stagger: 80});
  }

  whenOptionClick(event) {
    const target = event.target;

    this.setState({
      selected: (target.className != styles.current) ? target.dataset.id : null
    });

    Velocity.animate(target,
                     'transition.flipYIn',
                     {display: null, duration: 300});
  }

  render() {
    const selectedClassName = this.state.selected ? ` ${styles.selected}` : '';
    return <ul
      ref={element => this.list = element}
      className={`${styles.people + selectedClassName}`}>
      {this.renderPeopleList(this.props.people, this.state.selected)}
    </ul>;
  }

  renderPeopleList(people, selected) {
    return people && people.map(person => <li
      key={person.id}
      data-id={person.id}
      onClick={::this.whenOptionClick}
      className={person.id == selected ? styles.current : null}
    >
      <span>{person.login}</span>
    </li>);
  }
}

export default connect(
  state => ({people: state.people.slice(0, 10)}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(People);
