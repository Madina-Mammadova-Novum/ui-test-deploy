import React from "react";

import PropTypes from "prop-types";

const AccordionBody = ({ children }) => {
  return (
    <div className="pl-[30px] pb-4 pr-[74px]">
      {children}
    </div>
  )
}

AccordionBody.propTypes = {
  children: PropTypes.string,
};

export default AccordionBody;
