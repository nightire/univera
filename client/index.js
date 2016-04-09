import React from 'react';
import ReactDOM from 'react-dom';
import {Intro} from '../common/routes';

module.hot && module.hot.accept();

const rootElement = document.getElementById('react-root');

ReactDOM.render(<Intro/>, rootElement);
