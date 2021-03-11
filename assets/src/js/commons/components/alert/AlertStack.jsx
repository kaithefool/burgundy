import React from 'react';

import useAlert from './useAlert';

const AlertStack = () => {
  const { stack, remove } = useAlert();

  return (
    <div className="toast-container position-absolute">
      {stack.map((a, i) => (
        <div
          key={i}
          className={`
            toast
            ${a.theme ? `bg-${a.theme} text-white border-0` : ''}
          `}
        >
          <div className="d-flex">
            <div className="toast-body">
              {a.children}
            </div>
            <button
              type="button"
              className={`
                btn-close${a.theme ? '-white' : ''}
                mx-auto m-auto
              `}
              onClick={() => remove(i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertStack;
