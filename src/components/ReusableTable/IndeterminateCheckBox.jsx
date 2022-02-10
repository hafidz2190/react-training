import React, { useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

// The solution is from https://github.com/tannerlinsley/react-table/discussions/1989

const useCombinedRefs = (...refs) => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckBox = forwardRef(({ isChecked, indeterminate, ...rest }, ref) => {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);

  return (
    <input
      type="checkbox"
      checked={isChecked}
      indeterminate={indeterminate}
      ref={combinedRef}
      {...rest}
    />
  );
});

IndeterminateCheckBox.propTypes = {
  isChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

IndeterminateCheckBox.defaultProps = {
  isChecked: false,
  indeterminate: false,
};

export default IndeterminateCheckBox;
