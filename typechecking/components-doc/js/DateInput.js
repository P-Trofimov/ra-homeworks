'use strict';

const DateInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
    </div>
  )
};

const today = new Date();
DateInput.defaultProps = {
  value: today.toISOString().slice(0, 10)
};

const datePropType = (props, propName, componentName) => {
  let date = props[propName];
  let isDate = (typeof date === 'string') && /^(\d){4}-(\d){2}-(\d){2}$/.test(date);
  if(!isDate) {
    return new Error(`Неверный параметр ${propName} в компоненте ${componentName}: параметр должен быть датой в формате YYYY-MM-DD`);
  }
  return null;
};

DateInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: datePropType
};