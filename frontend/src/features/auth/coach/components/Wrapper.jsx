import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import ProfileDrawer from "./Drawer";

const Wrapper = ({ children }) => {
  return (
    <Row className="flex-xl-nowrap">
      <Col xs={12} md={3} lg={3}>
        <ProfileDrawer />
      </Col>
      <Col xs={12} md={9} lg={9}>
        <div className="soft-shadow">{children}</div>
      </Col>
    </Row>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
