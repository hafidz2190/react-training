import PropTypes from 'prop-types';

const Dashboard = ({ user }) => (
  <div>
    Hello,&nbsp;
    <b>{user.name}</b>
    !
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object,
};

Dashboard.defaultProps = {
  user: { username: '', name: '' },
};

export default Dashboard;
