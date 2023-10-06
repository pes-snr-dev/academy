import {
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Button,
  ListGroup,
  Container,
} from "react-bootstrap";
import "./Plans.css";
import Link from "next/link";
import { FaCheck, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
const Plans = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="individual"
            id="pricingTabs"
            className="mb-5 d-flex justify-content-center px-5 fs-2 fw-bold"
          >
            <Tab eventKey="individual" title="Individual">
              <Tabs
                defaultActiveKey="monthly"
                id="pricingTabs"
                className="mb-3 d-flex justify-content-center border-0"
                variant="pills"
              >
                <Tab
                  eventKey="monthly"
                  title="Monthly"
                  className="bg-light p-4"
                >
                  <div className="d-flex" style={{ gap: "1%" }}>
                    <Card className="px-3" style={{ flexBasis: "48%" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold fs-3 text-center">
                          Standard
                        </Card.Title>
                        <Card.Text className="text-center">
                          Upskill with our core courses and two coaching
                          sessions.
                        </Card.Text>
                        <Card.Text className="fw-bold text-center">
                          Kes <span className="fs-3">15000</span>
                          <br />
                          per month
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span className="muted">or start a</span> &nbsp;
                          <Link href="#" className="no-underline">
                            free trial
                          </Link>
                        </Card.Text>
                        <div className="text-center">
                          <Button className="rounded-pill">Get Started</Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Limited core Courses
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Two coaching sessions
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                    <div
                      className="best-opportunity p-2 rounded"
                      style={{ flexBasis: "48%" }}
                    >
                      <p className="text-white text-center fw-bold my-2">
                        Best opportunity
                      </p>
                      <Card className="px-3">
                        <Card.Body>
                          <Card.Title className="fw-bold fs-3 text-center">
                            Premium
                          </Card.Title>
                          <Card.Text className="text-center">
                            Upskill with all of our courses and three coaching
                            sessions.
                          </Card.Text>
                          <Card.Text className="fw-bold text-center">
                            Kes <span className="fs-3">45000</span>
                            <br />
                            per month
                          </Card.Text>
                          <Card.Text className="text-center">
                            <span className="muted">or start a</span> &nbsp;
                            <Link href="#" className="no-underline">
                              free trial
                            </Link>
                          </Card.Text>
                          <div className="text-center">
                            <Button className="rounded-pill">
                              Get Started
                            </Button>
                          </div>
                          <div className="border-top mt-4 py-4">
                            <Card.Text>Standard includes:</Card.Text>
                            <ListGroup as="ul" className="list-unstyled">
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Access to full library of 300+ courses,
                                including advanced content, niche topics, and
                                recordings of past conferences
                              </ListGroup.Item>
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Three coaching sessions
                              </ListGroup.Item>
                            </ListGroup>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="yearly" title="Yearly">
                  <div className="d-flex" style={{ gap: "1%" }}>
                    <Card className="px-3" style={{ flexBasis: "48%" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold fs-3 text-center">
                          Standard
                        </Card.Title>
                        <Card.Text className="text-center">
                          Upskill with our core courses and two coaching
                          sessions.
                        </Card.Text>
                        <Card.Text className="fw-bold text-center">
                          Kes <span className="fs-3">150000</span>
                          <br />
                          per month
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span className="muted">or start a</span> &nbsp;
                          <Link href="#" className="no-underline">
                            free trial
                          </Link>
                        </Card.Text>
                        <div className="text-center">
                          <Button className="rounded-pill">Get Started</Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Limited core Courses
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Two coaching sessions
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                    <div
                      className="best-opportunity p-2 rounded"
                      style={{ flexBasis: "48%" }}
                    >
                      <p className="text-white text-center fw-bold my-2">
                        Best opportunity
                      </p>
                      <Card className="px-3">
                        <Card.Body>
                          <Card.Title className="fw-bold fs-3 text-center">
                            Premium
                          </Card.Title>
                          <Card.Text className="text-center">
                            Upskill with all of our courses and three coaching
                            sessions.
                          </Card.Text>
                          <Card.Text className="fw-bold text-center">
                            Kes <span className="fs-3">450000</span>
                            <br />
                            per month
                          </Card.Text>
                          <Card.Text className="text-center">
                            <span className="muted">or start a</span> &nbsp;
                            <Link href="#" className="no-underline">
                              free trial
                            </Link>
                          </Card.Text>
                          <div className="text-center">
                            <Button className="rounded-pill">
                              Get Started
                            </Button>
                          </div>
                          <div className="border-top mt-4 py-4">
                            <Card.Text>Standard includes:</Card.Text>
                            <ListGroup as="ul" className="list-unstyled">
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Access to full library of 300+ courses,
                                including advanced content, niche topics, and
                                recordings of past conferences
                              </ListGroup.Item>
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Three coaching sessions
                              </ListGroup.Item>
                            </ListGroup>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Tab>
            <Tab eventKey="team" title="Team">
              <Tabs
                defaultActiveKey="monthly"
                id="pricingTabs"
                className="mb-3 d-flex justify-content-center border-0"
                variant="pills"
              >
                <Tab
                  eventKey="monthly"
                  title="Monthly"
                  className="bg-light p-4"
                >
                  <div className="d-flex" style={{ gap: "1%" }}>
                    <Card className="px-3" style={{ flexBasis: "33%" }}>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-center">
                          <Card.Title className="fw-bold fs-3 text-center">
                            Standard
                          </Card.Title>
                          <div className="d-flex align-items-center rounded-pill bg-primary px-2">
                            <FaUserCircle size={15} />
                            <p className="ms-2 small m-0 fw-bold">2-8</p>
                          </div>
                        </div>
                        <Card.Text className="text-center">
                          Upskill with our core courses and two coaching
                          sessions.
                        </Card.Text>
                        <Card.Text className="fw-bold text-center">
                          Kes <span className="fs-3">95000</span>
                          <br />
                          per month
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span className="muted">or start a</span> &nbsp;
                          <Link href="#" className="no-underline">
                            free trial
                          </Link>
                        </Card.Text>
                        <div className="text-center">
                          <Button className="rounded-pill">Get Started</Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Limited core Courses
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Two coaching sessions
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                    <div
                      className="best-opportunity p-2 rounded"
                      style={{ flexBasis: "33%" }}
                    >
                      <p className="text-white text-center fw-bold my-2">
                        Best opportunity
                      </p>
                      <Card className="px-3">
                        <Card.Body>
                          <div className="d-flex align-items-center justify-content-center">
                            <Card.Title className="fw-bold fs-3 text-center">
                              Premium
                            </Card.Title>
                            <div className="d-flex align-items-center rounded-pill bg-primary px-2">
                              <FaUserCircle size={15} />
                              <p className="ms-2 small m-0 fw-bold">2-8</p>
                            </div>
                          </div>
                          <Card.Text className="text-center">
                            Upskill with all of our courses and three coaching
                            sessions.
                          </Card.Text>
                          <Card.Text className="fw-bold text-center">
                            Kes <span className="fs-3">135000</span>
                            <br />
                            per month
                          </Card.Text>
                          <Card.Text className="text-center">
                            <span className="muted">or start a</span> &nbsp;
                            <Link href="#" className="no-underline">
                              free trial
                            </Link>
                          </Card.Text>
                          <div className="text-center">
                            <Button className="rounded-pill">
                              Get Started
                            </Button>
                          </div>
                          <div className="border-top mt-4 py-4">
                            <Card.Text>Standard includes:</Card.Text>
                            <ListGroup as="ul" className="list-unstyled">
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Access to full library of 300+ courses,
                                including advanced content, niche topics, and
                                recordings of past conferences
                              </ListGroup.Item>
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Three coaching sessions
                              </ListGroup.Item>
                            </ListGroup>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <Card className="px-3" style={{ flexBasis: "33%" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold fs-3 text-center">
                          Enterprise
                        </Card.Title>
                        <Card.Text className="text-center">
                          Leverage greater flexibility and advanced analytics
                          for enterprises
                        </Card.Text>

                        <div className="text-center">
                          <Button className="rounded-pill">
                            Contact Sales
                          </Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Includes full access to the pes library for smes
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Unlimited coaching
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              SME business review
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Strategic planning and training
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Business structures and systems training
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab>
                <Tab eventKey="yearly" title="Yearly">
                  <div className="d-flex" style={{ gap: "1%" }}>
                    <Card className="px-3" style={{ flexBasis: "33%" }}>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-center">
                          <Card.Title className="fw-bold fs-3 text-center">
                            Standard
                          </Card.Title>
                          <div className="d-flex align-items-center rounded-pill bg-primary px-2">
                            <FaUserCircle size={15} />
                            <p className="ms-2 small m-0 fw-bold">2-8</p>
                          </div>
                        </div>
                        <Card.Text className="text-center">
                          Upskill with our core courses and two coaching
                          sessions.
                        </Card.Text>
                        <Card.Text className="fw-bold text-center">
                          Kes <span className="fs-3">350000</span>
                          <br />
                          per month
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span className="muted">or start a</span> &nbsp;
                          <Link href="#" className="no-underline">
                            free trial
                          </Link>
                        </Card.Text>
                        <div className="text-center">
                          <Button className="rounded-pill">Get Started</Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Limited core Courses
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Two coaching sessions
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                    <div
                      className="best-opportunity p-2 rounded"
                      style={{ flexBasis: "33%" }}
                    >
                      <p className="text-white text-center fw-bold my-2">
                        Best opportunity
                      </p>
                      <Card className="px-3">
                        <Card.Body>
                          <div className="d-flex align-items-center justify-content-center">
                            <Card.Title className="fw-bold fs-3 text-center">
                              Premium
                            </Card.Title>
                            <div className="d-flex align-items-center rounded-pill bg-primary px-2">
                              <FaUserCircle size={15} />
                              <p className="ms-2 small m-0 fw-bold">2-8</p>
                            </div>
                          </div>
                          <Card.Text className="text-center">
                            Upskill with all of our courses and three coaching
                            sessions.
                          </Card.Text>
                          <Card.Text className="fw-bold text-center">
                            Kes <span className="fs-3">450000</span>
                            <br />
                            per month
                          </Card.Text>
                          <Card.Text className="text-center">
                            <span className="muted">or start a</span> &nbsp;
                            <Link href="#" className="no-underline">
                              free trial
                            </Link>
                          </Card.Text>
                          <div className="text-center">
                            <Button className="rounded-pill">
                              Get Started
                            </Button>
                          </div>
                          <div className="border-top mt-4 py-4">
                            <Card.Text>Standard includes:</Card.Text>
                            <ListGroup as="ul" className="list-unstyled">
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Access to full library of 300+ courses,
                                including advanced content, niche topics, and
                                recordings of past conferences
                              </ListGroup.Item>
                              <ListGroup.Item as="li" className="border-0">
                                <FaCheck className="text-primary check" />
                                Three coaching sessions
                              </ListGroup.Item>
                            </ListGroup>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <Card className="px-3" style={{ flexBasis: "33%" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold fs-3 text-center">
                          Enterprise
                        </Card.Title>
                        <Card.Text className="text-center">
                          Leverage greater flexibility and advanced analytics
                          for enterprises
                        </Card.Text>

                        <div className="text-center">
                          <Button className="rounded-pill">
                            Contact Sales
                          </Button>
                        </div>
                        <div className="border-top mt-4 py-4">
                          <Card.Text>Standard includes:</Card.Text>
                          <ListGroup as="ul" className="list-unstyled">
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Includes full access to the pes library for smes
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Unlimited coaching
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              SME business review
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Strategic planning and training
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className="border-0">
                              <FaCheck className="text-primary check" />
                              Business structures and systems training
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Plans;
