import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Wrapper, CreateCourseModal, CoursesList } from "../components";
import { Card, Button } from "react-bootstrap";
import { useGetCoachCoursesQuery } from "../../../../slices/coursesSlice";
import { setCourses } from "../../../../slices/coachSlice";

const Courses = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  let coachPosts;
  // try {
  //   const {
  //     data: courses,
  //     isFetching,
  //     isLoading,
  //   } = useGetCoachCoursesQuery(userInfo._id, {
  //     pollingInterval: 3000,
  //     refetchOnMountOrArgChange: true,
  //     skip: false,
  //   });
  //   coachPosts = courses;
  // } catch (err) {
  //   toast.error(err?.data?.message || err.error);
  // }
  // useEffect(() => {
  //   dispatch(setCourses(coachPosts));
  // }, [coachPosts, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { courses } = useSelector((state) => state.coach);
  // console.log(courses);

  return (
    <Wrapper>
      <div className="soft-shadow">
        <h3>My Courses</h3>
        {/* {courses ? && <CoursesList courses={courses} />} */}
        <CoursesList />
      </div>
      <CreateCourseModal show={show} handleClose={handleClose} />
      <div className="position-fixed" style={{ right: "10%", bottom: "10%" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Course
        </Button>
      </div>
    </Wrapper>
  );
};

export default Courses;
