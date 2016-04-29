import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Link from 'react-router/lib/Link';
import './styles.css';

const defaultHelmet = {
  defaultTitle: '巧思',
  titleTemplate: '%s - 巧思',
  meta: [
    {"charset": "UTF-8"},
    {"http-equiv": "X-UA-Compatible", "content": "IE=edge, chrome=1"},
    {"name": "viewport", "content": "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"},
  ]
};

export default class Application extends Component {
  render() {
    return <div>
      <Helmet {...defaultHelmet} title="首页"/>
      <header>
        <nav>
          <Link to={`/`} activeClassName="active" onlyActiveOnIndex>
            首页
          </Link>
        </nav>
      </header>
      <main>{this.props.children}</main>
    </div>;
  }
}
