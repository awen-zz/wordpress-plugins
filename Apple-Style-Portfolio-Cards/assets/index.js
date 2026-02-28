(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, SelectControl, Button, ColorPicker, ToggleControl, TextControl, TextareaControl } = wp.components;
    const { Fragment } = wp.element;

    function getDefaultCards() {
        return [
            {
                id: 'card-1',
                width: '372',
                height: '523.55',
                fontSize: '32',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Trail Maintenance',
                subtitle: 'Safe trails for everyone',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Washington Trails Association</h1>',
                detailSubtitle: '<p>Trail Maintenance Volunteer • 2022–Present</p>',
                detailContent: '<h3>Overview</h3><p>Contributed 80+ hours to trail maintenance across Washington State. Participated in 20+ work parties clearing fallen trees, repairing tread, and improving drainage systems.</p><ul><li>Maintained 30+ miles of popular hiking trails</li><li>Coordinated with diverse volunteer teams</li><li>Documented maintenance for future planning</li></ul><blockquote><p>Learned to prioritize under real outdoor constraints while keeping safety non-negotiable.</p></blockquote>',
                showCTA: true,
                ctaText: 'Learn More',
                ctaLink: '#'
            },
            {
                id: 'card-2',
                width: '372',
                height: '523.55',
                fontSize: '32',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Community Events',
                subtitle: 'Connecting neighbors',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Local Environmental Programs</h1>',
                detailSubtitle: '<p>Event Facilitator & Bilingual Communicator • 2021–Present</p>',
                detailContent: '<p>Supported 10+ community events in Greater Seattle, focusing on environmental education and bilingual communication for immigrant communities.</p><h3>Key Achievements</h3><ul><li>10+ events with 20–80 participants each</li><li>Bilingual support (English/Mandarin)</li><li>Improved event feedback loops</li></ul>',
                showCTA: false,
                ctaText: '',
                ctaLink: ''
            },
            {
                id: 'card-3',
                width: '372',
                height: '523.55',
                fontSize: '32',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Tech for Good',
                subtitle: 'Digital impact',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Online Tech-for-Good Initiative</h1>',
                detailSubtitle: '<p>Content & Localization Volunteer • 2020–2023</p>',
                detailContent: '<p>Contributed UX writing and localization for an environmental/education product reaching 10,000+ users.</p><ul><li>3 major product iterations</li><li>Improved completion rates via UX copy</li><li>Localized into Simplified Chinese</li></ul>',
                showCTA: true,
                ctaText: 'View Project',
                ctaLink: '#'
            },
            {
                id: 'card-4',
                width: '372',
                height: '523.55',
                fontSize: '32',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Storytelling',
                subtitle: 'Sharing impact',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Community Arts Group</h1>',
                detailSubtitle: '<p>Storytelling Volunteer • 2019–Present</p>',
                detailContent: '<p>Supported 15+ storytelling events connecting personal narratives to public issues.</p>',
                showCTA: false,
                ctaText: '',
                ctaLink: ''
            },
            {
                id: 'card-5',
                width: '372',
                height: '523.55',
                fontSize: '28',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Environmental Advocacy',
                subtitle: 'Climate action',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Climate Initiative</h1>',
                detailSubtitle: '<p>Volunteer Advocate</p>',
                detailContent: '<p>Placeholder for environmental advocacy work.</p>',
                showCTA: false,
                ctaText: '',
                ctaLink: ''
            },
            {
                id: 'card-6',
                width: '372',
                height: '523.55',
                fontSize: '28',
                textColor: '#ffffff',
                backgroundImage: '',
                title: 'Public Outreach',
                subtitle: 'Amplifying voices',
                showPlus: true,
                galleryImages: [],
                detailTitle: '<h1>Outreach Program</h1>',
                detailSubtitle: '<p>Communications Volunteer</p>',
                detailContent: '<p>Placeholder for public outreach activities.</p>',
                showCTA: false,
                ctaText: '',
                ctaLink: ''
            }
        ];
    }

    registerBlockType('vac/cards', {
        title: 'Volunteer Apple Cards',
        icon: 'heart',
        category: 'media',
        attributes: {
            defaultTextColor: {
                type: 'string',
                default: '#ffffff'
            },
            defaultFontSize: {
                type: 'string',
                default: '32'
            },
            cardGap: {
                type: 'string',
                default: '24px'
            },
            cardsPerRow: {
                type: 'number',
                default: 3
            },
            defaultCardWidth: {
                type: 'string',
                default: '372'
            },
            defaultCardHeight: {
                type: 'string',
                default: '523.55'
            },
            cards: {
                type: 'array',
                default: getDefaultCards()
            }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { defaultTextColor, defaultFontSize, cardGap, cardsPerRow, defaultCardWidth, defaultCardHeight, cards } = attributes;

            const updateCard = (index, key, value) => {
                const newCards = [...cards];
                newCards[index] = { ...newCards[index], [key]: value };
                setAttributes({ cards: newCards });
            };

            const updateCardGallery = (index, images) => {
                const newCards = [...cards];
                newCards[index] = { 
                    ...newCards[index], 
                    galleryImages: images.map(img => ({
                        id: img.id,
                        url: img.url,
                        alt: img.alt || ''
                    }))
                };
                setAttributes({ cards: newCards });
            };

            const removeGalleryImage = (cardIndex, imageIndex) => {
                const newCards = [...cards];
                newCards[cardIndex].galleryImages = newCards[cardIndex].galleryImages.filter((_, i) => i !== imageIndex);
                setAttributes({ cards: newCards });
            };

            const addCard = () => {
                setAttributes({
                    cards: [...cards, {
                        id: 'card-' + (cards.length + 1),
                        width: defaultCardWidth,
                        height: defaultCardHeight,
                        fontSize: defaultFontSize,
                        textColor: defaultTextColor,
                        backgroundImage: '',
                        title: 'New Card',
                        subtitle: 'Add subtitle',
                        showPlus: true,
                        galleryImages: [],
                        detailTitle: '<h1>Detail Title</h1>',
                        detailSubtitle: '<p>Detail Subtitle</p>',
                        detailContent: '<p>Add your content here...</p>',
                        showCTA: false,
                        ctaText: 'Learn More',
                        ctaLink: '#'
                    }]
                });
            };

            const deleteCard = (index) => {
                if (confirm('Are you sure you want to delete this card?')) {
                    const newCards = cards.filter((_, i) => i !== index);
                    setAttributes({ cards: newCards });
                }
            };

            return wp.element.createElement(Fragment, null,
                wp.element.createElement(InspectorControls, null,
                    wp.element.createElement(PanelBody, { title: '🎨 Global Settings', initialOpen: true },
                        wp.element.createElement('div', { className: 'vac-color-picker-wrapper' },
                            wp.element.createElement('label', { className: 'vac-color-picker-label' }, 'Default Text Color'),
                            wp.element.createElement(ColorPicker, {
                                color: defaultTextColor,
                                onChangeComplete: (color) => setAttributes({ defaultTextColor: color.hex })
                            })
                        ),
                        wp.element.createElement(SelectControl, {
                            label: 'Default Font Size',
                            value: defaultFontSize,
                            options: [
                                { label: '24px', value: '24' },
                                { label: '28px', value: '28' },
                                { label: '32px', value: '32' },
                                { label: '36px', value: '36' }
                            ],
                            onChange: (value) => setAttributes({ defaultFontSize: value })
                        }),
                        wp.element.createElement(SelectControl, {
                            label: 'Card Gap',
                            value: cardGap,
                            options: [
                                { label: '16px', value: '16px' },
                                { label: '24px', value: '24px' },
                                { label: '32px', value: '32px' },
                                { label: '48px', value: '48px' }
                            ],
                            onChange: (value) => setAttributes({ cardGap: value })
                        })
                    ),

                    wp.element.createElement(PanelBody, { title: '📐 Layout Settings', initialOpen: false },
                        wp.element.createElement(SelectControl, {
                            label: 'Cards Per Row',
                            value: cardsPerRow,
                            options: [
                                { label: '1', value: 1 },
                                { label: '2', value: 2 },
                                { label: '3', value: 3 },
                                { label: '4', value: 4 }
                            ],
                            onChange: (value) => setAttributes({ cardsPerRow: parseInt(value) })
                        }),
                        wp.element.createElement(TextControl, {
                            label: 'Default Card Width (px)',
                            value: defaultCardWidth,
                            onChange: (value) => setAttributes({ defaultCardWidth: value }),
                            help: 'Enter number only (e.g., 372)'
                        }),
                        wp.element.createElement(TextControl, {
                            label: 'Default Card Height (px)',
                            value: defaultCardHeight,
                            onChange: (value) => setAttributes({ defaultCardHeight: value }),
                            help: 'Enter number only (e.g., 523.55)'
                        })
                    ),

                    cards.map((card, index) =>
                        wp.element.createElement(PanelBody, {
                            key: index,
                            title: `📸 Card #${index + 1}: ${card.title || 'Untitled'}`,
                            initialOpen: false
                        },
                            wp.element.createElement('div', { className: 'vac-card-config' },
                                wp.element.createElement('div', { className: 'vac-card-config-header' },
                                    wp.element.createElement('span', { className: 'vac-card-number' }, `Card ${index + 1}`),
                                    wp.element.createElement('button', {
                                        className: 'vac-delete-card',
                                        onClick: () => deleteCard(index)
                                    }, '🗑 Delete Card')
                                ),
                                
                                wp.element.createElement('div', { className: 'vac-section-title' }, '📏 Dimensions'),
                                wp.element.createElement('div', { className: 'vac-dimension-row' },
                                    wp.element.createElement(TextControl, {
                                        label: 'Card Width (px)',
                                        value: card.width || defaultCardWidth,
                                        onChange: (value) => updateCard(index, 'width', value),
                                        placeholder: '372'
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: 'Card Height (px)',
                                        value: card.height || defaultCardHeight,
                                        onChange: (value) => updateCard(index, 'height', value),
                                        placeholder: '523.55'
                                    })
                                ),
                                
                                wp.element.createElement('div', { className: 'vac-section-title' }, '🎨 Styling'),
                                wp.element.createElement(SelectControl, {
                                    label: 'Font Size',
                                    value: card.fontSize || defaultFontSize,
                                    options: [
                                        { label: '24px', value: '24' },
                                        { label: '28px', value: '28' },
                                        { label: '32px', value: '32' },
                                        { label: '36px', value: '36' }
                                    ],
                                    onChange: (value) => updateCard(index, 'fontSize', value)
                                }),
                                wp.element.createElement('div', { className: 'vac-color-picker-wrapper' },
                                    wp.element.createElement('label', { className: 'vac-color-picker-label' }, 'Text Color'),
                                    wp.element.createElement(ColorPicker, {
                                        color: card.textColor || defaultTextColor,
                                        onChangeComplete: (color) => updateCard(index, 'textColor', color.hex)
                                    })
                                ),
                                wp.element.createElement(MediaUploadCheck, null,
                                    wp.element.createElement(MediaUpload, {
                                        onSelect: (media) => updateCard(index, 'backgroundImage', media.url),
                                        allowedTypes: ['image'],
                                        value: card.backgroundImage,
                                        render: ({ open }) => wp.element.createElement('div', null,
                                            wp.element.createElement(Button, {
                                                onClick: open,
                                                isSecondary: true
                                            }, card.backgroundImage ? 'Change Image' : 'Select Image'),
                                            card.backgroundImage && wp.element.createElement('img', {
                                                src: card.backgroundImage,
                                                className: 'vac-image-preview'
                                            }),
                                            card.backgroundImage && wp.element.createElement('button', {
                                                className: 'vac-remove-image',
                                                onClick: () => updateCard(index, 'backgroundImage', '')
                                            }, 'Remove Image')
                                        )
                                    })
                                ),
                                
                                wp.element.createElement('div', { className: 'vac-section-title' }, '📝 Card Display'),
                                wp.element.createElement(TextControl, {
                                    label: 'Title (max 3 lines)',
                                    value: card.title,
                                    onChange: (value) => updateCard(index, 'title', value)
                                }),
                                wp.element.createElement(TextControl, {
                                    label: 'Subtitle (max 2 lines)',
                                    value: card.subtitle,
                                    onChange: (value) => updateCard(index, 'subtitle', value)
                                }),
                                wp.element.createElement(ToggleControl, {
                                    label: 'Show + Button',
                                    checked: card.showPlus ?? true,
                                    onChange: (value) => updateCard(index, 'showPlus', value)
                                }),
                                
                                wp.element.createElement('div', { className: 'vac-section-title' }, '➕ Detail Page Content'),
                                wp.element.createElement(MediaUploadCheck, null,
                                    wp.element.createElement(MediaUpload, {
                                        onSelect: (media) => updateCardGallery(index, media),
                                        allowedTypes: ['image'],
                                        multiple: true,
                                        gallery: true,
                                        value: (card.galleryImages || []).map(img => img.id),
                                        render: ({ open }) => wp.element.createElement('div', { style: { marginBottom: '16px' } },
                                            wp.element.createElement(Button, {
                                                onClick: open,
                                                isSecondary: true
                                            }, 'Gallery Images (0-5 images)'),
                                            card.galleryImages && card.galleryImages.length > 0 &&
                                            wp.element.createElement('div', { className: 'vac-gallery-images-list' },
                                                card.galleryImages.map((img, imgIndex) =>
                                                    wp.element.createElement('div', {
                                                        key: imgIndex,
                                                        className: 'vac-gallery-image-item'
                                                    },
                                                        wp.element.createElement('img', { src: img.url, alt: img.alt }),
                                                        wp.element.createElement('button', {
                                                            className: 'vac-remove-gallery-image',
                                                            onClick: () => removeGalleryImage(index, imgIndex)
                                                        }, '×')
                                                    )
                                                )
                                            ),
                                            card.galleryImages && card.galleryImages.length > 0 &&
                                            wp.element.createElement('p', { style: { fontSize: '12px', color: '#6e6e73', marginTop: '8px' } },
                                                `${card.galleryImages.length} image${card.galleryImages.length !== 1 ? 's' : ''} selected`
                                            )
                                        )
                                    })
                                ),
                                wp.element.createElement('div', { className: 'vac-rich-text-wrapper' },
                                    wp.element.createElement('label', { className: 'vac-rich-text-label' }, 'Detail Title (HTML: Bold, Italic, Link)'),
                                    wp.element.createElement('textarea', {
                                        value: card.detailTitle,
                                        onChange: (e) => updateCard(index, 'detailTitle', e.target.value),
                                        rows: 3,
                                        className: 'components-textarea-control__input',
                                        style: { width: '100%' }
                                    })
                                ),
                                wp.element.createElement('div', { className: 'vac-rich-text-wrapper' },
                                    wp.element.createElement('label', { className: 'vac-rich-text-label' }, 'Detail Subtitle (HTML: Bold, Italic)'),
                                    wp.element.createElement('textarea', {
                                        value: card.detailSubtitle,
                                        onChange: (e) => updateCard(index, 'detailSubtitle', e.target.value),
                                        rows: 3,
                                        className: 'components-textarea-control__input',
                                        style: { width: '100%' }
                                    })
                                ),
                                wp.element.createElement('div', { className: 'vac-rich-text-wrapper' },
                                    wp.element.createElement('label', { className: 'vac-rich-text-label' }, 'Detail Content (HTML: h2, h3, p, ul, ol, blockquote, img)'),
                                    wp.element.createElement('textarea', {
                                        value: card.detailContent,
                                        onChange: (e) => updateCard(index, 'detailContent', e.target.value),
                                        rows: 10,
                                        className: 'components-textarea-control__input',
                                        style: { width: '100%' }
                                    })
                                ),
                                wp.element.createElement(ToggleControl, {
                                    label: 'Show CTA Button',
                                    checked: card.showCTA || false,
                                    onChange: (value) => updateCard(index, 'showCTA', value)
                                }),
                                card.showCTA && wp.element.createElement(TextControl, {
                                    label: 'CTA Text',
                                    value: card.ctaText,
                                    onChange: (value) => updateCard(index, 'ctaText', value)
                                }),
                                card.showCTA && wp.element.createElement(TextControl, {
                                    label: 'CTA Link',
                                    value: card.ctaLink,
                                    onChange: (value) => updateCard(index, 'ctaLink', value),
                                    placeholder: '#'
                                })
                            )
                        )
                    ),

                    wp.element.createElement(PanelBody, { title: '➕ Add New Card', initialOpen: false },
                        wp.element.createElement('button', {
                            className: 'vac-add-card-button',
                            onClick: addCard
                        }, '+ Add New Card')
                    )
                ),

                wp.element.createElement('div', { className: 'vac-editor-preview' },
                    wp.element.createElement('div', { className: 'vac-editor-grid' },
                        cards.map((card, index) =>
                            wp.element.createElement('div', {
                                key: index,
                                className: 'vac-editor-card',
                                style: {
                                    backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }
                            },
                                wp.element.createElement('div', null,
                                    wp.element.createElement('h3', {
                                        className: 'vac-editor-card-title',
                                        style: { color: card.textColor }
                                    }, card.title),
                                    wp.element.createElement('p', {
                                        className: 'vac-editor-card-subtitle',
                                        style: { color: card.textColor }
                                    }, card.subtitle)
                                ),
                                (card.showPlus ?? true) && wp.element.createElement('div', { className: 'vac-editor-plus' }, '+')
                            )
                        )
                    ),
                    wp.element.createElement('p', { className: 'vac-editor-info' },
                        `${cards.length} cards • ${cardsPerRow} per row • Gap: ${cardGap}`
                    )
                )
            );
        },

        save: function() {
            return null;
        }
    });

})(window.wp);
