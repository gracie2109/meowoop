<template>
  <div>
    <Row :gutter="16" align="middle">
      <div class="wrap" v-for="i in LANGUAGES" :key="i" @click="handleClick(i)">
        <Image
          :src="i === APP_LANGUAGES.VI ? iconVi : iconUk"
          :alt="i"
          class="flag_img"
          :style="{
            filter: currentLocale !== i ? 'grayscale(900)' : '',
          }"
        />
      </div>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { Row } from 'ant-design-vue'
import iconUk from '@/assets/images/common/flag_uk.png'
import iconVi from '@/assets/images/common/flag_vi.png'
import { APP_LANGUAGES, LANGUAGES } from '@/contants/app'
import { currentLocale, changeLanguage } from '@/i18n'
import Image from '@/components/app/AppImage.vue'
const handleClick = (lang: string) => {
  changeLanguage(lang)
}
</script>

<style scoped>
.wrap {
  height: 30px;
  margin-right: 0.3rem;
}

.flag_img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  aspect-ratio: 1/1;
  cursor: pointer;
}
</style>
