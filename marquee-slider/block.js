( function( wp ) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;
    var ColorPalette = wp.components.ColorPalette;
    var Button = wp.components.Button;
    var TextControl = wp.components.TextControl;
    var BaseControl = wp.components.BaseControl;
    var __ = wp.i18n.__;

    registerBlockType( 'awen-zz/marquee-slider', {
        apiVersion: 3,
        title: 'Marquee Slider',
        icon: 'leftright',
        category: 'design',
        attributes: {
            items: {
                type: 'array',
                default: [
                    { text: 'Figma', imageUrl: '' },
                    { text: 'FigJam', imageUrl: '' },
                    { text: 'Dev Mode', imageUrl: '' }
                ]
            },
            textSize: { type: 'number', default: 24 },
            textWeight: { type: 'string', default: '600' },
            textColor: { type: 'string', default: '#000000' },
            imageSize: { type: 'number', default: 40 },
            gap: { type: 'number', default: 48 },
            bgColor: { type: 'string', default: '#ffffff' },
            speed: { type: 'number', default: 20 },
            blockWidth: { type: 'string', default: '100%' },
            blockHeight: { type: 'string', default: 'auto' }
        },
        edit: function( props ) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps({
                className: 'awen-marquee-wrapper',
                style: {
                    '--bg-color': attributes.bgColor,
                    '--text-color': attributes.textColor,
                    '--gap': attributes.gap + 'px',
                    '--speed': attributes.speed + 's',
                    '--text-size': attributes.textSize + 'px',
                    '--text-weight': attributes.textWeight,
                    '--img-size': attributes.imageSize + 'px',
                    '--block-width': attributes.blockWidth,
                    '--block-height': attributes.blockHeight
                }
            });

            var updateItem = function( index, key, value ) {
                var newItems = attributes.items.slice();
                newItems[index] = Object.assign({}, newItems[index]);
                newItems[index][key] = value;
                setAttributes( { items: newItems } );
            };

            var addItem = function() {
                var newItems = attributes.items.slice();
                newItems.push({ text: 'New Item', imageUrl: '' });
                setAttributes( { items: newItems } );
            };

            var removeItem = function( index ) {
                var newItems = attributes.items.slice();
                newItems.splice( index, 1 );
                setAttributes( { items: newItems } );
            };

            var itemsControls = attributes.items.map(function(item, index) {
                var imagePreview = item.imageUrl 
                    ? el( 'img', { src: item.imageUrl, alt: 'preview', style: { width: '40px', height: 'auto', marginTop: '10px', display: 'block' } } ) 
                    : null;

                return el( 'div', { key: index, style: { border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '4px' } },
                    el( TextControl, {
                        label: __( 'Text', 'marquee-slider' ),
                        value: item.text,
                        onChange: function(v) { updateItem(index, 'text', v); }
                    }),
                    el( BaseControl, { label: __( 'Icon / Logo', 'marquee-slider' ) },
                        el( MediaUploadCheck, null,
                            el( MediaUpload, {
                                onSelect: function(media) { updateItem(index, 'imageUrl', media.url); },
                                allowedTypes: ['image'],
                                value: item.imageUrl,
                                render: function( obj ) {
                                    return el( Button, {
                                        variant: 'secondary',
                                        onClick: obj.open,
                                        style: { width: '100%', justifyContent: 'center' }
                                    }, item.imageUrl ? __( 'Change Image', 'marquee-slider' ) : __( 'Select Image', 'marquee-slider' ) );
                                }
                            })
                        )
                    ),
                    imagePreview,
                    el( Button, {
                        variant: 'link',
                        isDestructive: true,
                        onClick: function() { removeItem(index); },
                        style: { marginTop: '10px' }
                    }, __( 'Remove Item', 'marquee-slider' ) )
                );
            });

            var inspectorControls = el( InspectorControls, null,
                el( PanelBody, { title: __( 'Dimensions', 'marquee-slider' ), initialOpen: true },
                    el( TextControl, {
                        label: __( 'Block Width', 'marquee-slider' ),
                        help: __( 'Examples: 100%, 800px, 100vw', 'marquee-slider' ),
                        value: attributes.blockWidth,
                        onChange: function(v) { setAttributes({ blockWidth: v }); }
                    } ),
                    el( TextControl, {
                        label: __( 'Block Height', 'marquee-slider' ),
                        help: __( 'Examples: auto, 120px, 50vh', 'marquee-slider' ),
                        value: attributes.blockHeight,
                        onChange: function(v) { setAttributes({ blockHeight: v }); }
                    } )
                ),
                el( PanelBody, { title: __( 'Marquee Settings', 'marquee-slider' ), initialOpen: false },
                    el( RangeControl, { label: __( 'Scroll Speed (seconds)', 'marquee-slider' ), value: attributes.speed, onChange: function(v) { setAttributes({ speed: v }); }, min: 5, max: 100 } ),
                    el( RangeControl, { label: __( 'Text Size (px)', 'marquee-slider' ), value: attributes.textSize, onChange: function(v) { setAttributes({ textSize: v }); }, min: 12, max: 120 } ),
                    el( SelectControl, {
                        label: __( 'Text Weight', 'marquee-slider' ),
                        value: attributes.textWeight,
                        options: [
                            { label: 'Normal', value: '400' },
                            { label: 'Medium', value: '500' },
                            { label: 'Semi-Bold', value: '600' },
                            { label: 'Bold', value: '700' },
                            { label: 'Extra-Bold', value: '800' }
                        ],
                        onChange: function(v) { setAttributes({ textWeight: v }); }
                    } ),
                    el( RangeControl, { label: __( 'Image/Logo Size (px)', 'marquee-slider' ), value: attributes.imageSize, onChange: function(v) { setAttributes({ imageSize: v }); }, min: 16, max: 120 } ),
                    el( RangeControl, { label: __( 'Gap Between Items (px)', 'marquee-slider' ), value: attributes.gap, onChange: function(v) { setAttributes({ gap: v }); }, min: 0, max: 150 } ),
                    el( BaseControl, { label: __( 'Background Color', 'marquee-slider' ) },
                        el( ColorPalette, { value: attributes.bgColor, onChange: function(v) { setAttributes({ bgColor: v }); } } )
                    ),
                    el( BaseControl, { label: __( 'Text Color', 'marquee-slider' ) },
                        el( ColorPalette, { value: attributes.textColor, onChange: function(v) { setAttributes({ textColor: v }); } } )
                    )
                ),
                el( PanelBody, { title: __( 'Marquee Items', 'marquee-slider' ), initialOpen: false },
                    itemsControls,
                    el( Button, {
                        variant: 'primary',
                        onClick: addItem,
                        style: { width: '100%', justifyContent: 'center' }
                    }, __( 'Add New Item', 'marquee-slider' ) )
                )
            );

            var createMarqueeItem = function(item, index, prefix) {
                var icon = item.imageUrl ? el( 'img', { src: item.imageUrl, alt: item.text, className: 'awen-marquee-icon' } ) : null;
                var text = item.text ? el( 'span', { className: 'awen-marquee-text' }, item.text ) : null;
                return el( 'div', { key: prefix + index, className: 'awen-marquee-item' }, icon, text );
            };

            var marqueeItemsElements = attributes.items.map(function(item, index) {
                return createMarqueeItem(item, index, 'orig-');
            });

            var dupMarqueeItemsElements = attributes.items.map(function(item, index) {
                return createMarqueeItem(item, index, 'dup-');
            });

            var track = el( 'div', { className: 'awen-marquee-track' },
                el( 'div', { className: 'awen-marquee-content' }, marqueeItemsElements ),
                el( 'div', { className: 'awen-marquee-content', 'aria-hidden': true }, dupMarqueeItemsElements )
            );

            return el( 'div', blockProps, inspectorControls, track );
        },
        save: function( props ) {
            var attributes = props.attributes;

            var blockProps = useBlockProps.save({
                className: 'awen-marquee-wrapper',
                style: {
                    '--bg-color': attributes.bgColor,
                    '--text-color': attributes.textColor,
                    '--gap': attributes.gap + 'px',
                    '--speed': attributes.speed + 's',
                    '--text-size': attributes.textSize + 'px',
                    '--text-weight': attributes.textWeight,
                    '--img-size': attributes.imageSize + 'px',
                    '--block-width': attributes.blockWidth,
                    '--block-height': attributes.blockHeight
                }
            });

            var createMarqueeItem = function(item, index, prefix) {
                var icon = item.imageUrl ? el( 'img', { src: item.imageUrl, alt: item.text, className: 'awen-marquee-icon' } ) : null;
                var text = item.text ? el( 'span', { className: 'awen-marquee-text' }, item.text ) : null;
                return el( 'div', { key: prefix + index, className: 'awen-marquee-item' }, icon, text );
            };

            var marqueeItemsElements = attributes.items.map(function(item, index) {
                return createMarqueeItem(item, index, 'orig-');
            });

            var dupMarqueeItemsElements = attributes.items.map(function(item, index) {
                return createMarqueeItem(item, index, 'dup-');
            });

            var track = el( 'div', { className: 'awen-marquee-track' },
                el( 'div', { className: 'awen-marquee-content' }, marqueeItemsElements ),
                el( 'div', { className: 'awen-marquee-content', 'aria-hidden': true }, dupMarqueeItemsElements )
            );

            return el( 'div', blockProps, track );
        }
    });
} )( window.wp );
