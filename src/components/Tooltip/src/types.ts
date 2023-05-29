import type { HideAll, Props } from "tippy.js";
/* @ts-ignore */
import type ToolTip from "./Index.vue";
export type PluginOptions = Partial<Props>;
export * from "./index";

declare module "vue" {
  interface ComponentCustomProperties {
    $hideAllTooltips: HideAll;
  }
  interface GlobalComponents {
    ToolTip: typeof ToolTip;
  }
}
