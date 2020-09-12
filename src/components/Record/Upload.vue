<template>
  <div>
    <video :src="videoSrc" controls="controls" width="500" height="400"></video>
    <input type="file" @change="getBigectURL($event)" />
  </div>

</template>

<script>

  export default {
    name: 'Upload',
    data () {
      return {
        videoSrc: ''
      }
    },
    methods: {
      getBigectURL (event) {
        console.log('getBigectURL', event)
        var current = event.target.files[0]
        var fileReader = new FileReader()
        fileReader .readAsDataURL(current)
        var that = this
        fileReader .onload = function (e) {
          that.videoSrc = e.currentTarget.result
        }
      },
    },
    mounted() {
        console.log(this.$route.name)
    }
  }
</script>
