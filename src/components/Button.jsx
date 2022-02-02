import PropTypes from 'prop-types';

const Button = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
  >
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  onClick: () => {},
};

export default Button;
