import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import Login from './Login';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import * as sidebarIndexEnum from '../constants/sidebarIndexEnum';
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
  const sidebarItems = ['Dashboard', 'Posts'];

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
