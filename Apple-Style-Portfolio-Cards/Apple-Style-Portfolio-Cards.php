<?php
/**
 * Plugin Name: Apple-Style-Portfolio-Cards
 * Description: Apple website style portflio cards with customizable dimensions
 * Version: 2.1.0
 * Author: Awen-zz
 */

if (!defined('ABSPATH')) exit;

define('VAC_VERSION', '2.1.0');
define('VAC_PATH', plugin_dir_path(__FILE__));
define('VAC_URL', plugin_dir_url(__FILE__));

function vac_register_block() {
    wp_register_script(
        'vac-block-editor',
        VAC_URL . 'assets/index.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-data'),
        VAC_VERSION
    );
    
    wp_register_style(
        'vac-block-style',
        VAC_URL . 'assets/style.css',
        array(),
        VAC_VERSION
    );
    
    wp_register_style(
        'vac-block-editor-style',
        VAC_URL . 'assets/editor.css',
        array('vac-block-style'),
        VAC_VERSION
    );
    
    wp_register_script(
        'vac-frontend',
        VAC_URL . 'assets/frontend.js',
        array(),
        VAC_VERSION,
        true
    );
    
    register_block_type(VAC_PATH . 'assets/block.json', array(
        'editor_script' => 'vac-block-editor',
        'editor_style' => 'vac-block-editor-style',
        'style' => 'vac-block-style',
        'script' => 'vac-frontend',
        'render_callback' => 'vac_render_block'
    ));
}
add_action('init', 'vac_register_block');

function vac_get_default_cards() {
    return array(
        array(
            'id' => 'card-1',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '32',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text here • 2022–Present</p>',
            \1'text text text here',
            'showCTA' => true,
            \1'text text text here',
            'ctaLink' => '#'
        ),
        array(
            'id' => 'card-2',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '32',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text here • 2021–Present</p>',
            \1'text text text here',
            'showCTA' => false,
            \1'text text text here',
            'ctaLink' => ''
        ),
        array(
            'id' => 'card-3',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '32',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text here • 2020–2023</p>',
            \1'text text text here',
            'showCTA' => true,
            \1'text text text here',
            'ctaLink' => '#'
        ),
        array(
            'id' => 'card-4',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '32',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text here • 2019–Present</p>',
            \1'text text text here',
            'showCTA' => false,
            \1'text text text here',
            'ctaLink' => ''
        ),
        array(
            'id' => 'card-5',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '28',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text heree</p>',
            \1'text text text here',
            'showCTA' => false,
            \1'text text text here',
            'ctaLink' => ''
        ),
        array(
            'id' => 'card-6',
            'width' => '372',
            'height' => '523.55',
            'fontSize' => '28',
            'textColor' => '#ffffff',
            'backgroundImage' => '',
            \1'text text text here',
            \1'text text text here',
            'showPlus' => true,
            'galleryImages' => array(),
            \1'text text text here',
            'detailSubtitle' => '<p>text text text here</p>',
            \1'text text text here',
            'showCTA' => false,
            \1'text text text here',
            'ctaLink' => ''
        )
    );
}

function vac_render_block($attributes) {
    $defaults = array(
        'defaultTextColor' => '#ffffff',
        'defaultFontSize' => '32',
        'cardGap' => '24px',
        'cardsPerRow' => 3,
        'defaultCardWidth' => '372',
        'defaultCardHeight' => '523.55',
        'cards' => vac_get_default_cards()
    );
    
    $attrs = wp_parse_args($attributes, $defaults);
    $unique_id = 'vac-' . uniqid();
    
    ob_start();
    ?>
    <div class="vac-container" 
         id="<?php echo esc_attr($unique_id); ?>"
         style="--card-gap: <?php echo esc_attr($attrs['cardGap']); ?>; --cards-per-row: <?php echo esc_attr($attrs['cardsPerRow']); ?>;">
        <div class="vac-grid">
            <?php foreach ($attrs['cards'] as $index => $card): ?>
                <div class="vac-card volunteer-apple-card" 
                     data-card-index="<?php echo $index; ?>"
                     style="<?php 
                         echo 'width: ' . esc_attr($card['width'] ?? $attrs['defaultCardWidth']) . 'px;';
                         echo 'height: ' . esc_attr($card['height'] ?? $attrs['defaultCardHeight']) . 'px;';
                         if (!empty($card['backgroundImage'])) {
                             echo 'background-image: url(' . esc_url($card['backgroundImage']) . ');';
                         } else {
                             echo 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
                         }
                     ?>">
                    <div class="card-content">
                        <div class="card-text">
                            <h3 class="card-title" 
                                style="color: <?php echo esc_attr($card['textColor'] ?? $attrs['defaultTextColor']); ?>; font-size: <?php echo esc_attr($card['fontSize'] ?? $attrs['defaultFontSize']); ?>px;">
                                <?php echo esc_html($card['title']); ?>
                            </h3>
                            <p class="card-subtitle" 
                               style="color: <?php echo esc_attr($card['textColor'] ?? $attrs['defaultTextColor']); ?>;">
                                <?php echo esc_html($card['subtitle']); ?>
                            </p>
                        </div>
                    </div>
                    <?php if ($card['showPlus'] ?? true): ?>
                        <button class="card-plus" 
                                onclick="vacOpenDetail(<?php echo $index; ?>)"
                                aria-label="View details">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <div class="vac-detail-modal" id="vac-detail-modal">
        <div class="vac-modal-overlay" onclick="vacCloseDetail()"></div>
        <div class="vac-modal-container">
            <button class="vac-close-button" onclick="vacCloseDetail()" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="vac-modal-content">
                <div class="vac-gallery-container"></div>
                <div class="vac-detail-title"></div>
                <div class="vac-detail-subtitle"></div>
                <div class="vac-detail-body"></div>
                <a href="#" class="vac-cta-button" style="display:none;"></a>
            </div>
        </div>
    </div>
    
    <script>
    var vacCardsData = <?php echo json_encode($attrs['cards'], JSON_UNESCAPED_UNICODE); ?>;
    </script>
    <?php
    return ob_get_clean();
}

require_once VAC_PATH . 'includes/shortcode.php';
