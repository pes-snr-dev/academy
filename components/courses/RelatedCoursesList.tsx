import Course from "@components/courses/Course";
import { CourseType } from "@types/index";
import { getCourses } from "@services/course";
import { useGetCoursesQuery } from "@redux/slices/coursesSlice";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";

interface CourseListType {
  [key: string]: CourseType;
}
type CourseSliderListProps = {
  courses: CourseListType[];
};

const RelatedCoursesList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loader />;
  if (isError) return <FetchError error={error.data} />;
  if (isSuccess)
    return (
      <>
        {courses.map((course: CourseType, index: Number) => (
          <Course
            key={course._id}
            rating={3}
            title={course.title}
            image={course.thumbnail}
            author={course.coach.email}
            cost={course.cost}
            size="100%"
          />
        ))}
      </>
    );
};

export default RelatedCoursesList;
