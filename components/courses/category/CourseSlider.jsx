import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-custom.css";
import Course from "../Course";

const CourseSlider = ({ courses }) => {
  const settings = {
    centerMode: true,
    centerPadding: "100px",
    variableWidth: true,
    // autoplay: true,
    speed: 1000,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="courses-slide">
      {courses.map((course, index) => (
        <Course
          key={course._id}
          rating={course.rating}
          title={course.title}
          image={course.thumbnail}
          author={course.author}
          cost={course.cost}
        />
      ))}
    </Slider>
  );
};

export default CourseSlider;
