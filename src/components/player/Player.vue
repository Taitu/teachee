<template>
  <div class="player">
    <video
      ref="video"
      autoplay
      class="player__video"
    />
    <canvas
      id="canvas"
      ref="canvas"
      class="player__canvas"
    />
    <button
      class="btn player__control"
      @click="togglePlay"
    >
      {{ isPlaying ? 'pause' : 'play' }}
    </button>
  </div>
</template>

<script>
const constraints = {
  audio: false,
  video: { facingMode: 'user' }
}
export default {
  data () {
    return {
      maxWidth: 800,
      maxHeight: 800,
      isPlaying: true,
      frame: undefined,
      stream: undefined
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    const video = this.$refs.video
    video.removeEventListener('playing', this.playing)
    video.removeEventListener('pause', this.pause)
  },
  methods: {
    togglePlay () {
      this.isPlaying ? this.stop() : this.init()
      this.isPlaying = !this.isPlaying
    },
    stop () {
      const video = this.$refs.video
      video.pause()
      video.src = ''
      this.stream.getTracks()[0].stop()
    },
    getDimension () {
      return {
        width: window.innerWidth > this.maxWidth ? this.maxWidth : window.innerWidth,
        height: (window.innerHeight / 2) > this.maxHeight ? this.maxHeight : window.innerHeight / 2
      }
    },
    handleSuccess (stream) {
      const video = this.$refs.video
      this.stream = stream
      video.srcObject = stream
    },
    handleError (error) {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    },
    init () {
      const { width, height } = this.getDimension()
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      const video = this.$refs.video
      canvas.width = width
      canvas.height = height
      navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess).catch(this.handleError)
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      context.translate(canvas.width, 0)
      context.scale(-1, 1)

      video.addEventListener('playing', this.playing)

      video.addEventListener('pause', this.pause)
    },
    playing () {
      this.frame = requestAnimationFrame(this.loop)
    },
    pause () {
      cancelAnimationFrame(this.frame)
      this.stream.getTracks()[0].stop()
    },
    loop () {
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      requestAnimationFrame(this.loop)
    }
  }
}
</script>
