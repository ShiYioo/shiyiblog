<link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap" rel="stylesheet">

<style scoped>
    /* 浅色模式变量 */
    .welcome-page-wrapper {
        --main-bg: linear-gradient(to bottom, #fff, #f5f5ff);
        --main-border: #000;
        --main-text: #333;
        --main-shadow: rgba(0,0,0,0.1);
        --tip-bg: #fff0f5;
        --tip-border: #e74c3c;
        --tip-text: #8e44ad;
        --alipay-border: #9b59b6;
        --alipay-bg: linear-gradient(to bottom, #fff, #f9f0ff);
        --alipay-text: #9b59b6;
        --wechat-border: #42b983;
        --wechat-bg: linear-gradient(to bottom, #fff, #ebfdf2);
        --wechat-text: #42b983;
        --card-shadow: rgba(0,0,0,0.1);
        --link-color: #3eaf7c;
    }
    
    /* 黑暗模式变量 */
    html.dark .welcome-page-wrapper,
    body.dark .welcome-page-wrapper,
    [data-theme="dark"] .welcome-page-wrapper {
        --main-bg: linear-gradient(to bottom, #1a1a1a, #2a2a3e);
        --main-border: #666;
        --main-text: #e0e0e0;
        --main-shadow: rgba(255,255,255,0.1);
        --tip-bg: #3a2a35;
        --tip-border: #e74c3c;
        --tip-text: #d8a8e8;
        --alipay-border: #b389c9;
        --alipay-bg: linear-gradient(to bottom, #252525, #3a2a3e);
        --alipay-text: #d8a8e8;
        --wechat-border: #5fd3a0;
        --wechat-bg: linear-gradient(to bottom, #252525, #2a3e35);
        --wechat-text: #70e0b0;
        --card-shadow: rgba(255,255,255,0.08);
        --link-color: #5fd3a0;
    }
    
    .welcome-page-wrapper {
        font-family: 'Mochiy Pop One', sans-serif;
    }
    
    .welcome-page-wrapper h1,
    .welcome-page-wrapper h2,
    .welcome-page-wrapper h3,
    .welcome-page-wrapper p,
    .welcome-page-wrapper ul,
    .welcome-page-wrapper li,
    .welcome-page-wrapper span {
        font-family: 'Mochiy Pop One', sans-serif;
        color: var(--main-text);
    }
    
    .welcome-page-wrapper a {
        color: var(--link-color);
    }
    
    .welcome-main-card {
        border: 3px double var(--main-border);
        background: var(--main-bg);
        box-shadow: 0 0 10px var(--main-shadow);
        border-radius: 15px;
        padding: 20px;
        max-width: 800px;
        margin: auto;
    }
    
    .welcome-tip-wrapper {
        display: flex;
        align-items: center;
        text-align: center;
        max-width: 2000px;
        justify-content: center;
    }
    
    .welcome-tip-card {
        background-color: var(--tip-bg);
        border-left: 4px solid var(--tip-border);
        padding: 10px 20px;
        font-family: 'Comic Sans MS', 'Noto Sans CJK', sans-serif;
        font-size: 1em;
        color: var(--tip-text);
        margin: 1em 0;
        border-radius: 10px;
    }
    
    .welcome-payment-wrapper {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin: 20px auto;
        font-family: 'Comic Sans MS', 'Noto Sans CJK', sans-serif;
    }
    
    .welcome-payment-card {
        flex: 1;
        max-width: 300px;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 4px 8px var(--card-shadow);
        text-align: center;
    }
    
    .welcome-alipay-card {
        border: 2px dashed var(--alipay-border);
        background: var(--alipay-bg);
    }
    
    .welcome-alipay-card h3 {
        color: var(--alipay-text);
    }
    
    .welcome-wechat-card {
        border: 2px dashed var(--wechat-border);
        background: var(--wechat-bg);
    }
    
    .welcome-wechat-card h3 {
        color: var(--wechat-text);
    }
</style>

<div class="welcome-page-wrapper">
<div class="welcome-main-card">
    <h1 style="text-align: center;">✨ 自我介绍 ✨</h1>
    <section>
        <h2>🌸 哦，这里原来是介绍我的吗？</h2>
        <div style="display: flex; align-items: center; gap: 20px;">
            <img src="/shiyiimg.jpg" alt="个人头像" style="width: 350px; height: auto; border-radius: 10px;">
            <div style="display: flex; flex-direction: column; justify-content: center; width: 300px;">
                <span>这里是失意哦 双非摆烂大学生</span>
                <br>
                <span>一觉睡到12点 吃完饭后继续睡</span>
                <br>
                <span>平常喜欢二次元，不怎么运动，也不自律</span>
                <br>
                <span>平常没米的时候就写点外包</span>
                <br>
                <span>有时候喜欢折磨Java和kotlin，虽然其实没啥意义</span>
                <br>
                <span>算了，能活一天是一天吧，开心最重要</span>
            </div>
        </div>
    </section>
    <section>
        <h2>🔧 我会什么呢？</h2>
        <ul>
            <li>一点点前端开发？（HTML, CSS, JavaScript,TypeScript,Vue，Vite等）</li>
            <li>一部分后端开发？（Springboot,Java,Kotlin,Redis,Mysql等等）</li>
            <li>一些Liunx运维？（docker，1panel等等）</li>
            <li>超绝的gal技术？</li>
        </ul>
    </section>
    <section>
        <h2>⚠️ 版权问题</h2>
        <p>
        <ul>
        <li>本博客所有内容遵循 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">CC BY-NC-SA 4.0</a>协议，转载请注明出处。</li>
        <li>如有侵犯版权的请尽快联系站长：3401187804@qq.com，本站会在24小时内删除有争议的内容。</li>
        </ul>
        </p>
    </section>
</div>

<div class="welcome-tip-wrapper">
    <div class="welcome-tip-card">
        "如果对我创作内容感兴趣或者对你有所帮助，希望可以投个赏～～"
    </div>
</div>

<div class="welcome-payment-wrapper">
    <div class="welcome-payment-card welcome-alipay-card">
        <h3>支付宝二维码</h3>
        <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
            <img src="/buy/zhifubaobuy.jpg" alt="支付宝二维码" style="width: 100%; max-width: 200px; height: auto; border-radius: 10px;">
        </div>
    </div>
    <div class="welcome-payment-card welcome-wechat-card">
        <h3>微信二维码</h3>
        <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
            <img src="/buy/weixinbuy.jpg" alt="微信二维码" style="width: 100%; max-width: 200px; height: auto; border-radius: 10px;">
        </div>
    </div>
</div>
</div>
