import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ name }) => (
  <div className="avatar">
    {name.split(' ').map((e) => e[0].toUpperCase()).join('')}
  </div>
);

Avatar.propTypes = {
  name: PropTypes.string,
};

Avatar.defaultProps = {
  name: '',
};

export default Avatar;
