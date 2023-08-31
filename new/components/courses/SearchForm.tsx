"use client";
import { Button, Form } from "react-bootstrap";
import { FaTimes, FaSearch } from "react-icons/fa";

const SearchForm = () => {
  return (
    <div className="d-flex flex-column">
      <Form className="relative w-100 flex-center">
        <div className="rounded-pill border py-2 px-4 d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search..."
            required
            className="flex-grow-1 border-0 custom-highlight-0"
          />
          <FaTimes size={25} className="cursor-pointer me-4" />
          <button className="border-start border-0 bg-none ps-4 h-100">
            <FaSearch size={20} />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
