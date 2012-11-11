
        $(function() {
            var $sidescroll = (function() {
                var $rows           = $('#ss-container > div.ss-row'),
                    $rowsViewport, $rowsOutViewport,
                    $links          = $('#ss-links > a'),
                    $win            = $(window),
                    winSize         = {},
                    anim            = false,
                    scollPageSpeed  = 2000 ,
                    scollPageEasing = 'easeInOutExpo',
                    hasPerspective  = false,                    
                    perspective     = hasPerspective && Modernizr.csstransforms3d,
                    // initialize function
                    init            = function() {
                        getWinSize();
                        initEvents();
                        defineViewport();
                        setViewportRows();
                        if( perspective ) {
                            $rows.css({
                                '-webkit-perspective'           : 600,
                                '-webkit-perspective-origin'    : '50% 0%'
                            });
                        }
                        $rowsViewport.find('a.ss-circle').addClass('ss-circle-deco');
                        placeRows();                        
                    },
                    defineViewport  = function() {
                        $.extend( $.expr[':'], {
                            inviewport  : function ( el ) {
                                if ( $(el).offset().top < winSize.height ) {
                                    return true;
                                }
                                return false;
                            }
                        
                        });
                    
                    },
                    setViewportRows = function() {                        
                        $rowsViewport       = $rows.filter(':inviewport');
                        $rowsOutViewport    = $rows.not( $rowsViewport )
                        
                    },
                    getWinSize      = function() {
                        winSize.width   = $win.width();
                        winSize.height  = $win.height();
                    
                    },
                    initEvents      = function() {
                        $links.on( 'click.Scrolling', function( event ) {
                            $('html, body').stop().animate({
                                scrollTop: $( $(this).attr('href') ).offset().top
                            }, scollPageSpeed, scollPageEasing );                            
                            return false;
                        });
                        $(window).on({
                            'resize.Scrolling' : function( event ) {
                                getWinSize();
                                setViewportRows();
                                $rows.find('a.ss-circle').removeClass('ss-circle-deco');
                                $rowsViewport.each( function() {
                                    $(this).find('div.ss-left')
                                           .css({ left   : '0%' })
                                           .end()
                                           .find('div.ss-right')
                                           .css({ right  : '0%' })
                                           .end()
                                           .find('a.ss-circle')
                                           .addClass('ss-circle-deco');
                                });
                            },
                            'scroll.Scrolling' : function( event ) {
                                if( anim ) return false;
                                anim = true;
                                setTimeout( function() {
                                    placeRows();
                                    anim = false;
                                }, 10 );
                            }
                        });
                    },
                    placeRows       = function() {
                        var winscroll   = $win.scrollTop(),
                            winCenter   = winSize.height / 2 + winscroll;
                        $rowsOutViewport.each( function(i) {
                            var $row    = $(this),
                                $rowL   = $row.find('div.ss-left'),
                                $rowR   = $row.find('div.ss-right'),
                                rowT    = $row.offset().top;
                            if( rowT > winSize.height + winscroll ) {
                                if( perspective ) {
                                    $rowL.css({
                                        '-webkit-transform' : 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
                                        'opacity'           : 0
                                    });
                                    $rowR.css({
                                        '-webkit-transform' : 'translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)',
                                        'opacity'           : 0
                                    });
                                }
                                else {
                                    $rowL.css({ left        : '-50%' });
                                    $rowR.css({ right       : '-50%' });
                                }
                            }
                            else {
                                var rowH    = $row.height(),
                                    factor  = ( ( ( rowT + rowH / 2 ) - winCenter ) / (
                                        winSize.height / 2 + rowH / 2 ) ),
                                    val     = Math.max( factor * 50, 0 );
                                if( val <= 0 ) {
                                    if( !$row.data('pointer') ) {
                                        $row.data( 'pointer', true );
                                        $row.find('.ss-circle').addClass('ss-circle-deco');
                                    }
                                }
                                else {
                                    if( $row.data('pointer') ) {
                                        $row.data( 'pointer', false );
                                        $row.find('.ss-circle').removeClass('ss-circle-deco');
                                    }
                                }
                                if( perspective ) {
                                    var t       = Math.max( factor * 75, 0 ),
                                        r       = Math.max( factor * 90, 0 ),
                                        o       = Math.min( Math.abs( factor - 1 ), 1 );
                                    
                                    $rowL.css({
                                        '-webkit-transform' : 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
                                        'opacity'           : o
                                    });
                                    $rowR.css({
                                        '-webkit-transform' : 'translate3d(' + t + '%, 0, 0) rotateY(' + r + 'deg) translate3d(' + t + '%, 0, 0)',
                                        'opacity'           : o
                                    });
                                }
                                else {
                                    $rowL.css({ left    : - val + '%' });
                                    $rowR.css({ right   : - val + '%' });
                                }
                            }   
                        });
                    };
                return { init : init };
            })();
            $sidescroll.init();
        });
