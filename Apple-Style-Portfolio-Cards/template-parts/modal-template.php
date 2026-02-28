<?php
/**
 * Template: Modal Template
 * 
 * Reserved for future use if implementing separate page mode
 * Currently using inline modal approach
 */

if (!defined('ABSPATH')) exit;

?>

<div class="vac-modal-page">
    <button class="vac-close-button" onclick="vacCloseDetail()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </button>
    
    <div class="vac-modal-page-content">
        <!-- Content will be dynamically inserted by JavaScript -->
    </div>
</div>
