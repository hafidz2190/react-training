import { useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sidebarItems from '../constants/sidebarItems';
import './MasterPage.scss';

const MasterPage = () => {
  const [user, setUser] = useState({ username: '', name: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedSidebarIndex, setSelectedSidebarIndex] = useState(0);

  const onSidebarChange = (index) => {
    setSelectedSidebarIndex(index);
  };

  const onLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setLoggedIn(true);
  };

  const onLogout = () => {
    setUser({ username: '', name: '' });
    setLoggedIn(false);
  };

  return (
    <div className="master-page">
      {
        !loggedIn ? (
          <Login onLoginSuccess={onLoginSuccess} />
        ) : (
          <>
            <Sidebar
              items={sidebarItems.map((e) => e.label)}
              onChange={onSidebarChange}
              selectedIndex={selectedSidebarIndex}
            />
            <div className="main-content-wrapper">
              <Header
                title={sidebarItems[selectedSidebarIndex].label}
                name={user.name}
                onLogout={onLogout}
              />
              <div className="main-content">
                {selectedSidebarIndex === 0 && <Dashboard user={user} />}
                {selectedSidebarIndex === 1 && <Posts />}
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

MasterPage.propTypes = {
};

MasterPage.defaultProps = {
};

export default MasterPage;
