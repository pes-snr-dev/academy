import Image from "next/image";
import Feed from "@components/courses/Feed";

const Courses = () => {
  return (
    <section className="container d-flex flex-column align-items-center pt-4">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        height={80}
        width={80}
        className="img-fluid mb-4"
      />
      <h1 className="head_text text-center">Discover 100+ Courses</h1>
      <p className="desc text-center mb-2">
        Our coaches have carefully curated and authored{" "}
        <br className="d-none d-sm-block" /> tailor made courses for your needs
      </p>
      <Feed />
    </section>
  );
};

export default Courses;
