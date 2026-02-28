<?php
/**
 * Template: Detail Overlay Template
 * 
 * 详细页面模板（预留用于独立页面实现）
 * 当前版本使用全屏覆盖层，此文件用于未来扩展
 */

if (!defined('ABSPATH')) exit;

?>

<div class="vac-detail-page">
    <header class="vac-detail-header">
        <button class="vac-close-button" onclick="vacCloseDetail()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    </header>
    
    <main class="vac-detail-main">
        <div class="vac-detail-content">
            <!-- 内容通过 JavaScript 动态插入 -->
        </div>
    </main>
</div>
