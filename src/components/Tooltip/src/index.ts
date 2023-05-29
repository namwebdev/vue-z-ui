import { defineAsyncComponent } from "vue";
import { defu } from "defu";
import { hideAll } from "tippy.js";
export const tooltipOptionsInject = Symbol();
import type { App } from "vue";
import type { PluginOptions } from "./types";

export function createToolTipPlugin(options: PluginOptions = {}) {
  return (app: App) => {
    options = defu(options, {
      arrow: false,
    });
    options = {
      ...options,
      ...{ arrow: false },
    };

    app.config.globalProperties.$hideAllTooltips = hideAll;

    app.provide(tooltipOptionsInject, options);
    app.component(
      "ToolTip",
      // @ts-nocheck
      defineAsyncComponent(() => import("./Index.vue"))
    );
  };
}
