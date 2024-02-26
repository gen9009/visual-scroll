<template>
  <div class="scroll-container h-300vh w-100% bg-gray p-4 box-border relative">
    <div class="fixed w-100px bottom-400px right-0 border-b-2 border-blue border-solid">box1 start</div>
    <div class="fixed w-100px top-10% right-0 border-b-2 border-red border-solid">box1 end</div>
    <div class="box1 bg-amber absolute h-100px w-100px rounded left-[calc(50%-50px)] bottom-[calc(100vh+200px)] text-center line-height-100px">Liquor</div>

    <div class="pt-100vh" />
    <!--  独立区间的固定滚动动画  目前为300px-->
    <div class="relative my-100px">
      <div class="absolute w-100px left-0 top-50px border-b-2 border-green border-solid h-0px">box2 start</div>
      <div class="box2 ml-200px h-300px relative">
        <div class="box2-container bg-red h-100px w-100px rounded text-center line-height-100px">
          Liquor
          <div class="absolute w-100px left-0 top-50% border-b-2 border-purple border-solid h-0px">50%</div>
        </div>
      </div>
      <div class="absolute w-100px left-0 border-b-2 border-red border-solid h-0">box2 end</div>
    </div>
  </div>
  <div class="progress fixed h-2 bg-blue top-0 left-[-100%] w-100%"></div>
</template>
<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted } from 'vue'
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.to('.box1', {
    rotation: 360,
    x: 300,
    force3D: true,
    // yPercent: 100, // 表示百分比元素的高度
    background: 'pink',
    scrollTrigger: {
      trigger: '.box1', // 动画触发的元素
      scrub: 1, // 是否将动画效果链接到滚动条  // 延迟滚动条多少秒动画
      start: 'center bottom-=400px', // 动画开始 元素自身起始点 页面起始点
      end: 'center 10%' // 动画结束 元素自身起始点 页面起始点
    }
  })
  gsap.to('.box2-container', {
    rotateZ: 900,
    scrollTrigger: {
      scrub: 1,
      pin: true,
      trigger: '.box2-container',
      start: '50% 50%',
      endTrigger: '.box2', //固定至页面50%处,随后运动至box2底部结束
      end: 'bottom 50%'
    }
  })


  // 问题： 进度条运动精度不准
  gsap.to('.progress', {
    x: document.documentElement.clientWidth,
    background: 'pink',
    ease:'',
    scrollTrigger: {
      trigger: '.scroll-container', // 动画触发的元素
      scrub: true, // 是否将动画效果链接到滚动条  // 延迟滚动条多少秒动画
      start: 'top 0', // 动画开始 元素自身起始点 页面起始点
      end: 'bottom 100%' // 动画结束 元素自身起始点 页面起始点
    }
  })
})
</script>
<style lang="scss" scoped>
.scroll-container {
  overflow: auto;
}
</style>
