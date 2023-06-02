<template>
  <div class="rounded-sm border-2 w-full h-full">
    <Preview
      v-if="file"
      :file="file"
      @change="onClickChangeImage"
      @remove="removeFile"
    />

    <DropZone
      v-show="!file"
      #default="{ isActive }"
      @drop-file="handleAddFile"
      class="w-full h-full"
    >
      <label
        for="file-input"
        class="cursor-pointer text-2xl bg-white px-4 py-3 w-full h-full flex items-center justify-center"
        :class="{ 'border-dashed bg-sky-50': isActive }"
      >
        <span v-if="isActive">Drop here</span>

        <span v-else
          >Drag to here
          <br />
          <span class="text-xs">
            or
            <b>click here</b>
            to upload
          </span>
        </span>

        <input
          type="file"
          id="file-input"
          @change="onAddFile"
          :accept="validFormats"
        />
      </label>
    </DropZone>
  </div>
</template>

<script setup lang="ts">
import DropZone from "./DropZone.vue";
import Preview from "./Preview.vue";
import { useUpload } from "./useUpload";
import { Formats, MAX_SIZE_DEFAULT } from "./types";

defineOptions({
  name: "UploadImage",
});

const { formats = "*", maxSize = MAX_SIZE_DEFAULT } = defineProps<{
  formats?: Formats;
  maxSize?: number;
}>();

const { file, validFormats, setConfigs, addFile, removeFile, submitUpload } =
  useUpload();
defineExpose({
  upload: submitUpload,
});

setConfigs(formats, maxSize);

function handleAddFile(file: File) {
  addFile(file);
}
function onAddFile(e: any) {
  const file = e.target.files[0];
  addFile(file);
}
function onClickChangeImage() {
  document.getElementById("file-input")?.click();
}
</script>

<style scoped>
input[type="file"]:not(:focus-visible) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
