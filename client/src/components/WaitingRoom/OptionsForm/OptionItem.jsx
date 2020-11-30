import "./OptionItem.scss";
import classNames from 'classnames'

function OptionItem({ children, clickHandler, label, selected }) {
  let isSelected = selected === children ? true : false;
 
  const className = classNames('option-item', {'option-item--selected': isSelected})

  return (
    <div id={label} onClick={() => clickHandler(children)} className={className}>
      <span>{children}</span>
    </div>
  );
}

export default OptionItem;
