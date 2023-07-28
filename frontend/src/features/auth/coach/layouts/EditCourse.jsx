import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../../../slices/coursesSlice";
import Loader from "../../../../components/Loader";
import { CourseHero, Chapters } from "../components";

const EditCourse = () => {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseByIdQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

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
      <div className="alert alert-danger" role="alert">
        {error?.data?.message || error.error || "Something went wrong!"}
      </div>
    );
  }
};

EditCourse.propTypes = {};

export default EditCourse;
