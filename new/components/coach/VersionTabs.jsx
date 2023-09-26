"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useGetVersionsQuery } from "@redux/slices/versionSlice";
import Loader from "@components/Loader";
import Videos from "./Videos";

const VersionTabs = ({ chapterId }) => {
  const [key, setKey] = useState("");
  const {
    data: versions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVersionsQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && versions) {
      setKey(versions[0]._id);
    }
  }, [isSuccess, versions]);

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <Tabs
        id="controlledVersionTab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {versions.map((version, index) => (
          <Tab key={index} eventKey={version._id} title={version.title}>
            <Videos
              chapterId={chapterId}
              versionId={version._id}
              version={version.abbreviation}
            />
          </Tab>
        ))}
      </Tabs>
    );
  } else if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        {error?.data?.message || error.error || "Something went wrong!"}
      </div>
    );
  }
};

VersionTabs.propTypes = {
  chapterId: PropTypes.string.isRequired,
};

export default VersionTabs;
