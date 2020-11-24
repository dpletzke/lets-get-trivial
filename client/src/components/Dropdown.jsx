import { useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import Button from "./Button";
import DropdownListItem from './DropdownListItem';
import "./Dropdown.scss";

const classNames = require("classnames");

export default function Dropdown({
  clickHandler,
  optionsArray,
  displayKey,
  idKey,
  label,
  selected,
}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const list = optionsArray.map((option) => {
    return (
      <DropdownListItem
      id={option.id}
      clickHandler={clickHandler}
      category={option[displayKey]}
      selected={selected}
      />
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
