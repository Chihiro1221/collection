<script setup lang="ts">
import { ref } from 'vue'
import VideoTransform from '.'

const videoRef = ref<HTMLVideoElement>()
const canvasRef = ref<HTMLCanvasElement>()

// 是否播放音乐
const isPlayMusic = ref(false)
// 是否播放原视频
const isShowVideo = ref(false)
// 上传视频之后
const uploadFile = (e: any) => {
  const file = e.target.files[0]
  new VideoTransform(videoRef.value!, canvasRef.value!, file)
}
</script>

<template>
  <div class="video-transform">
    <div class="header">
      <div class="upload-btn-container">
        <input class="upload-file" type="file" @change="uploadFile" accept="video/mp4" />
        <button class="btn">上传视频 🧬</button>
      </div>
      <label class="switch-item">
        <span>关闭声音</span>
        <a-switch v-model:checked="isPlayMusic" />
      </label>
      <label class="switch-item">
        <span>播放原视频</span>
        <a-switch v-model:checked="isShowVideo" />
      </label>
    </div>
    <div class="content">
      <video :muted="isPlayMusic" v-show="isShowVideo" autoplay ref="videoRef" id="myVideo" src=""></video>
      <canvas ref="canvasRef" id="myCanvans"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-transform {
  .header {
    @apply flex items-center gap-10 mb-4;
    .switch-item {
      @apply flex items-center gap-2;
      :deep(.ant-switch-checked) {
        @apply bg-violet-600;
      }
    }
    .upload-btn-container {
      @apply relative cursor-pointer;
      .btn {
        @apply px-4 py-2 bg-violet-600 hover:bg-violet-700 duration-300 flex items-center justify-center text-white shadow rounded;
      }
      .upload-file {
        @apply absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer text-[0px];
        &:hover ~ .btn {
          @apply bg-violet-700;
        }
      }
    }
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    video,
    canvas {
      width: 100%;
    }
  }
}
</style>
