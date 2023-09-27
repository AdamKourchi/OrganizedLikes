export default function Like(props) {
  const handleOpenLink = () => {
    window.open(props.link, "_blank");
  };
  return (
    <div
      onClick={handleOpenLink}
      className="card text-bg-light col-12 col-lg-4"
    >
      <div className=" row g-0">
        <div className=" col-2 d-flex align-items-center mx-2">
          <img
            src={props.picture}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">
              {props.fan_count.toLocaleString()} likes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
