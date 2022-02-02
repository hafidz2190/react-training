import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TextField from '../components/TextField';
import * as appAction from '../stores/actions/appAction';
import './Login.scss';

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(appAction.setUser, dispatch),
  setLoggedIn: bindActionCreators(appAction.setLoggedIn, dispatch),
});

const Login = ({ setUser, setLoggedIn }) => {
  const availableUsers = [
    { username: 'user1', name: 'John Doe' },
    { username: 'user2', name: 'Bruce Wayne' },
    { username: 'user3', name: 'Muhammad Ali' },
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    const user = availableUsers.find((e) => e.username === username);

    if (!user || password !== 'a') {
      return;
    }

    setLoggedIn(true);
    setUser(user);
  };

  return (
    <div className="login-form">
      <h3>Login Form</h3>
      <h4>Username</h4>
      <TextField
        type="text"
        value={username}
        onChange={(e) => { setUsername(e.target.value); }}
      />
      <h4>Password</h4>
      <TextField
        type="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); }}
      />
      <br />
      <Button
        label="Login"
        onClick={loginHandler}
      />
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

Login.defaultProps = {
};

export default connect(null, mapDispatchToProps)(Login);
