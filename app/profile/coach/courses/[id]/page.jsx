"use client";

import { useGetCourseByIdQuery } from "@redux/slices/coursesSlice";
import Loader from "@components/Loader";
import { Wrapper, CourseHero, Chapters } from "@components/coach";
import FetchError from "@components/FetchError";

const EditCourse = ({ params }) => {
  const courseId = params.id;

  const {
    data: course,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseByIdQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  // const currentView = {
  //   isLoading: <Loader />,
  //   isSuccess: (
  //     <>
  //       <CourseHero course={course} />
  //       <Chapters course={course._id} />
  //     </>
  //   ),
  //   isError: <FetchError error={error} />,
  // }[(isLoading, isSuccess, isError)];

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <>
        <CourseHero course={course} />
        <Chapters course={course._id} />
      </>
    );
  } else if (isError) {
    return (
      <FetchError
        error={error?.data?.message || error.error || "Something went wrong!"}
      />
    );
  }

  return <Wrapper>{currentView}</Wrapper>;
};

export default EditCourse;
