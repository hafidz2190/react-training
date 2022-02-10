import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EditableText = ({ cellRender, columnId, rowIndex, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [valueState, setValueState] = useState('');

  useEffect(() => {
    if (value === valueState) {
      return;
    }

    setValueState(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onClickHandler = (e) => {
    e.stopPropagation();

    setIsEditing(true);
  };

  const onChangeHandler = (e) => {
    const newValue = e.target.value;

    setValueState(newValue);
  };

  const onBlurHandler = () => {
    setIsEditing(false);

    if (value === valueState) {
      return;
    }

    const invalid = onChange(columnId, rowIndex, valueState);

    if (!invalid) {
      return;
    }

    setValueState(value);
  };

  return (
    <div
      className="editable-text"
      onClick={onClickHandler}
      onDoubleClick={(e) => { e.stopPropagation(); }}
      onKeyDown={() => {}}
      tabIndex={-1}
      role="button"
    >
      {
        isEditing ? (
          <input
            type="text"
            value={valueState}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyPress={(event) => {
              if (event.charCode !== 13) {
                return;
              }

              event.preventDefault();

              onBlurHandler();
            }}
          />
        ) : (
          <>{cellRender}</>
        )
      }
    </div>
  );
};

EditableText.propTypes = {
  cellRender: PropTypes.any.isRequired,
  columnId: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

EditableText.defaultProps = {
  value: '',
  onChange: () => {}, // return true to revert back to original value before change
};

export default EditableText;
