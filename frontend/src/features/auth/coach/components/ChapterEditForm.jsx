import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const ChapterEditForm = ({ chapter }) => {
  const [isEditingCourseInfo, setIsEditingChapterInfo] = useState(false);
  const [title, setTitle] = useState(chapter.title);
  const [description, setDescription] = useState(chapter.description);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsEditingChapterInfo(false);
    // if (isEditingCourseInfo) {
    //   try {
    //     await updateChapter({
    //       id: chapter._id,
    //       data: { title, description },
    //     }).unwrap();
    //     isLoading = isLoading;
    //     setIsEditingChapterInfo(false);
    //     isLoading = isSuccess;
    //     toast.success("Course updated successfuly.");
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error);
    //   }
    // } else {
    //   setIsEditingChapterInfo(true);
    // }
  };
  return (
    <Form className="card">
      <Card.Body>
        {isEditingCourseInfo ? (
          <>
            <Form.Group className="mb-3" controlId="courseForm.TitleControl">
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
          </>
        ) : (
          <>
            <Card.Title>{chapter.title}</Card.Title>
            <Card.Text>{chapter.description}</Card.Text>
          </>
        )}
        <Button variant="primary" onClick={onSubmitHandler}>
          {isEditingCourseInfo ? "Save Changes" : "Edit Course"}
        </Button>
      </Card.Body>
    </Form>
  );
};

ChapterEditForm.propTypes = {
  chapter: PropTypes.object.isRequired,
};

export default ChapterEditForm;
