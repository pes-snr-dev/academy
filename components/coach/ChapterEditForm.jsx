"use client";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useUpdateChapterMutation } from "@redux/slices/chaptersSlice";
import Loader from "@components/Loader";

const ChapterEditForm = ({ chapter }) => {
  const [updateChapter, { isError, isLoading, isSuccess, error }] =
    useUpdateChapterMutation();
  const [isEditingCourseInfo, setIsEditingChapterInfo] = useState(false);
  const [title, setTitle] = useState(chapter.title);
  const [description, setDescription] = useState(chapter.description);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsEditingChapterInfo(false);
    if (isEditingCourseInfo) {
      try {
        await updateChapter({
          id: chapter._id,
          title: title,
          description: description,
        }).unwrap();
        setIsEditingChapterInfo(false);
        toast.success("Course updated successfuly.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      setIsEditingChapterInfo(true);
    }
  };
  return (
    <Form className="card">
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </Form>
  );
};

ChapterEditForm.propTypes = {
  chapter: PropTypes.object.isRequired,
};

export default ChapterEditForm;
