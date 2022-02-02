import PropTypes from 'prop-types';
import Avatar from './Avatar';

const Header = ({ title, name, onLogout }) => (
  <div className="header">
    {title}
    <div className="avatar-wrapper">
      <div
        className="logout-button"
        onClick={onLogout}
        onKeyDown={onLogout}
        role="button"
        tabIndex={-1}
      >
        Logout
      </div>
      &nbsp;
      <Avatar name={name} />
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  onLogout: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  name: '',
  onLogout: () => {},
};

export default Header;
