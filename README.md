# Adapter

> an adapter for EZServer to be able to use Express middleware.

## install

```sh
npm i @peter-schweitzer/adapter
```

## Example

using Helmet:

```js
import { EZExpressServer as App } from '@peter-schweitzer/adapter';
import helmet from 'helmet';

const app = new App();

app.use(helmet());
```
