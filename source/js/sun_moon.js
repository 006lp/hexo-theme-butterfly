function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
        setTimeout(function () {
            document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), saveToLocal.set('isDark', '0', 1), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), saveToLocal.set('isDark', '1', 1), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),

                setTimeout(function () {
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                    setTimeout(function () {
                        document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                    }, 1e3);
                }, 2e3);
        });

    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (nowMode === 'light') {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        btf.activateDarkMode(); // 改为 btf.activateDarkMode()
        saveToLocal.set('theme', 'dark', 1); // 保存主题，1天过期
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

        // 延时弹窗提醒
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
            });
        }, 2000);
    } else {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        btf.activateLightMode(); // 改为 btf.activateLightMode()
        saveToLocal.set('theme', 'light', 1); // 保存主题，1天过期
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
            });
        }, 2000);
    }

    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
