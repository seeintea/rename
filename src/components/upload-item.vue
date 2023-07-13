<script setup lang="ts">
import { ref, watch } from 'vue';
import { IFileItem } from '@/helper/upload-files';
import { validFilename } from '@/helper/rule-valid'
import uploadItemWrapper from './upload-item-wrapper.vue'

const { fileInfo } = defineProps<{
  fileInfo: IFileItem
}>()

const emits = defineEmits<{
  (e: 'change', item: IFileItem): void,
}>()

const updateName = ref(fileInfo?.customName ?? fileInfo.updateName)
const beforeUpdateName = ref('')
const isEditMode = ref(false)
const input = ref<HTMLInputElement | null>(null)

const onResetName = (event: Event) => {
  event.stopPropagation()
  const nextFileInfo = { ...fileInfo }
  delete nextFileInfo.customName
  updateName.value = nextFileInfo.updateName
  emits('change', nextFileInfo as IFileItem)
}

const afterInputShow = () => {
  beforeUpdateName.value = updateName.value
  setTimeout(() => {
    input?.value?.focus()
  }, 100)
}

const afterInputHide = () => {
  if (
    !updateName.value ||
    validFilename.test(updateName.value) ||
    beforeUpdateName.value === updateName.value
  ) {
    updateName.value = beforeUpdateName.value
    beforeUpdateName.value = ''
    return
  }
  const nextFileInfo = { ...fileInfo }
  if (fileInfo.updateName === updateName.value) {
    delete nextFileInfo.customName
  } else {
    nextFileInfo.customName = updateName.value
  }
  emits('change', nextFileInfo as IFileItem)
}

const updateEditMode = (isEdit: boolean) => {
  isEditMode.value = isEdit
  if (isEdit) {
    afterInputShow()
  } else {
    afterInputHide()
  }
}

watch(fileInfo, ({ customName, updateName: uname }) => {
  updateName.value = customName ?? uname
})
</script>

<template>
  <upload-item-wrapper>
    <div class="w-16 h-16 relative flex-none border border-gray-400 border-solid	rounded">
      <img class="max-w-[95%]	max-h-[95%] absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]"
        :src="fileInfo.url" alt="" />
    </div>
    <div class="text-lg flex flex-col min-w-0">
      <div class="text-base text-slate-500 truncate" :title="fileInfo.originName">原文件名：{{ fileInfo.originName }}</div>
      <div class="h-8 leading-8">
        <input v-if="isEditMode" class="bg-transparent w-full border-y border-t-0 border-gray-400 border-solid"
          ref="input" v-model="updateName" @blur="updateEditMode(false)" />
        <div v-else @click="updateEditMode(true)" class="flex items-center">
          <div class="truncate w-[90%]" :title="updateName">{{ updateName }}</div>
          <va-icon v-if="!!fileInfo?.customName" :size="18" name="restart_alt" @click="onResetName" />
        </div>
      </div>
    </div>
  </upload-item-wrapper>
</template>