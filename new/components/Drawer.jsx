import Image from "next/image";
import Link from "next/link";
import { FaHome, FaUser, FaFolder } from "react-icons/fa";

const Drawer = () => {
  return (
    <div className="col-auto col-md-3 col-xl-3 px-sm-2 px-0 bg-dark ">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item mb-4">
            <Link
              href="/profile/coach/dashboard"
              className="nav-link align-middle p-0 d-flex align-items-center"
            >
              <FaHome />
              <span className="ms-2 d-none d-sm-inline">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item mb-4">
            <Link
              href="/profile/coach/dashboard"
              className="nav-link align-middle p-0 d-flex align-items-center"
            >
              <FaFolder />
              <span className="ms-2 d-none d-sm-inline">Courses</span>
            </Link>
          </li>
          <li className="nav-item mb-4">
            <Link
              href="/profile/coach/edit"
              className="nav-link align-middle p-0 d-flex align-items-center"
            >
              <FaUser />
              <span className="ms-2 d-none d-sm-inline">Profile</span>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src="/assets/images/users/peter.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
