import Badge from "react-bootstrap/Badge";

export default function List(props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}
      <Badge bg="primary"> {props.fan_count.toLocaleString()} likes</Badge>
    </li>
  );
}
