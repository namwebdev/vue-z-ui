import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  VNodeTypes,
  createVNode,
  render,
} from "vue";
import MessageBoxComponent from "./Index.vue";
import DialogComponent from "./Dialog.vue";
import { Action, MessageBoxOptions, MessageBoxState } from "./types";

const getContainer = () => document.body;

const initInstance = (
  props?: any,
  _component?: VNodeTypes
): ComponentInternalInstance => {
  let vNode;
  if (_component)
    vNode = createVNode(
      DialogComponent,
      {},
      { default: () => [createVNode(_component, props)] }
    );
  else vNode = createVNode(MessageBoxComponent, props);
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

  return new Promise((resolve) => {
    options.onAction = (action: Action) => resolve(action);
  });
}

function openDialog(component: VNodeTypes) {
  const options: any = {};
  options.onVanish = () => render(null, getContainer());

  const instance = initInstance(options, component);

  const vm = instance.proxy as ComponentPublicInstance<{
    visible: boolean;
  }>;

  vm.visible = true;

  return new Promise((resolve) => {
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
