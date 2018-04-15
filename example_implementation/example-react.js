import React, { Component } from 'react';

import styles from './example-react.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChangeRoute = this.handleChangeRoute.bind(this);
  }

  handleChangeRoute(e) {
    e.preventDefault();

    this.props.onchangeRoute("/other");
  }

  componentDidMount() {
    var small = this.refs.imageHolderSmall;
    small.classList.add(styles.loaded)

    var placeholder = this.refs.imageHolder;     
    
    // load large image
    var imgLarge = new Image();
    imgLarge.src = placeholder.dataset.large; 
    imgLarge.onload = function () {
      // timeout to simulate more of a load
      // NB: READ-LIFE YOU WOULD REMOVE THE TIMEOUT!
      setTimeout(function () {imgLarge.classList.add(styles.loaded)}, 1500);
    };

    placeholder.appendChild(imgLarge);
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Blurred Image React Example.</h1>
        </div>
        <div ref="imageHolder" className={styles.placeholder} data-large="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg">
          <img ref="imageHolderSmall" className={styles.imgSmall} src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABEDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUCBAb/xAAlEAABAwMCBgMAAAAAAAAAAAABAgMEAAURBhIHFiExVZMUI2H/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EAB0RAAICAQUAAAAAAAAAAAAAAAECABMDESFhoeH/2gAMAwEAAhEDEQA/AN5xP1zebDeGoGk4EWa62wXpLTrBJQkDO4K3AEYxkd6dQ+IFuZ0dDu9yWy4+4VNuojjaN6M7ykK64AGcd+1PpyvjyLI0yhsIlH7soSSvIGckjNXjbID0hyK7BirjtIS4hBaThKiVAkdPwUs6gDQd+RCbxXzbpnzNv9ooqfIOlPAW/wBQoqrMXMitp//Z" />
          <div className={styles.padded}></div>
        </div>
      </div>
    );
  }
};