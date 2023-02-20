import React from 'react'
import classnames from "classnames"
import PropTypes from 'prop-types'

const Tabs = ({ tabs, customStyles, activeTab, defaultTab, onClick }) => {
    return (
        <div className={classnames("flex p-1 bg-purple-light w-min rounded-md text-xsm font-medium", customStyles)}>
            {tabs.map(({ value, label }) => (
                <button 
                    type='button' 
                    onClick={onClick} 
                    className={classnames("whitespace-nowrap w-16 h-7 rounded-md", value === (activeTab || defaultTab) && 'bg-white text-blue shadow-2xmd')}
                >{label}</button>
            ))}
        </div>
    )
}

Tabs.defaultProps = {
    customStyles: ''
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    activeTab: PropTypes.string.isRequired,
    defaultTab: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    customStyles: PropTypes.string,
}

export default Tabs