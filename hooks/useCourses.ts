"use client";
import { useState } from "react";
import { courseType } from "@types";

const INITIAL_COURSES: courseType[] = [
  {
    _id: "635981f6e40f61599e839ddb",
    thumbnail: "/assets/images/courses/pricing.jpeg",
    title: "Pricing Strategies",
    author: "Esther Kahuko",
    rating: 4,
    cost: 49999,
    releaseDate: new Date("2023-03-25"),
  },
  {
    _id: "635981f6e40f61599e000064",
    thumbnail: "/assets/images/courses/pricing.jpeg",
    title: "Brand Influence on Cost",
    author: "Esther Kahuko",
    rating: 5,
    cost: 49999,
    releaseDate: new Date("2023-07-25"),
  },
  {
    _id: "635981f6e40f61599e000064",
    thumbnail: "/assets/images/courses/pricing.jpeg",
    title: "Market Conditions",
    author: "Esther Kahuko",
    rating: 3,
    cost: 49999,
    releaseDate: new Date("2023-08-25"),
  },
];

export default function useCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  function getCoursesAfterPublishDate(filterDate: Date) {
    return courses.filter((el: Course) => el.releaseDate > filterDate);
  }
  function getPopularCourses(rating: number) {
    return courses.filter((el: Course) => el.rating > rating);
  }
  return { courses, getCoursesAfterPublishDate, getPopularCourses };
}
