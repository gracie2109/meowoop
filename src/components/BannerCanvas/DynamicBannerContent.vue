<template>
  <div class="dynamic-banner-content">
    <component
      v-for="(item, index) in content"
      :key="item.id || `content-${index}`"
      :is="getComponentTag(item)"
      :class="item.className"
      :style="getComputedStyles(item)"
      v-bind="getComponentProps(item)"
      @click="handleClick(item)"
    >
      <!-- Text content -->
      <template v-if="isTextContent(item)">
        {{ item.text }}
      </template>

      <!-- List content -->
      <template v-if="isListContent(item)">
        <li v-for="(listItem, idx) in item.items" :key="idx">
          {{ listItem }}
        </li>
      </template>

      <!-- Nested children (for div containers) -->
      <template v-if="isDivContent(item) && item.children">
        <DynamicBannerContent :content="item.children" />
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { BannerContent } from '@/types/banner-content'
import {
  isTextContent,
  isImageContent,
  isButtonContent,
  isLinkContent,
  isListContent,
  isDivContent
} from '@/types/banner-content'

interface Props {
  content: BannerContent[]
}

defineProps<Props>()

// Get HTML tag for component
const getComponentTag = (item: BannerContent): string => {
  switch (item.type) {
    case 'img':
      return 'img'
    case 'button':
      return 'button'
    case 'link':
      return 'a'
    case 'ul':
      return 'ul'
    case 'div':
      return 'div'
    case 'h1':
    case 'h2':
    case 'h3':
    case 'p':
    case 'span':
    default:
      return item.type
  }
}

// Convert styles object to CSS properties
const getComputedStyles = (item: BannerContent) => {
  const styles = item.styles || {}

  const cssStyles: Record<string, string | number> = {}

  // Apply styles - không cần position absolute
  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined) {
      // Convert camelCase to kebab-case
      const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      cssStyles[cssProperty] = value
    }
  })

  return cssStyles
}

// Get component-specific props
const getComponentProps = (item: BannerContent) => {
  const props: Record<string, unknown> = {}

  if (isImageContent(item)) {
    props.src = item.src
    props.alt = item.alt || ''
  }

  if (isLinkContent(item)) {
    props.href = item.href || item.action?.url || '#'
    if (item.action?.url?.startsWith('http')) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }
  }

  if (isButtonContent(item)) {
    props.type = 'button'
    props.disabled = item.disabled || false
  }

  return props
}

// Handle click events
const handleClick = (item: BannerContent) => {
  if (!item.action) return

  switch (item.action.type) {
    case 'link':
      if (item.action.url) {
        if (item.action.url.startsWith('http')) {
          window.open(item.action.url, '_blank', 'noopener,noreferrer')
        } else {
          // Use router navigation for internal links
          // router.push(item.action.url)
          window.location.href = item.action.url
        }
      }
      break

    case 'modal':
      if (item.action.modalId) {
        // Emit event or call modal service
        console.log('Open modal:', item.action.modalId)
      }
      break

    case 'function':
      if (item.action.functionName) {
        // Call custom function
        console.log('Call function:', item.action.functionName, item.action.params)
      }
      break
  }
}

defineOptions({
  name: 'DynamicBannerContent'
})
</script>

<style scoped>
.dynamic-banner-content {
  /* Normal document flow - không cần position relative */
  width: 100%;
  /* Content sẽ flow từ dưới lên theo flex-end của parent */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Default styles for better appearance */
.dynamic-banner-content h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: bold;
}

.dynamic-banner-content h2 {
  margin: 0 0 6px 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.dynamic-banner-content h3 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.dynamic-banner-content p {
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.dynamic-banner-content button {
  cursor: pointer;
  border: none;
  outline: none;
  transition: opacity 0.2s ease;
  /* Self-align cho button */
  align-self: flex-start;
  margin: 4px 0;
}

.dynamic-banner-content button:hover {
  opacity: 0.9;
}

.dynamic-banner-content button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.dynamic-banner-content a {
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  align-self: flex-start;
  margin: 2px 0;
}

.dynamic-banner-content a:hover {
  opacity: 0.8;
}

.dynamic-banner-content ul {
  margin: 0 0 8px 0;
  padding-left: 1.5rem;
}

.dynamic-banner-content li {
  margin-bottom: 0.25rem;
}

.dynamic-banner-content img {
  max-width: 100%;
  height: auto;
  margin: 4px 0;
  align-self: flex-start;
}

/* Button groups */
.dynamic-banner-content .button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0;
}

/* Stats grid */
.dynamic-banner-content .stats-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 12px 0;
}

.dynamic-banner-content .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
