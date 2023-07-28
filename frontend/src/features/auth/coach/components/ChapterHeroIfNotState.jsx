import PropTypes from "prop-types";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import { useGetChapterQuery } from "../../../../slices/chaptersSlice";

const ChapterHeroIfNotState = ({ chapterId }) => {
  const {
    data: chapter,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChapterQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  });
  console.log(chapter);
  const [isEditingCourseInfo, setIsEditingChapterInfo] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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

  // const [getChapter, response] = useGetChapterQuery();

  return (
    <Row>
      <Col>
        {isLoading && <Loader />}
        {isSuccess && (
          <>
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
          </>
        )}
        {isError && (
          <div className="alert alert-danger" role="alert">
            {error?.data?.message || error.error || "Something went wrong!"}
          </div>
        )}
      </Col>
    </Row>
  );
};

ChapterHeroIfNotState.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

export default ChapterHeroIfNotState;
