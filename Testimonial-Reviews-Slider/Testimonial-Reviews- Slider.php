<?php
/**
 * Plugin Name: Testimonial Reviews Slider
 * Description: A responsive testimonial slider. Features: Custom block width/height, custom quote marks, flexible text alignment, and italic support.
 * Version: 1.6.0
 * Author: Awen-zz
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ctsb_register_blocks() {
    wp_register_script(
        'ctsb-block-js',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );

    wp_register_style(
        'ctsb-editor-css',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

    wp_register_style(
        'ctsb-style-css',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    wp_register_script(
        'ctsb-frontend-js',
        plugins_url( 'frontend.js', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'frontend.js' ),
        true
    );

    register_block_type( 'custom/testimonial-slider', array(
        'editor_script' => 'ctsb-block-js',
        'editor_style'  => 'ctsb-editor-css',
        'style'         => 'ctsb-style-css',
        'script'        => 'ctsb-frontend-js',
    ) );

    register_block_type( 'custom/testimonial-slide', array(
        'editor_script' => 'ctsb-block-js',
        'editor_style'  => 'ctsb-editor-css',
        'style'         => 'ctsb-style-css',
    ) );
}
add_action( 'init', 'ctsb_register_blocks' );
