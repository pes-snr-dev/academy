import PropTypes from "prop-types";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import { ChapterHeroIfState, ChapterHeroIfNotState } from ".";

const ChapterHero = ({ chapterId, currentChapter }) => {
  if (currentChapter) {
    return <ChapterHeroIfState chapter={currentChapter} />;
  }
  return <ChapterHeroIfNotState chapterId={chapterId} />;
};

ChapterHero.propTypes = {
  currentChapter: PropTypes.object,
  chapterId: PropTypes.string.isRequired,
};

export default ChapterHero;
