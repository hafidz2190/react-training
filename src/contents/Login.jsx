import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TextField from '../components/TextField';
import availableUsers from '../constants/availableUsers';
import './Login.scss';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    const user = availableUsers.find((e) => e.username === username);

    if (!user || password !== 'a') {
      return;
    }

    onLoginSuccess(user);
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
  onLoginSuccess: PropTypes.func,
};

Login.defaultProps = {
  onLoginSuccess: () => {},
};

export default Login;
