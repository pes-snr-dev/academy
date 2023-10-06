import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@redux/slices/prefsSlice";
import SelectedOption from "./SelectedOption";

const LanguageSelector = () => {
  const languagesOffered = [
    { value: "en", title: "English", selected: false },
    { value: "fr", title: "French", selected: false },
    { value: "es", title: "Spanish", selected: false },
  ];
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.prefs);

  languagesOffered.forEach((languageOffered) => {
    if (languageOffered.value === language) {
      languageOffered.selected = true;
    }
  });

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage) {
      dispatch(setLanguage(selectedLanguage));
    }
    window.location.reload();
  };

  return (
    <InputGroup className="d-flex align-items-center">
      <Form.Select aria-label="Select languge" onChange={handleLanguageChange}>
        <option value="">Language</option>
        {languagesOffered.map((option) => (
          <option
            value={option.value}
            key={option.value}
            selected={option.selected}
          >
            {option.selected ? (
              <SelectedOption title={option.title} />
            ) : (
              option.title
            )}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
};

export default LanguageSelector;
