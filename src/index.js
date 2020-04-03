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
  let _val, _deps;
  return {
    render: Component => {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState: initialValue => {
      _val = _val || initialValue;
      function setState(newState) {
        _val = newState;
      }
      return [_val, setState];
    },
    useEffect: (callback, deps) => {
      const hasNoDeps = !deps;
      const hasDepsChange = _deps
        ? deps.some((dep, i) => dep !== _deps[i])
        : true;
      if (hasNoDeps || hasDepsChange) {
        callback();
        _deps = deps;
      }
    }
  };
})();
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log("effect", count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    render: () => console.log(count)
  };
}
let counter;
counter = MyReact.render(Counter);
counter.click();
counter = MyReact.render(Counter);
