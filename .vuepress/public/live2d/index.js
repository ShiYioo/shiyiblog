

// (function () {
//   function initLive2D() {
//     // 加载 PixiJS
//     const pixiScript = document.createElement("script");
//     pixiScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.2.4/pixi.min.js";
//     pixiScript.onload = () => {

//       // 加载 pixi-live2d-display
//       const live2dScript = document.createElement("script");
//       live2dScript.src = "https://cdn.jsdelivr.net/npm/pixi-live2d-display@latest/dist/index.min.js";
//       live2dScript.onload = async () => {
//         if (!window.PIXI || !window.PIXI.live2d) return;

//         try {
//           const response = await fetch("/live2d/1024100/1024100.model3.json");
//           const modelJson = await response.json();
//           const model = window.PIXI.live2d.Live2DModel.fromSync(modelJson);

//           const container = document.createElement("div");
//           container.style.position = "fixed";
//           container.style.bottom = "0";
//           container.style.left = "0";
//           container.style.width = "200px";
//           container.style.height = "300px";
//           container.style.zIndex = "9999";
//           container.style.pointerEvents = "none"; // 防止遮挡点击
//           document.body.appendChild(container);
//           container.appendChild(model.canvas);
//         } catch (e) {
//           console.error("模型加载失败:", e);
//         }
//       };
//       document.head.appendChild(live2dScript);
//     };
//     document.head.appendChild(pixiScript);
//   }

//   if (document.readyState === "loading") {
//     window.addEventListener("DOMContentLoaded", initLive2D);
//   } else {
//     initLive2D();
//   }
// })();