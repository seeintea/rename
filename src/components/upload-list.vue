<script setup lang="ts">
import { ref } from 'vue';
import JSZip from 'jszip';
import { IFileItem } from '@/helper/upload-files';
import emitter from '@/helper/event-bus';
import { downloadFile } from '@/helper/download'
import { renameAction } from '@/helper/rename-types'
import uploadWrapper from './upload-wrapper.vue';
import UploadItem from './upload-item.vue';

const fileItems = ref<IFileItem[]>([])

emitter.on('updateRule', ({ rule, action }) => {
  const func = renameAction[action]
  const addCount = action.includes('number') ? 1 : 0
  const len = Number((fileItems.value.length).toString().length)
  fileItems.value.forEach((item, idx) => {
    item.updateName = func({ rule, len, idx: idx + addCount })
    delete item.customName
  })
})

emitter.on('exportAsZip', async () => {
  const zip = new JSZip();
  const task: Promise<any>[] = []
  fileItems.value.forEach((item) => {
    task.push(new Promise((resolve) => {
      fetch(item.url).then((response) => {
        response.blob().then((data) => {
          const name = `${item.customName ?? item.updateName}.${item.suffix}`
          zip.file(name, data)
          resolve(0)
        })
      })
    }))
  })
  await Promise.all(task)
  zip.generateAsync({
    type: 'blob'
  }).then((content) => {
    const name = `export_${new Date().getTime()}`
    const url = URL.createObjectURL(content);
    downloadFile(name, url)
  })
})

emitter.on('exportAsFolder', () => {
  // TODO
})

const onUploadItems = (items: IFileItem[]) => {
  fileItems.value.push(...items)
}

const onUpdateItem = (item: IFileItem) => {
  const { id: itemId } = item
  const idx = fileItems.value.findIndex(({ id }) => id === itemId)
  if (idx > -1) {
    fileItems.value[idx] = item
  }
}
</script>

<template>
  <div class="pt-3 grid gap-4 grid-cols-4">
    <upload-wrapper @upload="onUploadItems" />
    <upload-item v-for="item in fileItems" :key="item.id" :file-info="item" @change="onUpdateItem" />
  </div>
</template>