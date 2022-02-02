import PropTypes from 'prop-types';

const TextField = ({ value, onChange, type }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
  />
);

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  onChange: () => {},
  type: 'text',
};

export default TextField;
