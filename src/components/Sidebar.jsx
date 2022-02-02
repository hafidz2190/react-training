import PropTypes from 'prop-types';
import './Sidebar.scss';

const Sidebar = ({ items, onChange, selectedIndex }) => (
  <div className="sidebar">
    {items.map((e, i) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={`sidebar-item-${i}`}
        className={`sidebar-item${selectedIndex === i ? ' selected' : ''}`}
        onClick={() => { onChange(i); }}
        onKeyDown={() => { onChange(i); }}
        role="button"
        tabIndex={-1}
      >
        {e}
      </div>
    ))}
  </div>
);

Sidebar.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
};

Sidebar.defaultProps = {
  items: [],
  onChange: () => {},
  selectedIndex: null,
};

export default Sidebar;
