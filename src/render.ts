import { JSXChildren, JSXNode, ParentWidget, WidgetInfo, WidgetName } from './types';

const createWidget = (name: WidgetName, props: any, parentWidget: ParentWidget): WidgetInfo => {
  let w;
  let isParentWidget = false;
  switch (name) {
    case WidgetName.stack:
      w = parentWidget.addStack();
      isParentWidget = true;
      break;
    case WidgetName.image:
      w = parentWidget.addImage(props.image);
      break;
    case WidgetName.text:
      w = parentWidget.addText(props.text);
      break;
    case WidgetName.date:
      w = parentWidget.addDate(props.date);
      break;
    case WidgetName.spacer:
      w = parentWidget.addSpacer(props.length);
      break;
  }
  return { widget: w, isParentWidget };
}

export const render = (root: JSXNode, containerWidget: ParentWidget) => {
  if (typeof root.type === 'string') {
    const info = createWidget(root.type, root.props, containerWidget);
    if (!info.widget) {
      return;
    }
    if (root.props.onCreate) {
      root.props.onCreate(info.widget);
    }
    if (!info.isParentWidget) {
      return;
    }
    renderChildren(info.widget as ParentWidget, root.props.children);
  } else {
    const component = root.type(root.props);
    renderChildren(containerWidget, component);
  }
}

const renderChildren = (container: ParentWidget, children?: JSXChildren) => {
  if (typeof children === 'string') {
    container.addText(children);
    return;
  }
  if (children instanceof Array) {
    children.forEach(c => render(c, container));
  } else if (children) {
    render(children, container);
  }
}