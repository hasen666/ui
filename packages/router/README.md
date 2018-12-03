# @talend/react-cmf-router

This is the old router of react-cmf packaged as external dependency.

## Setup

First add it to your bootstrap app

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const router = getRouter({ history, sagaRouterConfig });

cmf.bootstrap({
    modules: [router.cmfModule],
    RootComponent: router.RootComponent,
});
```

Then every cmfConnect component do not have anymore the context.router. That means you have to search for context.router in your code and update it.

before
```
function myaction(event, data context) {

}
```

## routerAPI

routerAPI is an object which expose the following api:


`routerAPI.selectors.getLocation(state)` return the current [location object](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) which is persisted from `history` into redux store

`routerAPI.selectors.getPath(state)` return the current path (a string) which is the fragment so you can apply matchPath to it.