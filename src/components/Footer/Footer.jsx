import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="pt-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="">AdMyCar</h5>
          <p>
            Aviram, you can change the colors and styling as you wish. Maybe add
            a logo here? 不错。
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Company</h5>
          <ul className="list-unstyled">
            <li>
              <a className="a-link" href="##">
                Our Story
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Newsroom
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Investors
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a className="a-link" href="##">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Terms of Use
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Aviad is a noob
              </a>
            </li>
            <li>
              <a className="a-link" href="##">
                Aviad is a noob
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="text-center py-3">
      © 2022 Copyright:
      <a className="a-link" href="localhost:3000">
        {" "}
        AdMyCar.com
      </a>
    </div>
  </footer>
);

export default Footer;