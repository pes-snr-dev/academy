import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { userType } from "@types";

const Course = ({ image, title, author, rating, cost, size }: userType) => {
  let ratings = Array.from(Array(rating).keys());
  return (
    <Card style={{ width: `${size}` }}>
      <Image
        src={image}
        className="card-img-top"
        alt={"Course Image"}
        width={100}
        height={150}
      />
      <Card.Body>
        <Card.Title className="fs-6">{title}</Card.Title>
        <Card.Body className="p-0">
          <p className="muted">
            <small>{author}</small>
          </p>

          <div className="d-flex align-items-center">
            <p className="mb-0 me-1">{rating}</p>
            {ratings.map((numberRating) => {
              return <FaStar key={numberRating} size={20} />;
            })}
          </div>
          <p className="fw-bold">Ksh. {cost}</p>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Course;
