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
var [foo, setFoo] = useState(0); // using array destructuring
console.log(foo()); // logs 0 - the initialValue we gave
setFoo(1); // sets _val inside useState's scope
console.log(foo()); // logs 1 - new initialValue, despite exact same call
