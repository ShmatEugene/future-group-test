import React from 'react';

export default function NavBar({ onSelectDataType, active }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <span
            onClick={() => onSelectDataType('small')}
            className={`nav-item nav-link ${active === 'small' && 'active'}`}>
            Маленький набор
          </span>
          <span
            onClick={() => onSelectDataType('big')}
            className={`nav-item nav-link ${active === 'big' && 'active'}`}>
            Большой набор
          </span>
        </div>
      </div>
    </nav>
  );
}
