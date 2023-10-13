import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons/faChevronRight';

import useStorage from '~/lib/hooks/useStorage';
import Nav from '~/shared/components/Nav';
import Logo from '~/shared/components/Logo';
import Circle from '~/lib/components/layout/Circle';
import links from './links';

const NavMain = ({ className = '' }) => {
  const [short, setShort] = useStorage('admin/nav-short', true);

  return (
    <div className={`main-nav ${className}`}>
      <div className="position-sticky" style={{ top: 0 }}>
        <div className="mx-4 my-3">
          <Logo short={short} />
        </div>
        <button
          type="button"
          className="btn p-1 position-absolute"
          style={{ top: '.8rem', right: '-1.1rem', zIndex: 1 }}
          onClick={() => setShort(!short)}
        >
          <Circle
            className="bg-white shadow-sm"
            style={{ width: '1.6rem', fontSize: '.8rem' }}
            text={(
              <FA icon={short ? faChevronRight : faChevronLeft} />
            )}
          />
        </button>
        <Nav links={links} short={short} />
      </div>
    </div>
  );
};

export default NavMain;
