import React from 'react';
import { MEGA_DROPDOWN_CONFIG } from './megaDropdown.data';

interface Props {
  visible: boolean;
}

const MegaDropdown: React.FC<Props> = ({ visible }) => {
  return (
    <div className={`mega-dropdown ${visible ? 'visible' : ''}`}>
      <div className="dropdown-content-placeholder">
        {MEGA_DROPDOWN_CONFIG.map((column) => (
          <div key={column.title} className="dropdown-column">
            <h4>{column.title}</h4>
            <ul>
              {column.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaDropdown;
