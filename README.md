# Router JS
Only load the JavaScript you want based on the classes of the `body` element of the page.

### Installation

```bash
yarn add @dartmoon/routerjs
```

or 

```bash
npm i @dartmoon/routerjs
```

### Usage

```js
import { router } from '@dartmoon/routerjs'

router.on('class_name', 'init', () => {
    //...
})

router.on('class_name', 'finalize', () => {
    //...
})
```

### Hooks
This library lets you hook your code in different stages of the execution:

- `init` your code is executed in the initialization phase
- `finalize` your code is executed after all `init` hooks are executed

### Common code
If you need to execute a piece of code on every page you can use the special keyword `common` instead of the class name.

```js
import { router } from '@dartmoon/routerjs'

router.on('common', 'init', () => {
    //...
})

router.on('common', 'finalize', () => {
    //...
})
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details