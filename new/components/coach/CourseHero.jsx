"use client";

import PropTypes from "prop-types";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import {
  useGetCourseThumbnailQuery,
  useUpdateCourseMutation,
} from "@redux/slices/coursesSlice";
import Loader from "@components/Loader";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const CourseHero = ({ course }) => {
  const [isEditingCourseInfo, setIsEditingCourseInfo] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [file, setFile] = useState("");
  const [updateCourse, { isSuccess, isError, isLoading, error }] =
    useUpdateCourseMutation();

  const handleFileChange = (file) => {
    setFile(file);
  };

  // console.log(response.data);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isEditingCourseInfo) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      try {
        await updateCourse({
          id: course._id,
          formData: formData,
        }).unwrap();

        setIsEditingCourseInfo(false);

        toast.success("Course updated successfuly.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      setIsEditingCourseInfo(true);
    }
  };

  return (
    <Row>
      <Col>
        {isLoading ? (
          <Loader />
        ) : (
          <Form className="card">
            <Card.Img
              variant="top"
              src={
                isEditingCourseInfo && file
                  ? URL.createObjectURL(file)
                  : course.thumbnail
              }
              height={250}
            />

            <Card.Body>
              {isEditingCourseInfo ? (
                <>
                  <Form.Group
                    className="mb-3"
                    controlId="courseForm.TitleControl"
                  >
                    <Form.Label>Change Course Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="courseForm.DescriptionControl"
                  >
                    <Form.Label>Change Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose a different thumbnail</Form.Label>
                    <FileUploader
                      handleChange={handleFileChange}
                      name="file"
                      multiple={false}
                      types={fileTypes}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                </>
              )}
              <Button variant="primary" onClick={onSubmitHandler}>
                {isEditingCourseInfo ? "Save Changes" : "Edit Course"}
              </Button>
            </Card.Body>
          </Form>
        )}
      </Col>
    </Row>
  );
};

CourseHero.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseHero;
