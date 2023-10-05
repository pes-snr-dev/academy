"use client";
import { Accordion, Form, InputGroup } from "react-bootstrap";

const Filter = () => {
  const waysToLearn: string[] = [
    "All",
    "Core courss",
    "Expanded Courses",
    "Labs",
    "Quizes",
  ];
  const subjects:string[] =["Unit Economics", "Due Diligence", "Pricing"]
  return (
    <div className="flex flex-col">
      <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-none">Ways to learn</Accordion.Header>
          <Accordion.Body>
            <Form>
              {waysToLearn.map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type="radio"
                    label={`${type}`}
                    id={`default-${type}`}
                    name="way-to-learn"
                  />
                </div>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-none">Subject</Accordion.Header>
          <Accordion.Body>
            <Form>
              {subjects.map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type="radio"
                    label={`${type}`}
                    id={`default-${type}`}
                    name="subject"
                  />
                </div>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Filter;
