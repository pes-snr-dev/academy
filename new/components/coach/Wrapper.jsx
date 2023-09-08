import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@components/Loader";
import Unathorized from "@components/Unauthorized";

const Wrapper = ({ children }) => {
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const currentView = {
    loading: <Loader />,
    authenticated: (
      <Row className="flex-xl-nowrap">
        <Col xs={12} md={12} lg={12}>
          <div className="soft-shadow">{children}</div>
        </Col>
      </Row>
    ),
    unauthenticated: <Unathorized />,
  }[status];
  return currentView;
};

Wrapper.auth = true;

export default Wrapper;
