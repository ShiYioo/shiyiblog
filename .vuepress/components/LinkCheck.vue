<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let modal = null

// 定义白名单域名，这些域名的链接不会被拦截
const whitelistDomains = [
  'music.163.com',     // 网易云音乐
  'music.126.net',     // 网易云音乐相关域名
  // 你可以根据需要添加更多白名单域名
]

// 检查链接是否在白名单中
const isInWhitelist = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return whitelistDomains.some(domain => 
      urlObj.hostname.includes(domain)
    )
  } catch (e) {
    return false
  }
}

// 处理链接点击事件
const handleLinkClick = (event) => {
  // 检查是否在排除元素内（音乐播放器）
  if (event.target.closest && event.target.closest('.aplayer')) {
    return
  }

  // 检查是否有排除标记
  if (event.target.closest && event.target.closest('[data-exclude-link-check]')) {
    return
  }

  // 检查点击的是否是链接
  const link = event.target.closest('a')
  if (!link) return

  const href = link.getAttribute('href')
  if (!href) return

  // 忽略锚点链接、javascript链接和mailto链接
  if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
    return
  }

  // 检查是否为本地链接
  const isLocalLink = (url) => {
    try {
      // 处理相对链接
      if (url.startsWith('/') && !url.startsWith('//')) {
        return true
      }
      
      // 处理绝对链接
      const urlObj = new URL(url, window.location.origin)
      return urlObj.origin === window.location.origin
    } catch (e) {
      // 如果 URL 无效，假设它是外部链接
      return false
    }
  }

  // 只拦截外部链接且不在白名单中
  if (!isLocalLink(href) && !isInWhitelist(href)) {
    // 阻止默认行为
    event.preventDefault()
    
    // 显示确认模态框
    showModal(href)
  }
}

// 显示确认模态框
const showModal = (url) => {
  // 如果模态框已存在，先移除
  if (modal) {
    document.body.removeChild(modal)
    modal = null
  }
  
  // 创建模态框
  modal = document.createElement('div')
  modal.id = 'external-link-modal'
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('/bg1.jpg') center/cover no-repeat, rgba(255, 255, 255, 0.6);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-blend-mode: overlay;
    opacity: 0;
    animation: fadeIn 0.3s ease-out forwards;
  `
  
  modal.innerHTML = `
    <style>
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      @keyframes slideInUp {
        from {
          transform: translateY(50px) scale(0.95);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      
      @keyframes slideOutDown {
        from {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        to {
          transform: translateY(50px) scale(0.95);
          opacity: 0;
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    </style>
    <div class="modal-content" style="
      background: rgba(255, 255, 255, 0.85);
      padding: 2rem;
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
      max-width: 500px;
      width: 90%;
      text-align: center;
      font-family: 'Comic Sans MS', 'Noto Sans CJK SC', sans-serif;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.5);
      overflow: hidden;
      transform: translateY(50px) scale(0.95);
      opacity: 0;
      animation: slideInUp 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s forwards;
    ">
      <!-- iOS风格装饰性元素 -->
      <div class="modal-header" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background: linear-gradient(to right, #FFB6C1, #87CEEB);
        border-radius: 24px 24px 0 0;
        animation: float 3s ease-in-out infinite;
      "></div>

      <!-- 二次元风格图标 -->
      <div class="modal-icon" style="
        position: relative;
        margin: 20px auto;
        width: 80px;
        height: 80px;
        background: linear-gradient(45deg, #FFB6C1, #87CEEB);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border: 2px solid white;
        animation: float 2s ease-in-out infinite;
      ">
        <div style="
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
        ">🔗</div>
      </div>

      <h2 style="font-size: 1.5rem; color: #555; margin-bottom: 1rem; font-weight: 600;">即将离开小库次元 ~</h2>
      <p style="font-size: 1rem; color: #888; margin: 0.5rem 0;">主人，您即将前往未知的异次元：</p>
      <div style="
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(240, 248, 255, 0.7);
        border-radius: 16px;
        word-break: break-all;
        font-size: 0.9rem;
        color: #333;
        border: 1px solid rgba(135, 206, 235, 0.3);
      ">
        <a href="${url}" target="_blank" rel="noopener" style="color: #4285f4; text-decoration: none;">${url.length > 60 ? url.substring(0, 60) + '...' : url}</a>
      </div>
      <p class="warning" style="color: #ff6b6b; font-weight: 500; margin: 1rem 0; font-size: 0.95rem;">
        ⚠️ 请注意该次元的安全性和隐私政策哟~
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem;">
        <button id="cancel-btn" style="
          padding: 0.7rem 1.8rem;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          background: linear-gradient(to right, #f5f7fa, #e4e7f4);
          color: #555;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        ">取消</button>
        <button id="confirm-btn" style="
          padding: 0.7rem 1.8rem;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          background: linear-gradient(to right, #4285f4, #5c9dff);
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(66, 133, 244, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.3);
        ">确认前往</button>
      </div>
    </div>
  `

  // 添加到页面
  document.body.appendChild(modal)

  // 添加事件监听器
  const cancelBtn = modal.querySelector('#cancel-btn')
  const confirmBtn = modal.querySelector('#confirm-btn')

  // 关闭模态框的函数，带有动画效果
  const closeModalWithAnimation = () => {
    if (!modal) return;
    
    // 为模态框内容添加退出动画
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.animation = 'slideOutDown 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards';
    }
    
    // 为模态框背景添加淡出动画
    modal.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    // 动画结束后移除模态框
    setTimeout(() => {
      if (modal && modal.parentNode) {
        document.body.removeChild(modal)
      }
      modal = null
    }, 300)
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      closeModalWithAnimation()
    })
    
    // 添加悬停效果
    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.transform = 'translateY(-2px)';
      cancelBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
    
    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.transform = 'translateY(0)';
      cancelBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      window.open(url, '_blank', 'noopener,noreferrer')
      closeModalWithAnimation()
    })
    
    // 添加悬停效果
    confirmBtn.addEventListener('mouseenter', () => {
      confirmBtn.style.transform = 'translateY(-2px)';
      confirmBtn.style.boxShadow = '0 4px 15px rgba(66, 133, 244, 0.4)';
    });
    
    confirmBtn.addEventListener('mouseleave', () => {
      confirmBtn.style.transform = 'translateY(0)';
      confirmBtn.style.boxShadow = '0 2px 10px rgba(66, 133, 244, 0.3)';
    });
  }

  // 点击模态框背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalWithAnimation()
    }
  })
}

onMounted(() => {
  // 使用冒泡阶段监听，避免干扰其他组件
  document.addEventListener('click', handleLinkClick, false)
})

onBeforeUnmount(() => {
  // 移除事件监听器
  document.removeEventListener('click', handleLinkClick, false)

  // 清理模态框
  if (modal) {
    if (modal.parentNode) {
      document.body.removeChild(modal)
    }
    modal = null
  }
})
</script>

<template>
  <!-- 此组件不需要渲染任何内容 -->
</template>