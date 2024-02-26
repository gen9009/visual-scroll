<template>
  <div class="scroll-container h-150vh w-100% bg-gray p-4 box-border relative">
    <div class="box w-100px h-100px bg-amber rounded fixed left-50%"></div>
  </div>
  <div class="progress fixed h-2 bg-blue top-0 left-0 w-100%"></div>
</template>
<script setup>
/*
  CSS 滚动动画
  animation-timeline:scroll() 
  <scroll()> =  scroll( [ <scroller> || <axis> ]? )
    scroller监听指定容器滚动事件:nearest,root,self
    axis监听指定滚动方向:block,inline,y,x

  animation-range 控制滚动范围
*/
</script>
<style lang="scss" scoped>
.scroll-container {
  overflow: auto;
}
.progress {
  animation: progress;
  animation-timeline: scroll();
}
@keyframes progress {
  from {
    transform: translate(-100%);
  }
  to {
    transform: translate(0);
  }
}
.box {
  left: calc(50% - 50px);
  animation: move forwards;
  animation-range: 10% 95%;
  animation-timeline: scroll(root);
}
.box::before {
  content: 'Liquor';
  display: block;
  width: 100%;
  height: 100%;
  line-height: 100px;
  text-align: center;
  animation: changeText;
  animation-timeline: scroll(root);
}
@keyframes move {
  from {
    top: 0;
    background: rgb(188, 159, 104);
  }
  to {
    left: calc(50% - 100px);
    width: 200px;
    top: calc(100% - 100px);
    background: #000;
  }
}
@keyframes changeText {
  from {
    color: #000;
    content: 'Liquor';
  }
  to {
    color: #fff;
    content: 'Hello';
  }
}
</style>
