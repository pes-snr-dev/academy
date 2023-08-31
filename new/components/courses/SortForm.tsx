"use client";
import { Form } from "react-bootstrap";

const SortForm = () => {
  return (
    <Form >
      <Form.Select aria-label="Sort By" className="form-select rounded-pill py-3">
        <option>Sort By</option>
        <option value="1">Highest Rated</option>
        <option value="2">Newest</option>
        <option value="3">A &rarr; Z</option>
        <option value="3">A &larr; Z</option>
      </Form.Select>
    </Form>
  );
};

export default SortForm;
