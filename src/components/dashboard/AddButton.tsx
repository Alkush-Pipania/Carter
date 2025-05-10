import React from "react";

const CustomButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Roboto");

        .bt {
          width: 100px;
          cursor: pointer;
          position: relative;
          font-family: "Roboto";
          text-transform: uppercase;
          color: #503af6;
          letter-spacing: 0.5px;
          user-select: none;
          outline: none;
          text-decoration: none;
          text-align: center;
        }

        .more-bt {
          border-right: 2px solid #503af6;
          border-bottom: 2px solid #503af6;
          padding: 17px 29px 15px 31px;
          border-color: #503af6;
        }

        .more-bt:before,
        .more-bt:after {
          content: " ";
          display: block;
          background: #503af6;
          position: absolute;
          transition: 0.5s;
          z-index: 10;
        }

        .more-bt:before {
          left: 0;
          bottom: 0;
          height: calc(100% - 17px);
          width: 2px;
        }

        .more-bt:after {
          top: 0;
          right: 0;
          width: calc(100% - 17px);
          height: 2px;
        }

        .more-bt .fl,
        .more-bt .sfl {
          position: absolute;
          right: 0;
          height: 100%;
          width: 0;
          z-index: 2;
          background: #503af6;
          top: 0;
          transition: 0.5s;
          transition-delay: 0.1s;
        }

        .more-bt .sfl {
          z-index: 1;
          background: #4431d1;
          transition: 0.7s;
        }

        .more-bt:hover:before {
          height: 100%;
        }

        .more-bt:hover .fl,
        .more-bt:hover .sfl {
          width: 100%;
        }

        .more-bt i:after,
        .more-bt i:before {
          content: " ";
          display: block;
          width: 2px;
          height: 20px;
          background: #503af6;
          position: absolute;
          left: 50%;
          top: 50%;
          transition: 0.3s;
        }

        .more-bt:hover i:after {
          margin: 0px -1px;
        }

        .more-bt:hover i:before {
          margin: -10px 0px -10px 8px;
        }

        .more-bt p {
          transition: 0.5s;
          position: relative;
          z-index: 1;
        }
      `}</style>
      <a
        className={`bt more-bt ${className}`}
        onClick={onClick}
        {...props}
      >
        <span className="fl"></span>
        <span className="sfl"></span>
        <span className="cross"></span>
        <i></i>
        <p>{children}</p>
      </a>
    </div>
  );
};

export default CustomButton;
