import React from 'react'
import posts from '../data/posts'
import settings from '../data/settings'
import { style } from 'next/css'
import Link from 'next/link'
import AuthService from '../utils/AuthService'

export default class extends React.Component {
  static getInitialProps ({ req, res}) {
    return { posts: posts }
  }

  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    this.auth = new AuthService(settings.clientId, settings.domain);
    this.setState({ loggedIn: this.auth.loggedIn() });
    this.auth.callback = () => {
      this.setState({ loggedIn: this.auth.loggedIn() });
    };
  }

  login() {
    this.auth.login();
  }

  render() {

   const loginButton = this.state.loggedIn ? <div>HELLO</div> : <button onClick={this.login.bind(this)}>Login</button>;

    return (
      <div>
      <div className={style(styles.header)}>
        <script src="http://cdn.auth0.com/js/auth0/9.0.0/auth0.min.js"></script>
        { loginButton }
        <h3> NEXTHRONE - THE REVELATION OF GAME OF THRONES' CHARACTERS </h3>
      </div>
      <table className={style(styles.table)}>
        <thead>
          <tr>
              <th className={style(styles.th)}>Character</th>
              <th className={style(styles.th)}>Real Name</th>
          </tr>
        </thead>
        <tbody>
          {
              this.props.posts.map( (post, i) => (
                  <tr key={i}>
                      <td className={style(styles.td)}>{ post.codeName }</td>
                      <td className={style(styles.td)}>
                        { this.state.loggedIn ? <Link href={`/account?id=${post.id}`}>{ post.realName }</Link> : <div>You need to login</div> }
                      </td>
                  </tr>
              ))
          }
       </tbody>
      </table>
      </div>
    )
  }
}

const styles = {
  th: {
    background: '#00cccc',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '12px',
    padding: '12px 35px',
  },

  header: {
    font: '15px Monaco',
    textAlign: 'center'
  },

  table: {
    fontFamily: 'Arial',
    margin: '25px auto',
    borderCollapse: 'collapse',
    border: '1px solid #eee',
    borderBottom: '2px solid #00cccc'
  },

  td: {
    color: '#999',
    border: '1px solid #eee',
    padding: '12px 35px',
    borderCollapse: 'collapse'
  },

  list: {
    padding: '50px',
    textAlign: 'center'
  },

  photo: {
    display: 'inline-block'
  },

  photoLink: {
    color: '#333',
    verticalAlign: 'middle',
    cursor: 'pointer',
    background: '#eee',
    display: 'inline-block',
    width: '250px',
    height: '250px',
    lineHeight: '250px',
    margin: '10px',
    border: '2px solid transparent',
    ':hover': {
      borderColor: 'blue'
    }
  }
}
