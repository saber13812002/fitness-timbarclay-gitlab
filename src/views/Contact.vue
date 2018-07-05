<template>
  <div class="content-section padded">
    <h1>Contact</h1>
    <el-row>
      <el-col :xs="24" :md="12" class="contact-col">
        <a href="https://twitter.com/timbarclay">
          <i class="fab fa-twitter fa-5x" data-fa-transform="shrink-7" data-fa-mask="fas fa-circle" />
        </a>
        <p class="contact-description">Tweet me or DM me on <a href="https://twitter.com/timbarclay">Twitter</a> to give feedback or suggestions.</p>
      </el-col>
      <el-col :xs="24" :md="12" class="contact-col">
        <a href="https://gitlab.com/timbarclay/fitness">
          <i class="fab fa-gitlab fa-5x" data-fa-transform="shrink-5" data-fa-mask="fas fa-circle" />
        </a>
        <p class="contact-description">To raise a bug or request a feature, create an issue on <a href="https://gitlab.com/timbarclay/fitness">Gitlab</a>.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
$twitter-brand: #1DA1F2;
$gitlab-brand: #fca326;

.contact-col {
  display: flex;
  margin-bottom: 2em;
}
.fa-twitter {
  color: $twitter-brand;
  &:hover {
    color: darken($twitter-brand, 10%);
  }
}
.fa-gitlab {
  color: $gitlab-brand;
  &:hover {
    color: darken($gitlab-brand, 10%);
  }
}
.contact-description {
  margin: 0 1em;
}
</style>
