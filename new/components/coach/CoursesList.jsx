import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { FaPenToSquare, FaEye, FaTrash } from "react-icons/fa6";
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
  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();

  const onDeleteHandler = async (e, course) => {
    e.preventDefault();
    try {
      await deleteCourse(course._id).unwrap();
      toast("Course deleted successfuly");
    } catch (error) {
      toast(error.data);
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
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <Link href={`/courses/${course._id}/`}>
                      <FaEye size={25} title="Preview" />
                    </Link>
                  </div>
                  <ul className="list-style-0 m-0 p-0 gap-2 d-flex justify-content-end">
                    <li>
                      <Link href={`/profile/coach/courses/${course._id}/`}>
                        <FaPenToSquare size={25} />
                      </Link>
                    </li>
                    <li>
                      {deleteLoading ? (
                        <Loader />
                      ) : (
                        <FaTrash
                          size={25}
                          onClick={(e) => onDeleteHandler(e, course)}
                          className="text-primary cursor-pointer"
                        />
                      )}
                    </li>
                  </ul>
                </div>
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
