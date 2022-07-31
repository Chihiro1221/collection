import { message } from 'ant-design-vue'

class VideoTransform {
  private timeId: any
  private url: string
  constructor(private video: HTMLVideoElement, private canvas: HTMLCanvasElement, private file: any) {
    this.video = video
    this.canvas = canvas
    this.file = file
    this.url = URL.createObjectURL(this.file)
    this.init()
  }

  /** 初始化 */
  private init() {
    // 生成文件路径
    const isMp4 = this.file.type.includes('mp4')
    if (!isMp4) {
      message.error('请上传mp4格式的视频')
      throw new Error('请上传mp4格式的视频')
    }
    this.video.src = this.url
    this.bindEvent.call(this)
  }

  /** 绑定事件 */
  private bindEvent() {
    // 能够开始播放渲染第一帧
    this.video.addEventListener('canplay', () => {
      this.renderVideoFrame()
    })
    // 开始渲染
    this.video.addEventListener('play', () => {
      this.startRender()
    })
    // 停止播放
    this.video.addEventListener('ended', () => {
      this.stopRender()
    })
  }

  /** 开始渲染 */
  private startRender() {
    this.timeId = requestAnimationFrame(this.updateRender.bind(this))
  }

  /** 递归更新 */
  private updateRender() {
    this.renderVideoFrame()
    this.timeId = requestAnimationFrame(this.updateRender.bind(this))
  }

  /** 停止渲染 */
  private stopRender() {
    URL.revokeObjectURL(this.url)
    cancelAnimationFrame(this.timeId)
  }

  /** 渲染执行者 */
  private renderVideoFrame() {
    const videoSize = { width: this.video.videoWidth, height: this.video.videoHeight }
    this.canvas.width = videoSize.width
    this.canvas.height = videoSize.height
    const ctx = this.canvas.getContext('2d')!
    // 渲染第一帧
    ctx.drawImage(this.video, 0, 0, videoSize.width, videoSize.height)
    // 获得画布里的全部点阵/像素数据
    const imageData = ctx.getImageData(0, 0, videoSize.width, videoSize.height).data
    // 清除第一帧
    ctx.clearRect(0, 0, videoSize.width, videoSize.height)
    // 计算量大，不按照 1:1 来渲染
    const gap = 12
    for (let h = 0; h < videoSize.height; h += gap) {
      for (let w = 0; w < videoSize.width; w += gap) {
        const position = (videoSize.width * h + w) * 4
        const r = imageData[position]
        const g = imageData[position + 1]
        const b = imageData[position + 2]
        // rgb 转灰度算法，参考：https://www.cnblogs.com/zhangjiansheng/p/6925722.html
        const gray = (r * 30 + g * 59 + b * 11 + 50) / 100 - 0.5
        // 创建一个字符数组，根据笔画的密度依次排列，最后留一个空白字符填充白色
        const asciiList = ['#', '&', '@', '%', '$', 'w', '*', '+', 'o', '?', '!', ';', '^', ',', '.', ' ']
        // 根据灰度值，获取对应的字符序号，使用 Math.min 方法来确保序号不会越界
        const index = Math.min(asciiList.length - 1, Math.floor(gray / (255 / asciiList.length)))
        ctx.fillText(asciiList[index], w, h)
      }
    }
  }
}

export default VideoTransform
