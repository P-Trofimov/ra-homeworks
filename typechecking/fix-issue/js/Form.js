const Form = (props) => {
  return (
    <div className="col-md-5 offset-md-4">
      <h1 className="text-center">Update your profile</h1>
      <hr/>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label>Email address*</label>
          <input type="email" className="form-control" name="email" onChange={props.handleChange}
                 value={props.email} required={true}/>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" name="first_name" onChange={props.handleChange}
                 value={props.first_name}/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" name="last_name" onChange={props.handleChange}
                 value={props.last_name}/>
        </div>
        <div className="form-group">
          <label>Age*</label>
          <input type="number" className="form-control" name="age" onChange={props.handleChange}
                 value={props.age} required={true}/>
        </div>
        <div className="form-group">
          <label>Nickname</label>
          <input type="text" className="form-control" name="nickname" onChange={props.handleChange}
                 value={props.nickname}/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="isMarried" name="is_married"
                 onChange={props.handleChange} checked={props.is_married}/>
          <label className="form-check-label" htmlFor="isMarried">Married</label>
        </div>
        <button type="submit" className="btn btn-primary mt-2 float-right">Update</button>
      </form>
    </div>
  )
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  age: PropTypes.number.isRequired,
  nickname: PropTypes.string,
  is_married: PropTypes.bool
};