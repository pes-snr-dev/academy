import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { useGetCoachCoursesQuery } from "../../../../slices/coursesSlice";
import Loader from "../../../../components/Loader";

const CoursesList = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoachCoursesQuery(userInfo._id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
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
                    <Button variant="primary">Edit</Button>
                  </li>
                  <li>
                    <Button variant="primary">Delete</Button>
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
        {error}
      </div>
    );
  }
};

export default CoursesList;
