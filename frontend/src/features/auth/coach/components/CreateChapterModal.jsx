import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import { useCreateChapterMutation } from "../../../../slices/chaptersSlice";

const CreateChapterModal = ({ show, handleClose, course }) => {
  const [createChapter, { isLoading }] = useCreateChapterMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createChapter({
        chapter: { title, description },
        course,
      }).unwrap();
      toast.success(`${res.title} has been created successfuly.`);
      setTitle("");
      setDescription("");
      handleClose(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="chapterForm.TitleControl">
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
              controlId="chapterForm.DescriptionControl"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="(optional)"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

CreateChapterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
};

export default CreateChapterModal;
