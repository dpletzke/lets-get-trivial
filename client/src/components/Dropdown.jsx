import { useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import Button from "./Button";
import "./Dropdown.scss";

export default function Dropdown({
  clickHandler,
  optionsArray,
  displayKey,
  idKey,
  label,
}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const list = optionsArray.map((option) => {
    return (
      <li
        onClick={() => clickHandler(option.id)}
        id={`category-${option[idKey]}`}
      >
        <span>{option[displayKey]}</span>
      </li>
    );
  });

  return (
    <div>
      <div className="menu-container">
        <p onClick={onClick} className="menu-trigger">
          <Button>
            <span>{label}</span>
            <BsChevronDoubleDown className="floating" />
          </Button>
        </p>
      </div>

      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>{list}</ul>
      </div>
    </div>
  );
}
