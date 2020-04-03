import "./styles.css";

function useState(initialValue) {
  let _val = initialValue;
  function setState(newState) {
    _val = newState;
  }
  return [_val, setState];
}
var [foo, setFoo] = useState(0);
console.log(foo); // logs 0 without needing function call
setFoo(1); // sets _val inside useState's scope
console.log(foo); // logs 0 - oops!!

function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log(count)
  };
}
// const counter = Counter();
// counter.render();
// counter.click();
// counter.render();
