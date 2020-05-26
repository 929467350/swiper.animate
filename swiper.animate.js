/**
 * @author      929467350
 * @variation   1.0.0
 * @date        2020年1月20日
 * @github      https://github.com/929467350/
 * @example     https://929467350.github.io/swiper.animate/example.html
 * @description 基于swiper.js 用于单个节点添加多个动画 支持循环
 */

const swiperAnimate = ( swiper ) => {
    // 初始化或页面发生变化时清除所有待执行节点动画并且隐藏节点
    for ( let ani = document.querySelectorAll( '.ani' ), j = 0; j < ani.length; j++ ) {
        if ( ani[ j ].getAttribute( 'effect' ) ) {
            ani[ j ].style[ 'animation-name' ] = "";
            ani[ j ].style[ 'animation-delay' ] = "";
            ani[ j ].style[ 'visibility' ] = "hidden";
            // 如果动画是无限循环，则不会触发下方回调 所以页面发生变化时清除animation-duration和animation-iteration-count
            ani[ j ].style[ 'animation-duration' ] = '';
            ani[ j ].style[ 'animation-iteration-count' ] = '';
            ani[ j ].removeAttribute( 'effect' );
        }
    }
    const animation = async ( element, animations ) => {
        const run = ( el, animation ) => {
            return new Promise( resolve => {
                let effect = animation.value;
                let style = el.getAttribute( 'style' );
                style = "animation-name:" + effect + ";-webkit-animation-name:" + effect + ';';
                let duration = typeof animation.duration === 'string' ? animation.duration + 's' : animation.duration + 's';
                let delay = typeof animation.delay === 'string' ? animation.delay + 's' : animation.delay + 's';
                let loop = animation.loop;
                if ( loop === 0 || loop === '0' ) {
                    loop = 'infinite';
                }
                el.setAttribute( 'effect', effect );
                duration && ( style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";" )
                delay && ( style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";" )
                loop && ( style = style + "animation-iteration-count:" + loop + ";-webkit-animation-iteration-count:" + loop + ";" )
                el.setAttribute( "style", style );
                // 监听动画执行完毕函数
                const resolveFn = () => {
                    resolve();
                    el.removeEventListener( 'animationend', resolveFn, false );
                    el.removeEventListener( 'animationcancel', resolveFn, false );
                    el.style.visibility = "visible";
                }
                el.addEventListener( 'animationend', resolveFn, false )
                el.addEventListener( 'animationcancel', resolveFn, false );
            } )
        }
        // 让动画跑起来 如果存在多个动画，会等待上次动画执行完毕后继续下个动画;
        for ( let i = 0, len = animations.length; i < len; i++ ) {
            await run( element, animations[ i ] );
        }
    }
    const node = swiper.slides[ swiper.activeIndex ].querySelectorAll( ".ani" );
    node.forEach( element => {
        element.style.visibility = "visible";
        const ani = JSON.parse( element.attributes[ "swiper-animate-effect" ].value );
        animation( element, ani );
    } );
};

window.swiperAnimate = swiperAnimate;
