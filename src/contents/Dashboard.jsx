import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  user: state.appStore.user,
});

const Dashboard = ({ user }) => (
  <div>
    Hello,&nbsp;
    <b>{user.name}</b>
    !
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

Dashboard.defaultProps = {
};

export default connect(mapStateToProps, null)(Dashboard);
