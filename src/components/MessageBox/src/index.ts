import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  VNodeTypes,
  createVNode,
  render,
} from "vue";
import MessageBoxComponent from "./Index.vue";
import { Action, MessageBoxOptions, MessageBoxState } from "./types";

const getContainer = () => document.body;

const initInstance = (
  props?: any,
  _component?: VNodeTypes
): ComponentInternalInstance => {
  const component = _component ?? MessageBoxComponent;
  const vNode = createVNode(component, props);
  render(vNode, getContainer());

  return vNode.component as ComponentInternalInstance;
};

function show(
  title: string,
  message: string,
  _options?: MessageBoxOptions
): Promise<Action> {
  const options: any = {};
  // onVanish executed when event "vanish" is emit
  options.onVanish = () => render(null, getContainer());

  const instance = initInstance(options);

  const vm = instance.proxy as ComponentPublicInstance<
    {
      visible: boolean;
    } & { state: MessageBoxState }
  >;

  vm.state.title = title;
  vm.state.message = message;
  if (_options) {
    if (_options.onConfirm) vm.state.onConfirm = _options.onConfirm;
    if (_options.iconClass) vm.state.iconClass = _options.iconClass;
  }

  vm.visible = true;

  return new Promise((resolve, reject) => {
    options.onAction = (action: Action) => resolve(action);
  });
}

function openDialog(component: VNodeTypes) {
  const options: any = {};
  options.onVanish = () => render(null, getContainer());

  initInstance(options, component);

  return new Promise((resolve, reject) => {
    options.onAction = (action: Action) => {
      render(null, getContainer());
      resolve(action);
    };
  });
}

const MessageBox = {
  show,
  openDialog,
};

export default MessageBox;
