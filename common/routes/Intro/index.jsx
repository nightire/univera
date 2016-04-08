import React, {Component} from 'react';
import Radium, {Style} from 'radium';
import {globalStyles} from '../../styles';
import styles from './styles';

class Intro extends Component {
  render() {
    return <main>
      <Style rules={globalStyles}/>

      <section className="full-cover">
        <Style scopeSelector=".full-cover" rules={styles}/>

        <article>
          <header>
            <h1>Leica Deals Survey</h1>
          </header>

          <content>
            <p>Dear Leica fan,</p>
            <p>thanks for helping us to improve Leica Deals!
              We have 14 questions, the survey shouldn't take more than 5 minutes
              to answer.</p>
            <p>Thanks in advance!</p>
            <p>Andreas</p>

            <button type="button">Start</button>
          </content>
        </article>
      </section>
    </main>;
  }
}

export default Radium(Intro);
