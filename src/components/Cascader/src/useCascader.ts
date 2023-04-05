import { ref } from "vue";
import { Menu } from "./types";

const menus = ref<Array<Menu[]>>([]);
const selectedItem = ref<Menu>({} as Menu);
const selectedIds = ref<number[]>([]);

const useCascader = () => {
  const initData = (data: Menu[], _selectedIds: number[]) => {
    if (!data?.length) return;

    menus.value = [data];
    if (_selectedIds?.length) {
      selectedIds.value = _selectedIds;
      _selectedIds.forEach((id, index) => {
        const target = menus.value[index].find((i) => i.id === id) as Menu;
        if (target?.children) menus.value.push(target.children as Menu[]);
      });
    }
  };
  const initSelected = (data: number[]) => {
    if (!data || !data?.length) return;
  };
  const select = (val: Menu) => {
    if (!val || val.id === selectedItem.value?.id) return;
    selectedItem.value = val;

    const _menus = menus.value;
    const newMenu = val.children as Menu[];

    const levelSelected = val.level;
    const levelLatest = _menus[_menus.length - 1][0].level;
    const { id, ...res } = selectedItem.value;

    selectedIds.value = selectedIds.value.slice(0, levelSelected - 1);
    selectedIds.value.push(id);

    if (!newMenu?.length) {
      menus.value = _menus.slice(0, levelSelected);
      return;
    }

    if (levelSelected > levelLatest) return;

    if (levelSelected === levelLatest) {
      _menus.push(newMenu);
      return;
    }
    menus.value = _menus.slice(0, levelSelected);
    menus.value.push(newMenu);
  };

  return { menus, initData, initSelected, selectedItem, select, selectedIds };
};

export default useCascader;
