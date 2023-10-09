/**
 * WordPress Dependencies
 */
const {
  __
} = wp.i18n;
const {
  addFilter
} = wp.hooks;
const {
  Fragment
} = wp.element;
const {
  InspectorAdvancedControls
} = wp.blockEditor;
const {
  createHigherOrderComponent
} = wp.compose;
const {
  SelectControl
} = wp.components;

// Restrict the customization to the image block.
const allowedBlocks = ['core/image'];

/**
 * Add custom attribute for controlling fetchpriority.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {
  //check if object exists for old Gutenberg version compatibility
  if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      fetchpriorityAttribute: {
        enum: ['Default', 'High', 'Low'],
        type: 'string'
      }
    });
  }
  return settings;
}

/**
 * Add the control in the Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
    const {
      fetchpriorityAttribute
    } = attributes;
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), isSelected && allowedBlocks.includes(name) && /*#__PURE__*/React.createElement(InspectorAdvancedControls, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Fetchpriority'),
      value: fetchpriorityAttribute,
      options: [{
        label: __('Default'),
        value: false
      }, {
        label: __('High'),
        value: 'high'
      }, {
        label: __('Low'),
        value: 'low'
      }],
      onChange: value => setAttributes({
        fetchpriorityAttribute: value
      }),
      help: __('Set the fetchpriority attribute')
    })));
  };
}, 'withAdvancedControls');
addFilter('blocks.registerBlockType', 'fetchpriorityControl/customAttribute', addAttributes);
addFilter('editor.BlockEdit', 'fetchpriorityControl/customAttributeControls', withAdvancedControls);

