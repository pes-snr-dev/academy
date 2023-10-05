"use client";

import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { useUpdateCourseMutation } from "@redux/slices/coursesSlice";
import { FaEye } from "react-icons/fa6";
import Loader from "@components/Loader";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const CourseHero = ({ course }) => {
  const [isEditingCourseInfo, setIsEditingCourseInfo] = useState(false);
  const [data, setData] = useState({
    title: course.title,
    description: course.description,
    file: null,
    transcript: course.transcript,
    headline: course.headline,
    cost: course.cost,
  });
  const [updateCourse, { isLoading, error }] = useUpdateCourseMutation();

  const handleFileChange = (file) => {
    handleChange({ file });
  };

  const handleChange = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isEditingCourseInfo) {
      let formData = new FormData();
      formData.append("file", data.file);
      formData.append("title", data.title);
      formData.append("cost", data.cost);
      formData.append("description", data.description);
      formData.append("headline", data.headline);
      formData.append("transcript", data.transcript);

      try {
        await updateCourse({
          id: course._id,
          formData: formData,
        }).unwrap();

        setIsEditingCourseInfo(false);

        toast.success("Course updated successfuly.");
      } catch (err) {
        toast.error(err?.data?.message || err.error || error.message);
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
                isEditingCourseInfo && data.file
                  ? URL.createObjectURL(data.file)
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
                    <p className="text-danger">{JSON.stringify(error?.data)}</p>
                    <Form.Label>Change Course Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={data.title}
                      onChange={(e) => handleChange({ title: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="courseForm.Headline">
                    <Form.Label>Headline</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.headline}
                      onChange={(e) =>
                        handleChange({ headline: e.target.value })
                      }
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
                      value={data.description}
                      onChange={(e) =>
                        handleChange({ description: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    controlId="courseForm.CostControl"
                  >
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Cost in KSH"
                      value={data.cost}
                      onChange={(e) => handleChange({ cost: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    controlId="courseForm.DescriptionControl"
                  >
                    <Form.Label>Transcript</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.transcript}
                      onChange={(e) =>
                        handleChange({ transcript: e.target.value })
                      }
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
              <Button
                variant="primary"
                onClick={onSubmitHandler}
                className="me-4"
              >
                {isEditingCourseInfo ? "Save Changes" : "Edit Course"}
              </Button>
              {isEditingCourseInfo && (
                <Button
                  variant="primary"
                  onClick={() => setIsEditingCourseInfo((prev) => !prev)}
                >
                  Cancel
                </Button>
              )}
              {!isEditingCourseInfo && (
                <Link
                  className="btn btn-primary"
                  href={`/courses/${course._id}`}
                >
                  <FaEye size={25} className="text-secondary" />
                </Link>
              )}
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
