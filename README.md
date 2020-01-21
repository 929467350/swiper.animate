# swiper.animate
<p>
demo：<a href='https://929467350.github.io/swiper.animate/example.html'>传送门</a>
</p>
<p>
1.引入模块
</p>
<pre>
<code>
let swiperAnimate=window.swiperAnimate;
let swiperAnimateCache=window.swiperAnimateCache;
</code>
</pre>
<p>
2.初始化
</p>
<pre>
<code>
let mySwiper = new Swiper ('.swiper-container', {
    on:{
      init: function(){
        swiperAnimateCache(this); //隐藏动画元素 
        swiperAnimate(this); //初始化完成开始动画
      }, 
      slideChange: function(){ 
        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
      } 
    }
  })       
</code>
</pre>
3.在需要运动的元素上面增加类名 ani ，swiper.animate需要指定几个参数：
<ul>
<li>value：    切换效果，例如 fadeInUp</li>
<li>delay：    动画延迟时间，例如 0.3s</li>
<li>loop：     动画循环次数，例如 1 (0为无限次)</li>
<li>duration： 动画持续时间，例如 0.5s</li>
</ul>
</p>
<pre>
<code>
&lt;div class="swiper-slide"&gt;
&lt;p class="ani" swiper-animate-effect='[{"value":"fadeInLeft","duration":1,"loop":1,"delay":0}]'&gt;内容 &lt;/p&gt;
&lt;/div&gt;

       // 动态设置动画
        let ani = [{"value": "fadeInRight","duration": 1,"loop": 1,"delay": 0}];
        for (let i = 0; i < 3; i++) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.innerText = '这是一个新的Slide';
            p.className = 'ani';
            p.setAttribute('swiper-animate-effect', JSON.stringify(ani));
            div.appendChild(p);
            div.className = 'swiper-slide';
            mySwiper.addSlide(1, div);
            mySwiper.updateSlides();
        }
</code>
</pre>
