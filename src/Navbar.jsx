export default function Navbar(props) {
  const handleLogout = () => {
    FB.logout(function (response) {
      // User is now logged out
      console.log("Logged out", response);
      window.location.reload(); // Refresh the page after logout
    });
  };

  return (
    <nav className="p-4 bg-info">
      {props.islogged && (
        <div className="d-flex justify-content-between align-items-center w-100">
          <p>{props.likes.length} pages</p>
          <img src="logo.png" />

          <button onClick={handleLogout} className="btn btn-danger">
            Log-out
          </button>
        </div>
      )}
      {!props.islogged && (
        <div className="d-flex justify-content-center ">
          <img src="logo.png" />
        </div>
      )}
    </nav>
  );
}
