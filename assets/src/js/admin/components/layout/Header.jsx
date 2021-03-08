import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  title,
  breadcrumb,
}) => (
  <header>
    {breadcrumb && (
      <nav>
        <div className="breadcrumb">
          {breadcrumb.map((b, i) => (
            <div key={i} className="breadcrumb-item">
              <Link {...b} />
            </div>
          ))}
        </div>
      </nav>
    )}
    {title && (
      <h1>{title}</h1>
    )}
  </header>
);

export default Header;
