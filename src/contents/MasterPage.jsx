import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

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

    dispatch(appAction.setUser(tokenUser));
    dispatch(appAction.setLoggedIn(true));

    const sidebarItemTargetIndex = sidebarItems.findIndex((e) => e.route === location.pathname);

    if (sidebarItemTargetIndex < 0) {
      dispatch(appAction.setSelectedSidebarIndex(0));
      navigate(sidebarItems[0].route);

      return;
    }

    dispatch(appAction.setSelectedSidebarIndex(sidebarItemTargetIndex));
    navigate(location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSidebarChange = (index) => {
    dispatch(appAction.setSelectedSidebarIndex(index));
    navigate(sidebarItems[index].route);
  };

  const onLogout = () => {
    removeLoginToken();

    dispatch(appAction.setUser({ username: '', name: '' }));
    dispatch(appAction.setLoggedIn(false));

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

export default MasterPage;
