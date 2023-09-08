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

const CreateCourseModal = ({ show, handleClose, userInfo }) => {
  const [createCourse, { isLoading, isError, isSuccess, error }] =
    useCreateCourseMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("coachId", userInfo.id);
    try {
      const res = await createCourse({ formData: formData }).unwrap();
      toast.success(`${res.title} has been created successfuly.`);
      setTitle("");
      setDescription("");
      setFile(null);
      handleClose(true);
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err.error ||
          error ||
          "Something went wrong, please check your form."
      );
    }
  };

  if (isError) {
    toast.error(error);
  }

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmitHandler}>
          <Modal.Header closeButton>
            <div className="d-flex flex-column">
              <Modal.Title>Add Course</Modal.Title>
              <p className="danger">{JSON.stringify(error?.data)}</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="courseForm.TitleControl">
              <Form.Label>Course Title</Form.Label>
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose a thumbnail</Form.Label>
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
