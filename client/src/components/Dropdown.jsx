import { useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import Button from "./Button";
import DropdownListItem from "./DropdownListItem";
import "./Dropdown.scss";

// const classNames = require("classnames");

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
  const onListElmClick = (id) => {
    clickHandler(id);
    onClick();
  };

  const list = optionsArray.map((option, index) => {
    return (
      <DropdownListItem
        key={index}
        id={option.id}
        clickHandler={onListElmClick}
        category={option[displayKey]}
        selected={selected}
      />
    );
  });

  const thisCategory =
    selected && optionsArray.filter((option) => option.id === selected)[0].name;

  return (
    <div>
      <div className="menu-container">
        <p onClick={onClick} className="menu-trigger">
          <Button>
            <span>{selected ? thisCategory : label}</span>
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
