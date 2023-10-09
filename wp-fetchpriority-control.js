/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment }	= wp.element;
const { InspectorAdvancedControls }	=  wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const { SelectControl } = wp.components;

// Restrict the customization to the image block.
const allowedBlocks = [ 'core/image' ];

/**
 * Add custom attribute for controlling fetchpriority.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes( settings, extraAttributes ) {

	//check if object exists for old Gutenberg version compatibility
	if( typeof settings.attributes !== 'undefined' && allowedBlocks.includes( settings.name ) ){
		settings.attributes = Object.assign( settings.attributes, {
			fetchpriority: {
				type: 'string',
			}
		} );
	}
	return settings;
}
addFilter( 'blocks.registerBlockType', 'fetchpriorityControl/customAttribute', addAttributes );

/**
 * Add the control in the Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			setAttributes,
			isSelected,
		} = props;
		const {
			fetchpriority,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{ isSelected && allowedBlocks.includes( name ) &&
					<InspectorAdvancedControls>
						<SelectControl
							label={ __( 'Fetchpriority' ) }
							value={ fetchpriority }
							options={ [
								{ label: __( 'Default' ), value: '' },
								{ label: __( 'High' ), value: 'high' },
								{ label: __( 'Low' ), value: 'low' },
							] }
							onChange={ ( value ) => {
								setAttributes( { fetchpriority: value } )
							} }
							help={ __( 'Set the fetchpriority attribute' ) }
						/>
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	};
}, 'withAdvancedControls');

addFilter( 'editor.BlockEdit', 'fetchpriorityControl/customAttributeControls', withAdvancedControls );
