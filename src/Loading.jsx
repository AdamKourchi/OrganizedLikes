import "./loading.css";
export default function Loading() {
  return (
    <div className="d-flex text-center justify-content-center mt-5">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="display-1">Loading </p>
    </div>
  );
}
