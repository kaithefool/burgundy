import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import Name from './Name';
import { getColor } from '../palette';
import Circle from '~/lib/components/layout/Circle';

const Avatar = ({
  size = 1.8,
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
    <Circle
      className={`text-white ${className}`}
      style={{
        width: `${size}rem`,
        ...!avatar && entry?._id && {
          backgroundColor: getColor(entry),
        },
      }}
      text={!avatar && (
        <span style={{ fontSize }}>
          {icon ? (
            <FA icon={icon} />
          ) : (
            <Name {...props} initial />
          )}
          {children}
        </span>
      )}
    >
      {avatar && (
        <div
          className="img-bg"
          style={{ backgroundImage: `url('/uploads/${avatar.path}')` }}
        />
      )}
    </Circle>
  );
};

export default Avatar;
