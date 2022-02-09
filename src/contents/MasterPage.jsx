import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import availableUsers from '../constants/availableUsers';
import sidebarItems from '../constants/sidebarItems';
import { isLoginTokenValid, removeLoginToken } from '../libs/loginToken';
import * as appAction from '../stores/actions/appAction';
import './MasterPage.scss';

const mapStateToProps = (state) => ({
  user: state.appStore.user,
  loggedIn: state.appStore.loggedIn,
  selectedSidebarIndex: state.appStore.selectedSidebarIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(appAction.setUser, dispatch),
  setLoggedIn: bindActionCreators(appAction.setLoggedIn, dispatch),
  setSelectedSidebarIndex: bindActionCreators(appAction.setSelectedSidebarIndex, dispatch),
});

const MasterPage = ({
  user,
  loggedIn,
  selectedSidebarIndex,
  setUser,
  setLoggedIn,
  setSelectedSidebarIndex,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginToken = isLoginTokenValid();

    if (!loginToken) {
      return;
    }

    const tokenUser = availableUsers.find((e) => e.username === loginToken);

    if (!tokenUser) {
      return;
    }

    setUser(tokenUser);
    setLoggedIn(true);

    const sidebarItemTargetIndex = sidebarItems.findIndex((e) => e.route === location.pathname);

    if (sidebarItemTargetIndex < 0) {
      setSelectedSidebarIndex(0);
      navigate(sidebarItems[0].route);

      return;
    }

    setSelectedSidebarIndex(sidebarItemTargetIndex);
    navigate(location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSidebarChange = (index) => {
    setSelectedSidebarIndex(index);
    navigate(sidebarItems[index].route);
  };

  const onLogout = () => {
    removeLoginToken();

    setUser({ username: '', name: '' });
    setLoggedIn(false);

    navigate('/');
  };

  return (
    <div className="master-page">
      {
        !loggedIn ? (
          <Login />
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
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="posts" element={<Posts />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

MasterPage.propTypes = {
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  selectedSidebarIndex: PropTypes.number.isRequired,
  setUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setSelectedSidebarIndex: PropTypes.func.isRequired,
};

MasterPage.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);
