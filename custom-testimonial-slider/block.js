(function(blocks, element, blockEditor, components) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;

    var InspectorControls = blockEditor.InspectorControls;
    var PanelColorSettings = blockEditor.PanelColorSettings;
    var InnerBlocks = blockEditor.InnerBlocks;
    var RichText = blockEditor.RichText;
    var useBlockProps = blockEditor.useBlockProps;

    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;
    var BaseControl = components.BaseControl;
    var TextControl = components.TextControl;

    // Parent: Slider
    registerBlockType('custom/testimonial-slider', {
        title: 'Testimonial Slider',
        icon: 'slides',
        category: 'design',
        description: 'A responsive slider container for testimonial slides.',
        attributes: {
            autoPlay: { type: 'boolean', default: false },
            interval: { type: 'number', default: 5000 },
            showDots: { type: 'boolean', default: true },
            showArrows: { type: 'boolean', default: true },

            // New Dimensions Attributes
            blockMaxWidth: { type: 'string', default: '100%' },
            blockMinHeight: { type: 'string', default: 'auto' }
        },
        supports: { html: false },
        edit: function(props) {
            var a = props.attributes;
            var setAttributes = props.setAttributes;

            var sliderStyle = {
                maxWidth: a.blockMaxWidth !== '' ? a.blockMaxWidth : '100%',
                margin: '0 auto',
                width: '100%'
            };

            var trackStyle = {
                minHeight: (a.blockMinHeight && a.blockMinHeight !== 'auto') ? a.blockMinHeight : undefined
            };

            var blockProps = useBlockProps({ 
                className: 'ctsb-slider-editor',
                style: sliderStyle 
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Size & Dimensions', initialOpen: true },
                        el(TextControl, {
                            label: 'Max Width (e.g. 100%, 800px, 80vw)',
                            value: a.blockMaxWidth,
                            onChange: function(val) { setAttributes({ blockMaxWidth: val }); },
                            help: 'Set the maximum width. It will scale down naturally on smaller screens.'
                        }),
                        el(TextControl, {
                            label: 'Min Height (e.g. auto, 300px, 50vh)',
                            value: a.blockMinHeight,
                            onChange: function(val) { setAttributes({ blockMinHeight: val }); },
                            help: 'Ensures the block is at least this tall across all slides.'
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Slider settings', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Auto play',
                            checked: a.autoPlay,
                            onChange: function(val) { setAttributes({ autoPlay: val }); }
                        }),
                        a.autoPlay && el(RangeControl, {
                            label: 'Interval (seconds)',
                            value: Math.round((a.interval || 5000) / 1000),
                            onChange: function(val) { setAttributes({ interval: val * 1000 }); },
                            min: 2,
                            max: 15
                        }),
                        el(ToggleControl, {
                            label: 'Show arrows',
                            checked: a.showArrows,
                            onChange: function(val) { setAttributes({ showArrows: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Show dots',
                            checked: a.showDots,
                            onChange: function(val) { setAttributes({ showDots: val }); }
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { className: 'ctsb-editor-hint' }, 'Testimonial Slider (' + (a.blockMaxWidth || '100%') + ' Width)'),
                    el(InnerBlocks, {
                        allowedBlocks: ['custom/testimonial-slide'],
                        template: [['custom/testimonial-slide', {}]],
                        templateLock: false
                    })
                )
            );
        },
        save: function(props) {
            var a = props.attributes;

            var sliderStyle = {
                maxWidth: a.blockMaxWidth !== '' ? a.blockMaxWidth : '100%',
                margin: '0 auto',
                width: '100%'
            };

            var trackStyle = {
                minHeight: (a.blockMinHeight && a.blockMinHeight !== 'auto') ? a.blockMinHeight : undefined
            };

            var blockProps = useBlockProps.save({
                className: 'ctsb-slider',
                'data-autoplay': a.autoPlay,
                'data-interval': a.interval,
                'data-dots': a.showDots,
                'data-arrows': a.showArrows,
                style: sliderStyle
            });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ctsb-track-wrapper' },
                    el('div', { className: 'ctsb-track', style: trackStyle }, el(InnerBlocks.Content))
                ),
                a.showArrows && el('button', { className: 'ctsb-arrow ctsb-prev', type: 'button', 'aria-label': 'Previous' }, '‹'),
                a.showArrows && el('button', { className: 'ctsb-arrow ctsb-next', type: 'button', 'aria-label': 'Next' }, '›'),
                a.showDots && el('div', { className: 'ctsb-dots', 'aria-hidden': 'true' })
            );
        }
    });

    // Child: Slide
    registerBlockType('custom/testimonial-slide', {
        title: 'Testimonial Slide',
        icon: 'format-quote',
        parent: ['custom/testimonial-slider'],
        category: 'design',
        attributes: {
            quote: { type: 'string', source: 'html', selector: '.ctsb-quote' },
            author: { type: 'string', source: 'html', selector: '.ctsb-author' },

            bgColor: { type: 'string', default: '#ffffff' },

            // Quote Marks Styling
            quoteMarkColor: { type: 'string', default: '#e8f1ef' },
            quoteMarkSize: { type: 'number', default: 120 },
            quoteMarkOpacity: { type: 'number', default: 1.0 },

            // Quote Marks Positioning (Offsets)
            qmTop: { type: 'number', default: 20 },
            qmLeft: { type: 'number', default: 20 },
            qmBottom: { type: 'number', default: 20 },
            qmRight: { type: 'number', default: 20 },

            // Main Text Styling
            quoteColor: { type: 'string', default: '#1a5e4b' },
            quoteFontSize: { type: 'number', default: 26 },
            quoteFontWeight: { type: 'string', default: '400' },
            quoteLineHeight: { type: 'number', default: 1.45 },
            quoteAlign: { type: 'string', default: 'left' },
            quoteItalic: { type: 'boolean', default: true },

            // Author Styling
            authorColor: { type: 'string', default: '#1a5e4b' },
            authorFontSize: { type: 'number', default: 18 },
            authorFontWeight: { type: 'string', default: '600' },
            authorAlign: { type: 'string', default: 'center' },

            padding: { type: 'number', default: 44 },
            radius: { type: 'number', default: 15 }
        },
        supports: { reusable: true, html: false },

        edit: function(props) {
            var a = props.attributes;
            var setAttributes = props.setAttributes;

            var cardStyle = {
                backgroundColor: a.bgColor,
                borderRadius: a.radius + 'px',
                boxShadow: '0 10px 30px rgba(17, 24, 39, 0.08)',
                padding: a.padding + 'px',
                position: 'relative',
                overflow: 'hidden'
            };

            var qmBase = {
                color: a.quoteMarkColor,
                position: 'absolute',
                fontSize: a.quoteMarkSize + 'px',
                lineHeight: '0.8',
                fontFamily: 'Georgia, serif',
                opacity: a.quoteMarkOpacity,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0
            };

            var quoteStyle = {
                color: a.quoteColor,
                fontSize: a.quoteFontSize + 'px',
                fontWeight: a.quoteFontWeight,
                lineHeight: String(a.quoteLineHeight),
                textAlign: a.quoteAlign,
                fontStyle: a.quoteItalic ? 'italic' : 'normal',
                position: 'relative',
                zIndex: 2,
                margin: 0
            };

            var authorStyle = {
                color: a.authorColor,
                fontSize: a.authorFontSize + 'px',
                fontWeight: a.authorFontWeight,
                textAlign: a.authorAlign,
                position: 'relative',
                zIndex: 2,
                marginTop: '22px'
            };

            var blockProps = useBlockProps({ className: 'ctsb-slide-editor' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Card Container', initialOpen: true },
                        el(RangeControl, {
                            label: 'Padding (px)',
                            value: a.padding,
                            onChange: function(val) { setAttributes({ padding: val }); },
                            min: 16,
                            max: 96
                        }),
                        el(RangeControl, {
                            label: 'Corner radius (px)',
                            value: a.radius,
                            onChange: function(val) { setAttributes({ radius: val }); },
                            min: 0,
                            max: 40
                        }),
                         el(PanelColorSettings, {
                            title: 'Background Color',
                            colorSettings: [
                                { value: a.bgColor, onChange: function(val){ setAttributes({ bgColor: val }); }, label: 'Background' }
                            ]
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Quotation Marks', initialOpen: false },
                        el(PanelColorSettings, {
                            title: 'Color',
                            colorSettings: [
                                { value: a.quoteMarkColor, onChange: function(val) { setAttributes({ quoteMarkColor: val }); }, label: 'Mark Color' }
                            ]
                        }),
                        el(RangeControl, { label: 'Size (px)', value: a.quoteMarkSize, onChange: function(val) { setAttributes({ quoteMarkSize: val }); }, min: 40, max: 400 }),
                        el(RangeControl, { label: 'Opacity', value: Math.round(a.quoteMarkOpacity * 100), onChange: function(val) { setAttributes({ quoteMarkOpacity: val / 100 }); }, min: 10, max: 100 }),
                        el(BaseControl, { label: 'Position Offsets (px)' }, 
                            el(element.Fragment, null, 
                                el(RangeControl, { label: 'Top (Opening)', value: a.qmTop, onChange: function(v){ setAttributes({qmTop: v}); }, min: -50, max: 150 }),
                                el(RangeControl, { label: 'Left (Opening)', value: a.qmLeft, onChange: function(v){ setAttributes({qmLeft: v}); }, min: -50, max: 150 }),
                                el(RangeControl, { label: 'Bottom (Closing)', value: a.qmBottom, onChange: function(v){ setAttributes({qmBottom: v}); }, min: -50, max: 150 }),
                                el(RangeControl, { label: 'Right (Closing)', value: a.qmRight, onChange: function(v){ setAttributes({qmRight: v}); }, min: -50, max: 150 })
                            )
                        )
                    ),
                    el(
                        PanelBody,
                        { title: 'Main Text', initialOpen: false },
                        el(SelectControl, { label: 'Alignment', value: a.quoteAlign, options: [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ], onChange: function(val) { setAttributes({ quoteAlign: val }); } }),
                        el(ToggleControl, { label: 'Italic', checked: !!a.quoteItalic, onChange: function(val) { setAttributes({ quoteItalic: val }); } }),
                        el(RangeControl, { label: 'Font size (px)', value: a.quoteFontSize, onChange: function(val) { setAttributes({ quoteFontSize: val }); }, min: 14, max: 60 }),
                        el(SelectControl, { label: 'Font weight', value: a.quoteFontWeight, options: [ { label: 'Light', value: '300' }, { label: 'Normal', value: '400' }, { label: 'Semi-bold', value: '600' }, { label: 'Bold', value: '700' } ], onChange: function(val) { setAttributes({ quoteFontWeight: val }); } }),
                        el(PanelColorSettings, { title: 'Text Color', colorSettings: [ { value: a.quoteColor, onChange: function(val){ setAttributes({ quoteColor: val }); }, label: 'Text Color' } ] })
                    ),
                    el(
                        PanelBody,
                        { title: 'Author / Subtitle', initialOpen: false },
                        el(SelectControl, { label: 'Alignment', value: a.authorAlign, options: [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ], onChange: function(val) { setAttributes({ authorAlign: val }); } }),
                        el(RangeControl, { label: 'Font size (px)', value: a.authorFontSize, onChange: function(val) { setAttributes({ authorFontSize: val }); }, min: 12, max: 40 }),
                        el(PanelColorSettings, { title: 'Author Color', colorSettings: [ { value: a.authorColor, onChange: function(val){ setAttributes({ authorColor: val }); }, label: 'Author Color' } ] })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ctsb-card', style: cardStyle },
                        el('span', { className: 'ctsb-qm ctsb-qm-open', style: Object.assign({}, qmBase, { top: a.qmTop + 'px', left: a.qmLeft + 'px' }) }, '“'),
                        el('span', { className: 'ctsb-qm ctsb-qm-close', style: Object.assign({}, qmBase, { bottom: a.qmBottom + 'px', right: a.qmRight + 'px' }) }, '”'),
                        el(RichText, { tagName: 'p', className: 'ctsb-quote', style: quoteStyle, value: a.quote, onChange: function(val) { setAttributes({ quote: val }); }, placeholder: 'Write the testimonial here...' }),
                        el(RichText, { tagName: 'div', className: 'ctsb-author', style: authorStyle, value: a.author, onChange: function(val) { setAttributes({ author: val }); }, placeholder: 'Name / Title' })
                    )
                )
            );
        },

        save: function(props) {
            var a = props.attributes;
            var cardStyle = { backgroundColor: a.bgColor, borderRadius: a.radius + 'px', boxShadow: '0 10px 30px rgba(17, 24, 39, 0.08)', padding: a.padding + 'px', position: 'relative', overflow: 'hidden' };
            var qmBaseCSS = 'color:' + a.quoteMarkColor + '; position:absolute; font-size:' + a.quoteMarkSize + 'px; line-height:0.8; font-family:Georgia, serif; opacity:' + a.quoteMarkOpacity + '; pointer-events:none; user-select:none; z-index:0;';
            var qmStyleOpen = qmBaseCSS + ' top:' + a.qmTop + 'px; left:' + a.qmLeft + 'px;';
            var qmStyleClose = qmBaseCSS + ' bottom:' + a.qmBottom + 'px; right:' + a.qmRight + 'px;';
            var quoteStyle = 'color:' + a.quoteColor + '; font-size:' + a.quoteFontSize + 'px; font-weight:' + a.quoteFontWeight + '; line-height:' + a.quoteLineHeight + '; text-align:' + a.quoteAlign + '; font-style:' + (a.quoteItalic ? 'italic' : 'normal') + '; position:relative; z-index:2; margin:0;';
            var authorStyle = 'color:' + a.authorColor + '; font-size:' + a.authorFontSize + 'px; font-weight:' + a.authorFontWeight + '; text-align:' + a.authorAlign + '; position:relative; z-index:2; margin-top:22px;';

            return el(
                'div',
                useBlockProps.save({ className: 'ctsb-slide' }),
                el(
                    'div',
                    { className: 'ctsb-card', style: cardStyle },
                    el('span', { className: 'ctsb-qm ctsb-qm-open', style: qmStyleOpen }, '“'),
                    el('span', { className: 'ctsb-qm ctsb-qm-close', style: qmStyleClose }, '”'),
                    el(RichText.Content, { tagName: 'p', className: 'ctsb-quote', style: quoteStyle, value: a.quote }),
                    el(RichText.Content, { tagName: 'div', className: 'ctsb-author', style: authorStyle, value: a.author })
                )
            );
        }
    });

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
