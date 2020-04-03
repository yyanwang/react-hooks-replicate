import "./styles.css";

function useState(initialValue) {
  let _val = initialValue;
  function setState(newState) {
    _val = newState;
  }
  function state() {
    return _val;
  }
  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count() + 1),
    render: () => console.log(count())
  };
}
const counter = Counter();
counter.render();
counter.click();
counter.render();
