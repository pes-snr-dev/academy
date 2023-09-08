import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import {
  useGetCoachCoursesQuery,
  useDeleteCourseMutation,
} from "@redux/slices/coursesSlice";
import Loader from "@components/Loader";

const CoursesList = ({ userInfo }) => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoachCoursesQuery(userInfo.id, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCourse] = useDeleteCourseMutation();

  const onDeleteHandler = async (e, course) => {
    e.preventDefault();
    try {
      await deleteCourse(course._id).unwrap();
      toast("Course deleted successfuly");
    } catch (error) {
      toast(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <ul className="list-style-0 m-0 p-0 d-flex flex-column gap-3">
        {courses.map((course, index) => (
          <li key={index}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <ul className="list-style-0 m-0 p-0 gap-2 d-flex justify-content-end">
                  <li>
                    <Link href={`/profile/coach/courses/${course._id}/`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  </li>
                  <li>
                    <Button
                      variant="primary"
                      onClick={(e) => onDeleteHandler(e, course)}
                    >
                      Delete
                    </Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </li>
        ))}
        {courses && Object.keys(courses).length === 0 && <p>Start Creating</p>}
      </ul>
    );
  } else if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        {error?.data?.message || error.error || "Something went wrong!"}
      </div>
    );
  }
};

CoursesList.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default CoursesList;
