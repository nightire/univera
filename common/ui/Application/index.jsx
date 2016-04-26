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
          <Link to={{
              pathname: `/motions`,
              state: {enter: 'Right', leave: 'Left'}
            }}
            activeClassName={styles.active}
          >
            动效
          </Link>
        </nav>
      </header>
      <main>{this.props.children}</main>
    </div>;
  }
}
