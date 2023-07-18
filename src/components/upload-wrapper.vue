<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useToast } from 'vuestic-ui'
import { calc_file_hash as calcFileHash } from 'wasm-utils'
import { IFileItem } from '@/helper/upload-files'
import uploadItemWrapper from './upload-item-wrapper.vue'

const emits = defineEmits<{
  (e: 'upload', items: IFileItem[]): void
}>()

const fileHashMap = ref<Map<string, number>>(new Map())

const { init } = useToast()

const onUploadItems = async (uploadItems: FileList) => {
  const items = Array.from(uploadItems)
  const pushItems: IFileItem[] = []
  let errorCount = 0
  const task: Promise<void>[] = []
  items.forEach((file: File) => {
    task.push((async () => {
      const { name, type } = file
      const arrayBuffer = await file.arrayBuffer()
      const hash = calcFileHash(new Uint8Array(arrayBuffer))
      // TODO support zip file
      if (type.match('image') && !fileHashMap.value.get(hash)) {
        fileHashMap.value.set(hash, 1)
        let originName = name
        let suffix = ''
        try {
          const nameItems = name.split('.')
          const len = nameItems.length - 1
          originName = len === 1 ? nameItems[0] : nameItems.slice(0, len).join('.')
          suffix = nameItems[len]
        } catch (e) {
          // TODO
        }
        pushItems.push({
          id: nanoid(), type, url: URL.createObjectURL(file), originName, updateName: originName, suffix
        })
      }
    })())
  })
  await Promise.all(task)
  if (errorCount) {
    const partCanBeUsed = errorCount !== items.length
    const color = partCanBeUsed ? 'warning' : 'danger'
    const message = partCanBeUsed ? '部分文件不可用，已经忽略！' : '上传文件不可用，请重新上传！'
    init({ message, color })
  }
  if (pushItems.length) {
    emits('upload', pushItems)
  }
}
</script>

<template>
  <va-file-upload class="m-0" @fileAdded="onUploadItems" dropzone>
    <upload-item-wrapper>
      <div class="flex items-center">
        <div class="text-center"><va-icon name="drive_folder_upload" :size="52" color="#666666" /></div>
        <div class="flex flex-col">
          <span class="text-lg">点击上传文件</span>
          <span class="text-sm text-slate-400">支持图片/压缩包类型</span>
        </div>
      </div>
    </upload-item-wrapper>
  </va-file-upload>
</template>
