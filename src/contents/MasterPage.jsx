import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sidebarItems from '../constants/sidebarItems';
import * as appAction from '../stores/actions/appAction';
import './MasterPage.scss';

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSidebarChange = (index) => {
    dispatch(appAction.setSelectedSidebarIndex(index));
    navigate(sidebarItems[index].route);
  };

  const onLogout = () => {
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
