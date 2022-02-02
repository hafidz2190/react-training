import PropTypes from 'prop-types';
import Avatar from './Avatar';

const Header = ({ title, name }) => (
  <div className="header">
    {title}
    <Avatar name={name} />
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  name: '',
};

export default Header;
