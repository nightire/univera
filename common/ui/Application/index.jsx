import React, {Component} from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.css';

export default class Application extends Component {
  render() {
    return <div className={styles.container}>
      <header>
        <nav className={styles.navigation}>
          <Link to={`/`} activeClassName={styles.active} onlyActiveOnIndex>
            首页
          </Link>
          <Link to={`/people`} activeClassName={styles.active}>
            用户
          </Link>
        </nav>
      </header>
      <main>{this.props.children}</main>
    </div>;
  }
}
