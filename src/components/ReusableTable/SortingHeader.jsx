import React from 'react';
import PropTypes from 'prop-types';

const SortType = {
  ASC: 'asc',
  DESC: 'desc',
};

const SortingHeaderIcon = ({ sortType }) => (
  <div className="icon-container">
    &nbsp;
    {
      // eslint-disable-next-line no-nested-ternary
      !sortType
        ? ''
        : sortType === SortType.ASC
          ? '▲'
          : '▼'
    }
  </div>
);

SortingHeaderIcon.propTypes = {
  sortType: PropTypes.oneOf(Object.values(SortType)),
};

SortingHeaderIcon.defaultProps = {
  sortType: null,
};

const SortingHeader = ({ header, columnId, sortValue, sortType, disabled, hidden, onClick }) => (
  <div
    className="sorting-header"
    onClick={() => {
      if (disabled) {
        return;
      }

      onClick();
    }}
    onKeyDown={() => {}}
    tabIndex={-1}
    role="button"
  >
    {header}
    {
      !hidden && (
        <SortingHeaderIcon
          sortType={columnId === sortValue ? sortType : null}
        />
      )
    }
  </div>
);

SortingHeader.propTypes = {
  header: PropTypes.any.isRequired,
  columnId: PropTypes.string.isRequired,
  sortValue: PropTypes.string,
  sortType: PropTypes.oneOf(Object.values(SortType)),
  disabled: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

SortingHeader.defaultProps = {
  sortValue: null,
  sortType: null,
};

SortingHeader.SortType = SortType;

export default SortingHeader;
