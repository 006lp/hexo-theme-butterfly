function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
        setTimeout(function () {
            // 切换模式：如果当前是夜间模式，切换到白天模式
            if (document.querySelector('body').classList.contains('DarkMode')) {
                document.querySelector('body').classList.remove('DarkMode');
                localStorage.setItem('isDark', '0'); // 保存为白天模式
                document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

                // 使用 btf.activateLightMode() 切换到白天模式
                btf.activateLightMode();

                // 设置太阳月亮的透明度
                document.getElementById("sun").style.opacity = "1";
                document.getElementById("moon").style.opacity = "0";
            } else {
                document.querySelector('body').classList.add('DarkMode');
                localStorage.setItem('isDark', '1'); // 保存为夜间模式
                document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

                // 使用 btf.activateDarkMode() 切换到夜间模式
                btf.activateDarkMode();

                // 设置太阳月亮的透明度
                document.getElementById("sun").style.opacity = "0";
                document.getElementById("moon").style.opacity = "1";
            }

            // 3秒后移除动画元素
            setTimeout(function () {
                document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                setTimeout(function () {
                    document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                }, 1000);
            }, 2000);
        });

    // 判断当前页面的模式
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (nowMode === 'light') {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        // 使用 btf.activateDarkMode() 切换到夜间模式
        btf.activateDarkMode();

        // 将主题存储到 localStorage
        localStorage.setItem('theme', 'dark');

        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

        // 显示切换成功的提示
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "关灯啦🌙",
                        message: "当前已成功切换至夜间模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000);
    } else {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        // 使用 btf.activateLightMode() 切换到白天模式
        btf.activateLightMode();

        // 将主题存储到 localStorage
        localStorage.setItem('theme', 'light');

        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "开灯啦🌞",
                        message: "当前已成功切换至白天模式！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            })
        }, 2000);
    }

    // 处理其他情况
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
