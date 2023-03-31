import React from "react";

import PropTypes from "prop-types";

import { MinusIcon, PlusIcon } from "@/assets/icons";
import { Button, Title } from "@/elements";


const AccordionHeader = ({ children, onClick, isActive }) => {

  return (
    <div className="flex justify-between pb-2.5 px-[30px]">
      <Title component="h2" className="text-black">
        {children}
      </Title>
      <Button
        type="button"
        customStyles="!py-0 !px-0"
        onClick={onClick}
        buttonProps={{
          text: '',
          variant: 'tertiary',
          size: 'small',
          icon:  isActive ? <MinusIcon width={24} height={24} />
           : <PlusIcon width={24} height={24} />,
        }}
      />
    </div>
  )
}

AccordionHeader.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

export default AccordionHeader;
