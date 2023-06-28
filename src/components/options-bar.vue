<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { REPLACE_MODE as replaceOptions } from '@/constants/index'
import { getExampleItem, isValidReplaceName } from '@/helpers/replace'

const updateName = ref('');
const replaceMode = ref(replaceOptions[0])
const exampleName = ref('')
const isPreview = ref(false)

const onRenderSelectText = (option: { value: string, name: string }) => option.name

const onPreview = () => {
  isPreview.value = true
}

watchEffect(() => {
  const isValid = isValidReplaceName(updateName.value)
  if (isValid) {
    isPreview.value = false
    exampleName.value = getExampleItem(updateName.value, replaceMode.value.value)
  } else {
    exampleName.value = ''
  }
})
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <va-input class="flex-none w-72" v-model="updateName" placeholder="请输入重命名规则" />
    <va-select class="flex-none w-52" v-model="replaceMode" :options="replaceOptions" :text-by="onRenderSelectText" />
    <va-button class="flex-none" @click="onPreview">预览修改</va-button>
    <va-button-dropdown :disabled="!isPreview" label="素材导出" preset="secondary" border-color="primary">
      <div class="flex flex-col">
        <va-button preset="secondary">
          导出为压缩包
        </va-button>
        <va-button preset="secondary">
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