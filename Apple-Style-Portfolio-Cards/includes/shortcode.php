<?php
/**
 * Shortcode: [volunteer_cards]
 * 
 * Usage:
 * [volunteer_cards]
 * [volunteer_cards cards_per_row="4" gap="32px"]
 */

if (!defined('ABSPATH')) exit;

function vac_shortcode($atts) {
    $atts = shortcode_atts(array(
        'cards_per_row' => '3',
        'gap' => '24px'
    ), $atts);
    
    $block_attrs = array(
        'cardsPerRow' => intval($atts['cards_per_row']),
        'cardGap' => $atts['gap']
    );
    
    return vac_render_block($block_attrs);
}
add_shortcode('volunteer_cards', 'vac_shortcode');
