import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { useCreateChapterVideoMutation } from "@redux/slices/videoSlice";
import Loader from "@components/Loader";

const fileTypes = [
  "x-flv",
  "x-ms-wmv",
  "x-msvideo",
  "quicktime",
  "3gpp",
  "MP2T",
  "application/x-mpegURL",
  "mp4",
];

const CreateChapterVideoModal = ({
  show,
  handleClose,
  chapterId,
  versionId,
}) => {
  const formRef = useRef();
  const [createChapterVideo, { isLoading, isError, isSuccess, error }] =
    useCreateChapterVideoMutation();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  console.log(chapterId, "chapter Id");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("chapter", chapterId);
    formData.append("version", versionId);

    try {
      const res = await createChapterVideo({
        formData: formData,
        chapterId,
        versionId,
      }).unwrap();
      toast.success(`${res.title} has been created successfuly.`);
      setFile(null);
      setTitle("");
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

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="d-flex flex-column">
            <Modal.Title>Upload Video</Modal.Title>
            <p className="danger">{JSON.stringify(error?.data)}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group className="mb-3" controlId="courseForm.TitleControl">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

CreateChapterVideoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  chapterId: PropTypes.string.isRequired,
  versionId: PropTypes.string.isRequired,
};

export default CreateChapterVideoModal;
