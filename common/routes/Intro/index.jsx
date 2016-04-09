import React, {Component} from 'react';
import styles from './styles.css';

export default class Intro extends Component {
  render() {
    return <main>
      <section className={styles['full-cover']}>
        <article>
          <header>
            <h1>Leica Deals Survey</h1>
          </header>

          <content>
            <p>Dear Leica fan,</p>
            <p>Thanks for helping us to improve Leica Deals!  We have 14
              questions, the survey shouldn't take more than 5 minutes to
              answer.</p>
            <p>Thanks in advance!</p>
            <p>Andreas</p>

            <button type="button">Start</button>
          </content>
        </article>
      </section>
    </main>;
  }
}
