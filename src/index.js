import b from "./b";
import "./index.css";
import "./index.less";
import "./index.styl";
import "./index.scss";
import $ from 'jquery'
import logo from './assets/icon-dev.png'
console.log(b.str);

let img = new Image();
console.log(logo);
img.src = logo;
document.body.appendChild(img)

class B{
  age = 27;
}

class A extends B {
  @log
  name = "test";
}
const a = new A();
console.log(a.name);

function log(target,key,descriptor) {
  console.log(target); // A的原型B
  console.log(key); // 属性名name
  console.log(descriptor); // 属性描述器
  let old = descriptor.initializer;
  descriptor.initializer = function(){
    let value = old.call(this)
    value += '-112'
    return value;
  }
}

function* gen() {
  yield 1;
}
const g = gen();
console.log(g.next());

console.log('===========分割线==============')

console.log(window.$)

class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

const p = new Person();
console.log(p.kidCount())