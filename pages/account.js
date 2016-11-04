import React from 'react'
import posts from '../data/posts'
import { style } from 'next/css'
import * as  _ from 'lodash'
import AuthService from '../utils/AuthService'

export default class extends React.Component {

  componentDidMount() {
    this.auth = new AuthService('_AUTH0_CLIENT_ID_', '_AUTH0_DOMAIN_');
    if (!this.auth.loggedIn()) {
      this.props.url.replaceTo('/')
    }
  }

  render () {
    const item =  _.find(posts, { id: this.props.url.query.id })

    return (
      <div className={style(styles.main)}>
        <script src="https://cdn.auth0.com/js/lock/10.5/lock.min.js"></script>
        <div className={style(styles.header)}>
          <h3> NEXTHRONE - THE REVELATION OF GAME OF THRONES' CHARACTERS </h3>
        </div>
        <div className={style(styles.panel)}>
          <h1 className={style(styles.heading)}>
            Character: { item.codeName }
            <br/>
            <br/>
            Real Name: { item.realName }
            <br/>
            <br/>
            Brief Description:
            <br/>
            <br/>
            <span> { item.story } </span>
          </h1>
        </div>

        <div className={style(styles.singlePhoto)}>
          <img src={ item.display_src} alt={item.realName} width={500} height={500} />
        </div>
      </div>
    )
  }
}


const styles = {
  main: {
    padding: '50px'
  },

  header: {
    font: '15px Monaco',
    textAlign: 'center'
  },

  panel: {
    float: 'right',
    marginRight: '140px',
    width: '300px'
  },

  singlePhoto: {
    border: '1px solid #999',
    width: '500px',
    height: '500px',
    float: 'left'
  },

  heading: {
    font: '15px Monaco'
  }
}