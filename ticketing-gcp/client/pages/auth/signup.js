export default () => {
  return (
    <form>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control"></input>
      </div>
      <botton className="btn btn-primary">Sign Up</botton>
    </form>
  );
};
