
export type JSXChildren = JSXNode | JSXNode[] | string;

export type JSXType = ((props: JSXProps) => JSXChildren) | WidgetName;

export enum WidgetName {
  stack = 'stack',
  list = 'list',
  image = 'image',
  text = 'text',
  date= 'date',
  spacer = 'spacer',
}

export interface JSXProps {
  [key: string]: any
  onCreate?: (widget: Widget) => void;
  children?: JSXChildren;
}

export interface JSXNode {
  type: JSXType;
  props: JSXProps,
}

export type ChildWidget = WidgetStack | WidgetImage | WidgetText | WidgetDate | WidgetSpacer;

export type ParentWidget = WidgetStack | ListWidget;

export type Widget = ChildWidget | ParentWidget;


export interface WidgetInfo {
  widget?: Widget,
  isParentWidget: boolean;
}

export const jsx = (type: JSXType, props: JSXProps) => {
  return {
    type,
    props,
  };
};

export const jsxs = jsx;

export const Fragment = function (props: JSXProps) {
  return props.children;
};