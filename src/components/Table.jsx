import PropTypes from 'prop-types';
import './Table.scss';

const Table = ({ columns, data, selectedIndex, onRowClick }) => (
  <div className="table">
    <table>
      <thead>
        <tr>
          {columns.map((column, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={`th-${i}`}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            // eslint-disable-next-line react/no-array-index-key
            key={`tbody-tr-${rowIndex}`}
            className={selectedIndex === rowIndex ? 'selected' : ''}
            onClick={() => { onRowClick(rowIndex); }}
          >
            {columns.map((column, columnIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={`td-${columnIndex}`}>
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  selectedIndex: PropTypes.number,
  onRowClick: PropTypes.func,
};

Table.defaultProps = {
  columns: [],
  data: [],
  selectedIndex: null,
  onRowClick: () => {},
};

export default Table;
