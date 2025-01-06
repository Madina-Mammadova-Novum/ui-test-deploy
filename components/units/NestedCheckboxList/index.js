/**
 * @component NestedCheckboxList
 * @description Reusable nested checkbox component for tree-like data structures
 * @props {Array} items - Array of items to display in tree structure
 * @props {Object} config - Configuration for item rendering and structure
 * @props {Function} onChange - Callback when any checkbox state changes
 * @props {Boolean} isCounteroffer - Whether this is a counteroffer view (disables unselected items)
 */

'use client';

import React, { useCallback } from 'react';

import PropTypes from 'prop-types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import { getCookieFromBrowser } from '@/utils/helpers';

const NestedCheckboxList = ({
  items = [],
  config = {},
  expanded = {},
  onToggleExpand,
  onChange,
  renderItem,
  getSubItems,
  isSelected,
  hasIndeterminate,
  isDisabled,
  customStyles = {},
  level = 0,
  parentId = null,
  isCounteroffer = false,
}) => {
  const role = getCookieFromBrowser('session-user-role');

  const handleItemChange = useCallback(
    (item, checked) => {
      /* eslint-disable no-nested-ternary */
      const itemType = item.countries
        ? 'subBasin'
        : item.codeISO2
          ? 'country'
          : !item.countries && !item.codeISO2 && !item.subBasins && !item.ports
            ? 'port'
            : 'basin';

      if (itemType === 'country') {
        onChange?.(
          {
            ...item,
            subBasinId: parentId,
          },
          checked,
          itemType
        );
      } else if (itemType === 'port') {
        onChange?.(
          {
            ...item,
            countryId: parentId,
          },
          checked,
          itemType
        );
      } else {
        onChange?.(item, checked, itemType);
      }
    },
    [onChange, parentId, isCounteroffer, role]
  );

  const getLabelClass = useCallback((item) => {
    if (item.countries) return 'text-sm font-medium';
    if (item.codeISO2) return 'text-xs';
    if (item.subBasins) return 'text-sm font-bold';
    if (!item.countries && !item.codeISO2 && !item.subBasins && !item.ports) return 'text-xs';
    return 'text-sm';
  }, []);

  const getExpandedKey = useCallback((item) => {
    const itemType = item.countries
      ? 'subBasin'
      : item.codeISO2
        ? 'country'
        : !item.countries && !item.codeISO2 && !item.subBasins && !item.ports
          ? 'port'
          : 'basin';
    return `${itemType}-${item.id}`;
  }, []);

  const getIsItemDisabled = useCallback(
    (item, isItemSelected, isIndeterminate) => {
      const baseDisabled = isDisabled?.(item) || false;
      if (baseDisabled) return true;

      // For owner in counteroffer mode:
      // - Disable if item is not selected and not indeterminate
      // - Enable if item is selected or indeterminate (allowing unselection)
      if (isCounteroffer && role === 'owner') {
        return !isItemSelected && !isIndeterminate;
      }

      return false;
    },
    [isDisabled, isCounteroffer, role]
  );

  return (
    <div className={`flex flex-col ${customStyles.container || ''}`}>
      {items.map((item) => {
        const subItems = getSubItems?.(item) || [];
        const hasSubItems = subItems.length > 0;
        const expandedKey = getExpandedKey(item);
        const isExpanded = expanded[expandedKey];
        const isItemSelected = isSelected?.(item) || false;
        const isIndeterminate = hasIndeterminate?.(item) || false;
        const isItemDisabled = getIsItemDisabled(item, isItemSelected, isIndeterminate);

        return (
          <div key={item.id} className={customStyles.item || ''}>
            <div className="mb-1 flex flex-wrap items-center justify-between">
              <label
                className={`flex items-center ${getLabelClass(item)} ${isItemDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  checked={isItemSelected}
                  disabled={isItemDisabled}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = isIndeterminate;
                    }
                  }}
                  onChange={(e) => !isItemDisabled && handleItemChange(item, e.target.checked)}
                />
                <div className="flex items-center gap-x-1">
                  {renderItem?.(item)}
                  {isItemDisabled && <span className="text-xs text-gray-500">(Disabled)</span>}
                </div>
              </label>
              {hasSubItems && (
                <button
                  type="button"
                  onClick={() => onToggleExpand?.(expandedKey)}
                  className={`flex items-center p-1 ${isItemDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={isItemDisabled}
                >
                  <AngleDownSVG
                    className={`h-5 w-5 transform fill-blue transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
            </div>
            {hasSubItems && isExpanded && (
              <div className={`ml-6 ${customStyles.subItems || ''}`}>
                <NestedCheckboxList
                  items={subItems}
                  config={config}
                  expanded={expanded}
                  onToggleExpand={onToggleExpand}
                  onChange={onChange}
                  renderItem={renderItem}
                  getSubItems={getSubItems}
                  isSelected={isSelected}
                  hasIndeterminate={hasIndeterminate}
                  isDisabled={isDisabled}
                  customStyles={customStyles}
                  level={level + 1}
                  parentId={item.id}
                  isCounteroffer={isCounteroffer}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

NestedCheckboxList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      selected: PropTypes.bool,
    })
  ).isRequired,
  config: PropTypes.shape({
    itemKey: PropTypes.string,
    childrenKey: PropTypes.string,
    labelKey: PropTypes.string,
  }),
  expanded: PropTypes.objectOf(PropTypes.bool),
  onToggleExpand: PropTypes.func,
  onChange: PropTypes.func,
  renderItem: PropTypes.func,
  getSubItems: PropTypes.func,
  isSelected: PropTypes.func,
  hasIndeterminate: PropTypes.func,
  isDisabled: PropTypes.func,
  customStyles: PropTypes.shape({
    container: PropTypes.string,
    item: PropTypes.string,
    subItems: PropTypes.string,
  }),
  level: PropTypes.number,
  parentId: PropTypes.string,
  isCounteroffer: PropTypes.bool,
};

export default NestedCheckboxList;
