import { useGetChaptersQuery } from "@redux/slices/chaptersSlice";
import Loader from "@components/Loader";
import FetchError from "@components/FetchError";
import NotFound from "@components/NotFound";

const Chapters = ({ courseId }) => {
  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) return <Loader />;
  if (isError) return <FetchError error={error} />;
  if (isSuccess && chapters)
    return (
      <>
        {chapters.map((chapter, index) => (
          <div
            className="d-flex position-relative mb-4 bg-light border p-2 hoverable"
            key={index}
          >
            <div>
              <h6 className="mt-0">{chapter.title}</h6>
              <p>
                Description <br></br>
                {chapter.description ? chapter.description : "..."}
              </p>
            </div>
          </div>
        ))}
      </>
    );
  if (isSuccess && !chapters) return <NotFound item="Chapters" />;
};

export default Chapters;
