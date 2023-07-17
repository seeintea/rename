<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useToast } from 'vuestic-ui'
import { IFileItem } from '@/helper/upload-files';
import { validFilename } from '@/helper/rule-valid'
import uploadItemWrapper from './upload-item-wrapper.vue'

const props = defineProps<{
  fileInfo: IFileItem
}>()

const emits = defineEmits<{
  (e: 'change', item: IFileItem): void
}>()

const { init } = useToast()

const fileInfo = computed(() => props.fileInfo)
const latestName = ref(fileInfo.value?.customName ?? fileInfo.value.updateName)
const beforeUpdateName = ref('')
const isEditMode = ref(false)
const input = ref<HTMLInputElement | null>(null)

const onResetName = (event: Event) => {
  event.stopPropagation()
  const nextFileInfo = { ...fileInfo.value }
  delete nextFileInfo.customName
  latestName.value = nextFileInfo.updateName
  emits('change', nextFileInfo as IFileItem)
}

const afterInputShow = () => {
  beforeUpdateName.value = latestName.value
  setTimeout(() => {
    input?.value?.focus()
  }, 100)
}

const afterInputHide = () => {

  const _withoutUpdate = () => {
    latestName.value = beforeUpdateName.value
    beforeUpdateName.value = ''
  }

  if (
    !latestName.value ||
    beforeUpdateName.value === latestName.value
  ) {
    _withoutUpdate()
    return
  }

  if (validFilename.test(latestName.value)) {
    _withoutUpdate()
    init({ color: 'warning', message: '含有特殊字符，请修改后重试！' })
    return
  }

  const nextFileInfo = { ...fileInfo.value }
  if (fileInfo.value.updateName === latestName.value) {
    delete nextFileInfo.customName
  } else {
    nextFileInfo.customName = latestName.value
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

watch(() => props.fileInfo, ({ customName, updateName }) => {
  latestName.value = customName ?? updateName
}, { deep: true })
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
          ref="input" v-model="latestName" @blur="updateEditMode(false)" />
        <div v-else @click="updateEditMode(true)" class="flex items-center">
          <div class="truncate w-[90%]" :title="latestName">{{ latestName }}</div>
          <va-icon v-if="!!fileInfo?.customName" :size="18" name="restart_alt" @click="onResetName" />
        </div>
      </div>
    </div>
  </upload-item-wrapper>
</template>