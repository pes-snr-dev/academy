import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const ProfileDrawer = () => {
  return (
    <div
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact={"true"}
              to="/profile"
              className={({ isActive }) => (isActive ? "active-style" : "none")}
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact={"true"}
              to="/profile/courses"
              className={({ isActive }) => (isActive ? "active-style" : "none")}
            >
              <CDBSidebarMenuItem icon="table">Courses</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact={"true"}
              to="/profile"
              className={({ isActive }) => (isActive ? "active-style" : "none")}
            >
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact={"true"}
              to="/analytics"
              className={({ isActive }) => (isActive ? "active-style" : "none")}
            >
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact={"true"}
              to="/hero404"
              target="_blank"
              className={({ isActive }) => (isActive ? "active-style" : "none")}
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            &copy; pes academy
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default ProfileDrawer;
