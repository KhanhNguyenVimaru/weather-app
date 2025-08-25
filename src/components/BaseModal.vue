<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="fixed w-full h-screen top-0 left-0 flex justify-center px-8">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black opacity-30"></div>

        <!-- Nội dung modal -->
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="relative p-4 bg-white self-start mt-32 max-w-screen-md z-10"
          >
            <slot />
            <div class="flex justify-end">
              <button
                class="text-white mt-8 bg-blue-600 hover:bg-blue-400 cursor-pointer py-1.5 px-6 text-md rounded-sm"
                style="color: white"
                @click="$emit('close-modal')"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(['close-modal'])
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
