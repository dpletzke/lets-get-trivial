import {useRef, useState} from 'react';
import './Dropdown.scss'

export default function Dropdown(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
    <div className="menu-container">
      <p
      onClick={onClick} className="menu-trigger"
      >Dropdown!</p>
    </div>

    <div ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
      <ul>
          <li><a href="/messages">Messages</a></li>
          <li><a href="/trips">Trips</a></li>
          <li><a href="/saved">Saved</a></li>
        </ul>
    </div>
    </div>
  );
}