<?php
/**
 * Template: Detail Modal Template
 * 
 * This template is reserved for future use if implementing separate page mode
 * Currently using inline modal approach
 */

if (!defined('ABSPATH')) exit;

?>

<div class="vac-detail-page-wrapper">
    <button class="vac-close-button" onclick="vacCloseDetail()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </button>
    
    <div class="vac-detail-page-content">
        <!-- Content will be dynamically inserted by JavaScript -->
    </div>
</div>
