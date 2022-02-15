import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import TextField from '../components/TextField';
import availableUsers from '../constants/availableUsers';
import * as appAction from '../stores/actions/appAction';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    const user = availableUsers.find((e) => e.username === username);

    if (!user || password !== 'a') {
      return;
    }

    dispatch(appAction.setLoggedIn(true));
    dispatch(appAction.setUser(user));
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
export default Login;
