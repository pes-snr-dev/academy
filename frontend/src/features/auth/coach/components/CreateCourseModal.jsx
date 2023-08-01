import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { useCreateCourseMutation } from "../../../../slices/coursesSlice";
import Loader from "../../../../components/Loader";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const CreateCourseModal = ({ show, handleClose }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("coachId", userInfo._id);
    try {
      const res = await createCourse({ formData: formData }).unwrap();
      toast.success(`${res.title} has been created successfuly.`);
      setTitle("");
      setDescription("");
      setFile(null);
      handleClose(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isLoading ? (
            <Loader />
          ) : (
            <Button variant="primary" type="submit" onClick={onSubmitHandler}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

CreateCourseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateCourseModal;
