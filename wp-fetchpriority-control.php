<?php
/**
 * Plugin Name: WP Fetchpriority Control
 * Description:  Control the `fetchpriority` attribute for images. Choose from `Default', 'Low' and 'High' under the advanced image settings.
 * Plugin URI:
 * Version:     1.0
 * Author:      Adam Silverstein, Sabrina Zeidan
 * Author URI:
 * License:     GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Requires PHP: 7.2
 *
 */
const WP_FETCHPRIORITY_CONTROL_VERSION = '1.0';

/**
 * Enqueue the plugin script
 *
 * @return void
 */
function wp_fp_ctl_gutenberg_block_scripts(){
	wp_enqueue_script(
		'wp-fetchpriority-control',
		plugin_dir_url( __FILE__ ) . 'wp-fetchpriority-control_babel.js',
		array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
		WP_FETCHPRIORITY_CONTROL_VERSION
	);
}
add_action( 'enqueue_block_editor_assets', 'wp_fp_ctl_gutenberg_block_scripts' );

/**
 * Customize the block rendering to add the attribute.
 */
function wp_fp_ctl_assign_class( $block_content, $block ) {
	if ( is_admin() ) {
		return $block_content;
	}

	if( 'core/image' !== $block['blockName']) {
		return $block_content;
	}


	// Add the fetchpriority attribute when set.
	if( ! empty( $block['attrs']['fetchpriorityAttribute'] ) ) {
		$processor = new WP_HTML_Tag_Processor( $block_content );
		while( $processor->next_tag( 'img' ) ) {
			$processor->set_attribute( 'fetchpriority', $block['attrs']['fetchpriorityAttribute'] );
		}
		$block_content = $processor->get_updated_html();
	}
	return $block_content;
}
add_filter( 'render_block', 'wp_fp_ctl_assign_class', 10, 3);
