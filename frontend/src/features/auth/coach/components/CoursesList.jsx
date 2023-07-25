import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetCoachCoursesQuery,
  useDeleteCourseMutation,
} from "../../../../slices/coursesSlice";
import Loader from "../../../../components/Loader";
import { setCourses } from "../../../../slices/coachSlice";

const CoursesList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoachCoursesQuery(userInfo._id, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCourse] = useDeleteCourseMutation();

  const onDeleteHandler = async (e, course) => {
    e.preventDefault();
    const response = await deleteCourse(course._id).unwrap();
    console.log(response.status);
    if (response.status === "OK") {
      toast("Course deleted successfuly");
    }
  };

  useEffect(() => {
    dispatch(setCourses(courses));
  }, [courses, dispatch]);
  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <ul className="undecorated-links m-0 p-0 d-flex flex-column gap-3">
        {courses.map((course, index) => (
          <li key={index}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <ul className="undecorated-links m-0 p-0 gap-2 d-flex justify-content-end">
                  <li>
                    <LinkContainer to={`/courses/edit/${course._id}/`}>
                      <Button variant="primary">Edit</Button>
                    </LinkContainer>
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

export default CoursesList;
