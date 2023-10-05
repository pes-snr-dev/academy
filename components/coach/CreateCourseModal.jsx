"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { useCreateCourseMutation } from "@redux/slices/coursesSlice";
import Loader from "@components/Loader";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const courseData = {
  file: null,
  title: "",
  headline: "",
  description: "",
  cost: 0,
  transcript: "",
};

const CreateCourseModal = ({ show, handleClose, userInfo }) => {
  const [createCourse, { isLoading, isError, isSuccess, error }] =
    useCreateCourseMutation();

  const [data, setData] = useState(courseData);

  const handleChange = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", data.file);
    formData.append("title", data.title);
    formData.append("cost", data.cost);
    formData.append("description", data.description);
    formData.append("headline", data.headline);
    formData.append("transcript", data.transcript);
    formData.append("coachId", userInfo.id);
    try {
      const res = await createCourse({ formData: formData }).unwrap();
      toast.success(`${res.title} has been created successfuly.`);
      handleClose(true);
      setData((prev) => ({ ...prev, ...courseData }));
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err.error ||
          error ||
          error?.message ||
          "Something went wrong, please check your form."
      );
    }
  };

  const handleFileChange = (file) => {
    handleChange({ file: file });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Form onSubmit={onSubmitHandler}>
          <Modal.Header closeButton>
            <div className="d-flex flex-column">
              <Modal.Title>Add Course</Modal.Title>
              <p className="text-danger">{JSON.stringify(error?.data)}</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="courseForm.TitleControl">
              <Form.Label>Course Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={data.title}
                onChange={(e) => handleChange({ title: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="courseForm.Headline"
            >
              <Form.Label>Headline *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={data.headline}
                onChange={(e) => handleChange({ headline: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="courseForm.DescriptionControl"
            >
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={data.description}
                onChange={(e) => handleChange({ description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="courseForm.CostControl">
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
                onChange={(e) => handleChange({ transcript: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>Choose a thumbnail *</Form.Label>
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                multiple={false}
                types={fileTypes}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {isLoading ? (
              <Loader />
            ) : (
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

CreateCourseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default CreateCourseModal;
