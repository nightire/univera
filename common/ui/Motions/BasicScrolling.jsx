import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArsenalTeam} from '../Motions/action';
import {Link} from 'react-router';
import styles from './styles.css';

const mapStateToProps = (state) => ({arsenal: state.arsenal});

export class Motion extends Component {
  static fetchData() {
    return fetchArsenalTeam();
  }

  componentDidMount() {
    this.props.fetchArsenalTeam();

    this.controller = new ScrollMagic.Controller({container: this.wrapper});
    this.scene = new ScrollMagic.Scene({offset: 100});

    this.scene.addTo(this.controller)
      .addIndicators({name: 'A', parent: this.refs.content})
      .setVelocity(this.refs.logo, {rotateZ: '180deg'}, {easing: [300, 30]});
  }

  componentWillUnmount() {
    this.scene.removeIndicators();
  }

  render() {
    const {arsenal} = this.props;
    const link = {pathname: `/motions`, state: {enter: 'Left', leave: 'Right'}};

    return <content className={styles.motion} ref={node => this.wrapper = node}>
      <div ref="content">
        <header>
          <Link className={styles.back} to={link}>返回</Link>
          <h3>{arsenal.name} - ({arsenal.code})</h3>
          <figure>
            <img src={arsenal.crestUrl} alt={arsenal.shortName}/>
            <img ref="logo" src={arsenal.crestUrl} alt={arsenal.shortName}/>
            <img src={arsenal.crestUrl} alt={arsenal.shortName}/>
            <figcaption>{arsenal.squadMarketValue}</figcaption>
          </figure>
        </header>
      </div>
    </content>;
  }
}

export default connect(mapStateToProps, {fetchArsenalTeam})(Motion);
