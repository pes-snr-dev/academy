import { FaCheckCircle } from "react-icons/fa";

const SelectedOption = ({ title }) => {
  return (
    <span>
      {title}
      <FaCheckCircle className="text-primary" />
    </span>
  );
};

export default SelectedOption;
