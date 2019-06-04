import b from './b'
import './index.css'
import './index.less'
import './index.styl'
import './index.scss'

console.log(b.str)

@log
class A {
  name = 'test'
}
const a = new A()
console.log(a.name)

function log(target) {
  console.log(target)
}

function* gen() {
  yield 1
}

const g = gen()
console.log(g.next())
