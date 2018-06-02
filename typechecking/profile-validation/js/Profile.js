'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const Profile = props => {
  return (
    <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle} />
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
      </div>
    </div>
  );
};

const urlPropType = (props, propName, componentName) => {
  let url = props[propName];
  let isURL = (typeof url === 'string') && /^https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)$/.test(url);
  
  if(!isURL) {
    return new Error(
      `Неверный параметр ${propName} в компоненте ${componentName}: параметр должен быть адресом профиля vk.com. Передано: ${props[propName]}`
    );
  }
  
  return null;
};

const birthdayPropType = (props, propName, componentName) => {
  let birthday = props[propName];
  let isbirthday = (typeof birthday === 'string') && /^(\d){4}-(\d){2}-(\d){2}$/.test(birthday);
  
  if(!isbirthday) {
    return new Error(`Неверный параметр ${propName} в компоненте
      ${componentName}: параметр должен быть датой в формате YYYY-MM-DD. Передано: ${props[propName]}`);
  }
  
  if (new Date(birthday) > new Date()) {
    return new Error(`Неверный параметр ${propName} в компоненте
      ${componentName}: день рождения пользователя не может быть позже сегодняшней даты`)
  }
  
  return null;
};

function createChainableTypeChecker(validate) {
  const checkType = (isRequired, props, propName, componentName, ...rest) => {
    if (props[propName] === null || props[propName] === undefined) {
      if (isRequired) {
        return new Error(`Обязательный атрибут ${propName} не был передан компоненту ${componentName}`);
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }
  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
};

const birthdayChecker = createChainableTypeChecker(birthdayPropType);
const urlChecker = createChainableTypeChecker(urlPropType);

Profile.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  img: PropTypes.string,
  url: urlChecker.isRequired,
  birthday: birthdayChecker.isRequired
};

Profile.defaultProps = {
  img: 'images/profile.jpg',
  birthday: '2000-01-01'
};
