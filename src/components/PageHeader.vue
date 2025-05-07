<template>
  <div class="header_wrap">
    <div class="header_content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.header_wrap {
  width: 100%;
  height: 55px;
  position: absolute;
  top: -5rem;
  max-width: 80%;
}

.header_content {
  height: 100%;
  width: 100%;
  display: flex;
  place-items: center;
  font-size: 16px;
  font-weight: 400;
}
</style>
