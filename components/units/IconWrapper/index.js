import PropTypes from 'prop-types'

const IconWrapper = ({ iconData }) => {

    const { className, icon  } = iconData

    return (
        <span className={className}>{icon}</span>
    )
}

IconWrapper.propTypes = {
    iconData: PropTypes.shape({
        icon: PropTypes.node,
        className: PropTypes.string,
    }).isRequired
}

export default IconWrapper