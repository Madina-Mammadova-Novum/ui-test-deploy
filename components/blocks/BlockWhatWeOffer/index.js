import React from "react";

import PropTypes from "prop-types";

import { Title } from "@/elements";

const BlockWhatWeOffer = ({ title }) => {
  return (
    <section>
      {title &&
        <Title>{title}</Title>
      }
    </section>
  )
}

BlockWhatWeOffer.propTypes = {
  title: PropTypes.string,
}

export default BlockWhatWeOffer
