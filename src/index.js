import "./styles.css";

function useState(initialValue) {
  let _val = initialValue;
  function setState(newState) {
    _val = newState;
  }
  return [_val, setState];
}
// var [foo, setFoo] = useState(0);
// console.log(foo); // logs 0 without needing function call
// setFoo(1); // sets _val inside useState's scope
// console.log(foo); // logs 0 - oops!!

const MyReact = (function() {
  let hooks = [];
  let currentHook = 0;
  return {
    render: Component => {
      const Comp = Component();
      Comp.render();
      currentHook = 0;
      return Comp;
    },
    useState: initialValue => {
      hooks[currentHook] = hooks[currentHook] || initialValue;
      const currentHookIndex = currentHook;
      function setState(newState) {
        hooks[currentHookIndex] = newState;
      }
      return [hooks[currentHook++], setState];
    },
    useEffect: (callback, deps) => {
      const hasNoDeps = !deps;
      const hasDepsChange = hooks[currentHook]
        ? deps.some((dep, i) => !Object.is(dep, hooks[currentHook][i]))
        : true;
      if (hasNoDeps || hasDepsChange) {
        callback();
        hooks[currentHook] = deps;
      }
      currentHook++;
    }
  };
})();
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('');
  MyReact.useEffect(() => {
    console.log("effect", count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    changeText: newText => setText(newText),
    render: () => console.log(count,text),
  };
}
let counter;
counter = MyReact.render(Counter);
counter.click();
counter.changeText('Orange');
counter = MyReact.render(Counter);
