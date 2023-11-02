<script setup>
const props = defineProps(["error"]);
</script>

<template>
  <p class="font-bold text-sm mb-1 text-danger">
    {{ error[0] }}
  </p>
</template>

<style lang="scss" scoped></style>
