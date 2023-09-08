import PropTypes from "prop-types";
const FetchError = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {error?.data?.message || error.error || "Something went wrong!"}
    </div>
  );
};

FetchError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FetchError;
