import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import Name from './Name';
import { getColor } from '../palette';

const Avatar = ({
  size = 3,
  children,
  className = '',
  icon,
  ...props
}) => {
  const fontSize = `${size * 0.4 + 0.2}rem`;
  const { entry } = props;
  let avatar;

  if (entry?.avatar?.length) {
    [avatar] = entry.avatar || [];
  }

  return (
    <div
      className={`
        rounded-circle overflow-hidden
        ratio ratio-1x1 text-white
        ${className}
      `}
      style={{
        width: `${size}rem`,
        ...!avatar && entry?._id && {
          backgroundColor: getColor(entry),
        },
      }}
    >
      {avatar ? (
        <div
          className="img-bg"
          style={{ backgroundImage: `url('/uploads/${avatar.path}')` }}
        />
      ) : (
        <div className="w-auto h-auto top-50 start-50 translate-middle">
          <div
            className="lh-1"
            style={{ fontSize }}
          >
            {icon ? (
              <FA icon={icon} />
            ) : (
              <Name {...props} initial />
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
