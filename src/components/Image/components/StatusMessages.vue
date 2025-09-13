
<!-- Component 2: StatusMessages.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  error: string
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="status-messages">
    <Transition name="fade">
      <div v-if="error" class="error-message">
        <Icon icon="material-symbols:error" class="message-icon" />
        {{ error }}
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isLoading" class="loading-message">
        <div class="spinner"></div>
        Đang tải ảnh...
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.status-messages {
  margin-bottom: 1.5rem;
}

.error-message,
.loading-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.loading-message {
  background: #f0f9ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.message-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #bfdbfe;
  border-top: 2px solid #1d4ed8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
