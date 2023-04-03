export interface Menu {
  id: number;
  name_vn: string;
  level: number;
  parent_id: number;
  children?: Menu[];
}

export type MenuExcludeChild = Omit<Menu, "children">;
