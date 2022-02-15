import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import * as sidebarIndexEnum from '../constants/sidebarIndexEnum';
import * as appAction from '../stores/actions/appAction';
import './MasterPage.scss';

const MasterPage = () => {
  const { user, loggedIn, selectedSidebarIndex } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  const sidebarItems = ['Dashboard', 'Posts'];

  const onSidebarChange = (index) => {
    dispatch(appAction.setSelectedSidebarIndex(index));
  };

  const onLogout = () => {
    dispatch(appAction.setUser({ username: '', name: '' }));
    dispatch(appAction.setLoggedIn(false));
  };

  return (
    <div className="master-page">
      {
        !loggedIn ? (
          <Login />
        ) : (
          <>
            <Sidebar
              items={sidebarItems}
              onChange={onSidebarChange}
              selectedIndex={selectedSidebarIndex}
            />
            <div className="main-content-wrapper">
              <Header
                title={sidebarItems[selectedSidebarIndex]}
                name={user.name}
                onLogout={onLogout}
              />
              <div className="main-content">
                {selectedSidebarIndex === sidebarIndexEnum.DASHBOARD && <Dashboard />}
                {selectedSidebarIndex === sidebarIndexEnum.POSTS && <Posts />}
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default MasterPage;
