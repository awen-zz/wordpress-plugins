<?php
/**
 * Plugin Name:       Marquee Slider
 * Description:       An infinite scrolling marquee block for displaying text and pictures.
 * Version:           1.1.0
 * Author:            Awen-zz
 * Text Domain:       marquee-slider
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function awen_zz_marquee_slider_block_init() {
    wp_register_script(
        'marquee-slider-block-editor',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );

    wp_register_style(
        'marquee-slider-block-style',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    register_block_type( 'awen-zz/marquee-slider', array(
        'api_version'   => 3,
        'editor_script' => 'marquee-slider-block-editor',
        'editor_style'  => 'marquee-slider-block-style',
        'style'         => 'marquee-slider-block-style',
    ) );
}
add_action( 'init', 'awen_zz_marquee_slider_block_init' );
