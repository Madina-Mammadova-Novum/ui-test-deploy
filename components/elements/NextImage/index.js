import Image from 'next/image'
import PropTypes from 'prop-types'

const NextImage = ({ src, alt, width, height, customStyles, ...rest }) => {

    return (
        <Image 
            src={src}
            width={width}
            height={height}
            className={customStyles}
            {...rest}
        />
    )
}

NextImage.defaultProps = {
    customStyles: ''
}

NextImage.propTypes = {
    src: PropTypes.oneOf(PropTypes.node, PropTypes.string).isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    customStyles: PropTypes.string,
}

export default NextImage