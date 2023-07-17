<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useToast } from 'vuestic-ui'
import type { IRenameValueEnum } from '@/helper/rename-types'
import { renameTypes, renameAction } from '@/helper/rename-types'
import { isValidReplaceName } from '@/helper/rule-valid';
import emitter from '@/helper/event-bus';

const { init } = useToast()

const inputRule = ref('')
const renameMode = ref(renameTypes[0])
const exampleName = ref('')

const onRenderSelectText = (option: { value: string, name: string }) => option.name

const onPreview = () => {
  const { valid, message } = isValidReplaceName(inputRule.value)
  if (valid) {
    emitter.emit('updateRule', { rule: inputRule.value, action: renameMode.value.value })
  } else {
    init({ color: 'warning', message })
  }
}

const onExportAsZip = () => {
  emitter.emit('exportAsZip')
}

const onExportAsFolder = () => {
  emitter.emit('exportAsFolder')
}

watchEffect(() => {
  const { valid } = isValidReplaceName(inputRule.value)
  if (valid) {
    const action = renameMode.value.value as IRenameValueEnum
    exampleName.value = renameAction[action]({
      rule: inputRule.value,
      idx: 3,
      len: 3,
    })
  } else {
    exampleName.value = ''
  }
})
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <va-input class="flex-none w-72" v-model="inputRule" placeholder="请输入重命名规则" />
    <va-select class="flex-none w-52" v-model="renameMode" :options="renameTypes" :text-by="onRenderSelectText" />
    <va-button class="flex-none" @click="onPreview">预览修改</va-button>
    <va-button-dropdown label="素材导出" preset="secondary" border-color="primary">
      <div class="flex flex-col">
        <va-button preset="secondary" @click="onExportAsZip">
          导出为压缩包
        </va-button>
        <va-button preset="secondary" @click="onExportAsFolder">
          导出为文件夹
        </va-button>
      </div>
    </va-button-dropdown>
    <div class="flex-initial w-full">
      <div class="flex gap-6 text-slate-500 text-sm">
        <span class="flex-none text-gray-950">
          命名不能包含
          <span class="text-red-500"> * " &lt; &gt; | . / : </span>
          等字符，设置
          <span class="text-red-500"> ? </span>
          为替换符。
        </span>
        <template v-if="exampleName">
          <span class="flex-none">原文件名：example.png</span>
          <span class="flex-none">修改后： {{ `${exampleName}.png` }}</span>
        </template>
      </div>
    </div>
  </div>
</template>