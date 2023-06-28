<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useToast } from 'vuestic-ui'

type IFileItem = { id: string, file: File }

const uploadFiles = ref<IFileItem[]>([])
const fileHashMap = ref<Map<string, string>>()

const { init } = useToast()

const onUpload = (uploadItems: FileList) => {
  const items = Array.from(uploadItems)
  const pushItems: IFileItem[] = []
  let errorCount = 0
  items.forEach((file: File) => {
    const { name, type } = file
    // TODO check upload info
    // TODO use work calc hash
    pushItems.push({ id: nanoid(), file })
  })
  uploadFiles.value.push(...pushItems)
  if (errorCount) {
    const partCanBeUsed = errorCount !== items.length
    const color = partCanBeUsed ? 'warning' : 'danger'
    const message = partCanBeUsed ? '部分文件不可用，已经忽略！' : '上传文件不可用，请重新上传！'
    init({ message, color })
  }
  console.log(uploadFiles.value)
}
</script>

<template>
  <va-file-upload @fileAdded="onUpload" dropzone dropZoneText="拖动文件上传" uploadButtonText="上传文件" />
</template>