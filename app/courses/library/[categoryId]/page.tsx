"use client";
import { FaUsers } from "react-icons/fa";
import CourseSliderList from "@components/courses/category/CourseSliderList";
import useCourses from "@hooks/useCourses";
import Feed from "@components/courses/Feed";

const Category = ({ params }) => {
  const { getPopularCourses, getCoursesAfterPublishDate } = useCourses();
  const popularCourses = getPopularCourses(4);
  const newestCourses = getCoursesAfterPublishDate(new Date("2023-02-01"));
  const courseList = [
    { name: "Most Popular", courses: popularCourses },
    { name: "New", courses: newestCourses },
  ];
  const topCoursesList = [{ name: "Top Courses", courses: newestCourses }];
  return (
    <section className="container py-5">
      <header>
        <h1 className="fs-3">&#123;Category Title&#125; courses</h1>
        <span className="d-flex align-items-center mb-4">
          <FaUsers size={25} />
          <p className="fs-6 mb-0 ms-2">1,031 Learners</p>
        </span>
      </header>
      <CourseSliderList
        title="Courses to get you started"
        courseList={courseList}
        activeTab="Most Popular"
      />
      <br />
      <br />
      <br />
      <CourseSliderList
        title="Top Courses in Category Title"
        courseList={topCoursesList}
        activeTab="Top Courses"
      />
      <div className="d-flex flex-column mt-5">
        <h2>All &#123;Category Title&#125; courses</h2>
        <p className="desc">
          Join more than 12 million learners and train up on &#123;Category
          Title&#125; on Udemy. Choose from a wide range of top-rated
          &#123;Category Title&#125; courses. For everything you need to know
          about this topic, we&quot;ve got you covered. Our real-world experts
          will also lead you live one on one sessions to apply your skills.
        </p>
        <Feed />
      </div>
    </section>
  );
};

export default Category;
