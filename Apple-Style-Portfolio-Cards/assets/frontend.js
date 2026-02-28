function vacOpenDetail(index) {
    if (typeof vacCardsData === 'undefined' || !vacCardsData[index]) return;
    
    const card = vacCardsData[index];
    const modal = document.getElementById('vac-detail-modal');
    
    const galleryContainer = modal.querySelector('.vac-gallery-container');
    const titleEl = modal.querySelector('.vac-detail-title');
    const subtitleEl = modal.querySelector('.vac-detail-subtitle');
    const bodyEl = modal.querySelector('.vac-detail-body');
    const ctaEl = modal.querySelector('.vac-cta-button');
    
    galleryContainer.innerHTML = '';
    if (card.galleryImages && card.galleryImages.length > 0) {
        const galleryScroll = document.createElement('div');
        galleryScroll.className = 'vac-gallery-scroll';
        
        card.galleryImages.forEach((img, i) => {
            const item = document.createElement('div');
            item.className = 'vac-gallery-item';
            const image = document.createElement('img');
            image.src = img.url;
            image.alt = img.alt || '';
            item.appendChild(image);
            galleryScroll.appendChild(item);
        });
        
        galleryContainer.appendChild(galleryScroll);
    }
    
    titleEl.innerHTML = card.detailTitle || '';
    subtitleEl.innerHTML = card.detailSubtitle || '';
    bodyEl.innerHTML = card.detailContent || '';
    
    if (card.showCTA && card.ctaText) {
        ctaEl.textContent = card.ctaText;
        ctaEl.href = card.ctaLink || '#';
        ctaEl.style.display = 'inline-block';
    } else {
        ctaEl.style.display = 'none';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function vacCloseDetail() {
    const modal = document.getElementById('vac-detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('vac-detail-modal');
    if (modal && modal.classList.contains('active') && e.key === 'Escape') {
        vacCloseDetail();
    }
});

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('vac-detail-modal');
    if (!modal) return;
    
    const modalContainer = modal.querySelector('.vac-modal-container');
    if (!modalContainer) return;
    
    modalContainer.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    modalContainer.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
});

function handleSwipe() {
    if (touchEndY > touchStartY + 100) {
        vacCloseDetail();
    }
}
