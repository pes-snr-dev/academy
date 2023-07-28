import PropTypes from "prop-types";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";

const ChapterHeroIfNotState = ({ chapter }) => {
  const [isEditingCourseInfo, setIsEditingChapterInfo] = useState(false);
  const [title, setTitle] = useState(chapter.title);
  const [description, setDescription] = useState(chapter.description);

  //   const [updateChapter, response] = useUpdateChapterMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setDescription(chapter.description);
    }
  }, [chapter]);

  return (
    <Row>
      <Col>
        <Form className="card">
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
      </Col>
    </Row>
  );
};

ChapterHeroIfNotState.propTypes = {
  chapter: PropTypes.object,
};

export default ChapterHeroIfNotState;
