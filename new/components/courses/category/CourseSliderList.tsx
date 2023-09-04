"use client";
import { useState } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useCourses from "@hooks/useCourses";
import CourseSlider from "./CourseSlider";
import { courseType } from "@types";

type courseListType = {
  name: string;
  courses: courseType[];
};

type CourseSliderListProps = {
  title: string;
  courseList: courseListType[];
  activeTab: string;
};

// [{"name":courses}]

const CourseSliderList = ({
  title,
  courseList,
  activeTab,
}: CourseSliderListProps) => {
  const { getPopularCourses, getCoursesAfterPublishDate } = useCourses();
  const popularCourses = getPopularCourses(4);
  const newestCourses = getCoursesAfterPublishDate(new Date("2023-02-01"));
  const [key, setKey] = useState(activeTab);
  return (
    <section>
      <Row>
        <Col>
          <h2 className="fs-4">{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {courseList.map((list, index) => (
              <Tab eventKey={`${list.name}`} title={`${list.name}`} key={index}>
                <CourseSlider courses={list.courses} />
              </Tab>
            ))}
            {/* <Tab eventKey="home" title="Home">
              <CourseSlider courses={popularCourses} />
            </Tab>
            <Tab eventKey="profile" title="Profile">
              <CourseSlider courses={newestCourses} />
            </Tab> */}
          </Tabs>
        </Col>
      </Row>
    </section>
  );
};

export default CourseSliderList;
