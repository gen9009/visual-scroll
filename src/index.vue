<script setup>
import { computed, ref, onMounted, reactive, onUnmounted } from 'vue'
import gsap from 'gsap'

const container = ref()
const state = reactive({
  scrollOffset: 0, // 鼠标滚轮滚动数值
  isScrolling: false // 通过状态将滚轮事件和滚动事件隔开
})

const scrollBottom = computed(() => {
  // 变量 scrollHeight 是滚动条的总高度
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  // 变量 windowHeight 是可视区的高度
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 变量scrollTop为当前页面的滚动条纵坐标位置
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 滚动条到底部得距离 = 滚动条的总高度 - 可视区的高度 - 当前页面的滚动条纵坐标位置
  return scrollHeight - windowHeight - scrollTop
})
const maxScroll = computed(() => {
  return container.value.offsetWidth - window.innerWidth
})
onMounted(() => {
  // 实际上可以只监听scroll
  window.addEventListener('load', () => {
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll)
    document.body.addEventListener('mousewheel', onWheel, { passive: false })
    document.querySelector('.box').addEventListener('mousemove', boxAnimation)
  })
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll)
  document.body.addEventListener('mousewheel', onWheel, { passive: false })
  document.querySelector('.box').addEventListener('mousemove', boxAnimation)
  // 所有图片加载完成执行回调
  imgsLoad(() => {
    // 设置 body 的高度  .scroll-container.value 的高度为初始宽度
    document.body.style.height = container.value.offsetWidth + 'px'
  })
})
// 在组件销毁时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
  document.body.removeEventListener('mousewheel', onWheel)
})
const onScroll = () => {
  // 如果正在执行 wheel 事件处理，则不执行 scroll 事件处理
  if (!state.isScrolling) {
    // 根据容器的宽度和内容的宽度，限制滚动的边界
    state.scrollOffset = (document.documentElement.scrollTop * maxScroll.value) / scrollBottom.value
    gsap.to(container.value, {
      x: -state.scrollOffset,
      duration: 1, // 动画持续时间，可以根据需要调整
      force3D: true
    })
  }
}
const onWheel = (event) => {
  event.preventDefault()
  state.isScrolling = true
  // 利用 requestAnimationFrame 确保 wheel 事件处理在 scroll 事件之后执行
  requestAnimationFrame(() => {
    state.isScrolling = false
  })
  // 计算水平偏移量
  const horizontalOffset = event.deltaY
  // 更新滚动容器的 transform
  state.scrollOffset += horizontalOffset
  // 根据容器的宽度和内容的宽度，限制滚动的边界
  state.scrollOffset = Math.max(0, Math.min(state.scrollOffset, maxScroll.value))
  // container.value.style.transform = `translate3d(${-state.scrollOffset}px, 0, 0)`
  gsap.to(container.value, {
    x: -state.scrollOffset,
    duration: 1, // 动画持续时间，可以根据需要调整
    // ease: 'sine.inOut', // 缓动函数，可以根据需要调整
    force3D: true
  })
  document.documentElement.scrollTop = (scrollBottom.value * state.scrollOffset) / maxScroll.value
}

const onResize = () => {
  console.log('onResize')
}

const imgsLoad = (callback) => {
  const images = document.querySelectorAll('img')
  let loadedCount = 0
  images.forEach((img) => {
    img.onload = () => {
      loadedCount++
      if (loadedCount === images.length) {
        callback()
      }
    }
  })
}

const boxAnimation = (event) => {
  const { clientX, clientY } = event
  gsap.to('.layer1', {
    x: (clientX / window.innerWidth + 0.5) * 200,
    y: (clientY / window.innerHeight + 0.5) * 200,
    ease: 'power1.out',
    duration: 0.5
  })
}
</script>
<template>
  <!-- 视口 -->
  <div class="viewport w-100vw h-dvh bg-blend-hue fixed top-0">
    <!-- 滚动区域 -->
    <div ref="container" class="scroll-container">
      <!-- 滚动内容 -->
      <div class="box relative">
        <img src="./assets/imgs/1.webp" class="absolute left-0 top-0 z-1 h-dvh w-full" />
        <img src="./assets/imgs/2.webp" class="layer1 z-2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  height: 100%;
  margin: 0px;
  background-color: #192531;
  overflow-x: hidden;
  overflow-y: scroll;
  min-height: 100vh;
  font-smooth: never;
  -webkit-font-smoothing: none;
}
.scroll-container {
  width: max-content;
  position: absolute;
  z-index: 10;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  height: 100%;
  overflow: hidden;
}
.box {
  display: flex;
}
</style>
