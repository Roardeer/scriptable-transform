# scriptable-transform

用 react 来写 scriptable 脚本的插件。

## 项目启发
来自 [scriptable-jsx](https://github.com/maoqxxmm/scriptable-jsx) 的启发，觉得这个小工具挺有意思的。希望自己也能实现一个。

> 本项目和原项目在思路上有点不同，所以如果提 PR 的话改动太大，所以干脆就直接重写了。

## 使用方式

```bash
npm install -D scriptable-transform
```

```.babelrc
// .babelrc

{
  ...
  "plugins": [
    ...
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false,
        "runtime": "automatic",
        "importSource": "scriptable-transform"
      }
    ]
  ]
}
```


```tsx
import { render } from 'scriptable-transform';

const root = new ListWidget();

function App() {
  return (
    <>
      <text onCreate={(text: WidgetText) => text.textColor = Color.cyan()} text={'AAAA'} />
      <text text={'BBBB'} />
      <stack>
        <text text={'CCC'} />
        <text text={'DDD'} />
      </stack>
      <stack onCreate={(stack: WidgetText) => stack.url = 'https://github.com/kyuuseiryuu'}>
        <text text={'EEEE'} />
        <date date={new Date()} />
      </stack>
    </>
  );
}

render(<App />, root);

root.presentMedium().then();
```

## [Demo](https://github.com/kyuuseiryuu/scriptable-transform-demo)