import PropTypes from "prop-types";
const FetchError = ({ error }) => {
  return (
    <div className="alert alert-danger container" role="alert">
      {error?.data?.message ||
        error.error ||
        error.message ||
        "Something went wrong!"}
    </div>
  );
};

FetchError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FetchError;
