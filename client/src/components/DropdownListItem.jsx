import classNames from 'classnames'

export default function DropdownListItem ({category, id, clickHandler, selected}) {
  const isSelected = id === selected ? true : false;
  const className = classNames('dropdownListItem', {
    'dropdownListItem--selected' : isSelected
  })
  return (
         <li  className={className} onClick={() => clickHandler(id)}>
        <span>{category}</span>
      </li>
  )
};