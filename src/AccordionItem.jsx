import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Like from "./Like";

export default function AccordionItem(props) {
  const likesWithMatchingCategory = props.likes.filter(
    (like) => like.category === props.title
  );

  return (
    <Accordion.Item eventKey={props.title}>
      <Accordion.Header>{props.title}</Accordion.Header>
      <Accordion.Body>
        <div className="row">
          {likesWithMatchingCategory.map((like) => (
            <Like
              key={like.id}
              name={like.name}
              picture={like.picture.data.url}
              fan_count={like.fan_count}
              link={like.link}
            />
          ))}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
