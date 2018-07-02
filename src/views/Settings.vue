<template>
  <div class="padded">
    <h2 class="no-top">Settings</h2>
    
    <settings-form class="settings"/>

    <el-alert
      title="A note on settings"
      description="In Superset, your settings are saved locally in your browser. That means they won't be synced between different devices and if you clear your browser data they will be reset"
      :closable="false"
      type="info"
      show-icon></el-alert>
  </div>
</template>

<script>
import SettingsForm from "../components/settings/SettingsForm.vue";

export default {
  components: {
    SettingsForm
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.settings {
  border-bottom: 1px solid $base-border;
  padding-bottom: $normal-space;
  margin-bottom: $normal-space;
}
</style>
