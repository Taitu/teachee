<template>
  <div class="call">
    <player />
    <comments />
  </div>
</template>

<script>
import Comments from '../components/comments/Comments'
import Player from '../components/player/Player'
export default {
  components: {
    comments: Comments,
    player: Player
  }
}
</script>
