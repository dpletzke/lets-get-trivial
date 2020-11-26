//Params for each option
import "./OptionItem.scss";
import classNames from 'classnames'

function OptionItem({ children, clickHandler, label, selected }) {
  let isSelected = selected === children ? true : false;
  // if (children === 'Mixed' && !selected) {
  //   isSelected = true;
  // }

  const className = classNames('option-item', {'option-item--selected': isSelected})

  return (
    <div id={label} onClick={() => clickHandler(children)} className={className}>
      <span>{children}</span>
    </div>
  );
}

export default OptionItem;
