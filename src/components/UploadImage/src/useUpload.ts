import { ref } from "vue";
import { ImageFormat, ImageObj, Formats } from "./types";

export function useUpload() {
  const file = ref<ImageObj>();
  const validFormats = ref<string>();
  const maxSize = ref(0);

  const setConfigs = (formats: Formats, _maxSize: number) => {
    const DEFAULT_FORMAT = "image/*";

    maxSize.value = _maxSize;

    if (formats === "*") {
      validFormats.value = DEFAULT_FORMAT;
      return;
    }

    const res: string[] = [];
    for (const format of formats) {
      if (Object.values(ImageFormat).includes(format as ImageFormat)) {
        res.push(`.${format}`);
        continue;
      }
      console.warn(`Upload props: "${format}" is not a valid format.`);
    }

    if (res.length === 0) {
      validFormats.value = DEFAULT_FORMAT;
      return;
    }
    validFormats.value = res.join(",");
  };

  const addFile = (_file: File) => {
    if (!isFileValid(_file.type)) {
      alert("Image format not valid!");
      return;
    }
    if (_file.size > maxSize.value) {
      alert("Image size is too large!");
      return;
    }

    file.value = generateImageObj(_file);
  };

  const removeFile = () => {
    file.value = undefined;
  };

  function generateImageObj(file: File): ImageObj {
    return {
      id: `${file.name}-${file.lastModified}`,
      url: URL.createObjectURL(file),
      file: file,
    };
  }
  function isFileValid(type: string) {
    if (!type) return false;
    return validFormats.value?.indexOf(type.replace("image/", "")) !== -1;
  }

  async function submitUpload() {
    if (!file.value?.file) {
      console.error("There are no image is uploaded!");
      return;
    }

    const formData = new FormData();
    formData.append("s", file.value.file);

    //handle upload here

    file.value = undefined;
  }

  return { file, validFormats, setConfigs, addFile, removeFile, submitUpload };
}
