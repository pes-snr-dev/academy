import React from "react";
import SearchForm from "./SearchForm";
import Filter from "./Filter";
import { CourseList } from "./CourseList";
import SortForm from "./SortForm";
import "@styles/courses.css";

const Feed = () => {
  return (
    <section className="feed w-100 gap-5">
      <p className="fw-bold fs-3">Search</p>
      <div className="d-flex align-items-center justify-content-between gap-2 ">
        <div className="flex-grow-1">
          <SearchForm />
        </div>
        <div className="w-25 ">
          <SortForm />
        </div>
      </div>

      <div className="d-flex">
        <div className="w-25 ">
          <Filter />
        </div>
        <div className="flex-grow-1">
          <CourseList />
        </div>
      </div>
    </section>
  );
};

export default Feed;
