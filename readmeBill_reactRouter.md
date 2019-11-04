# React Router
+ Dynamic routing vs Static routing (Angular)

## All imports
1. add react-router
2. ...

## Initial Setup
1. Install **React-Router**
  All `$ yarn add react-router` OR
  *Only* web app `$ yarn add react-router-dom@4.2.2` OR 
  *Only* native app `$ yarn add react-router-native`

2. Importing into `app.js` – can find these under **API** tag in [React-Router].
  + `BrowserRouter` - creates the router
  + `Route` - each route
  `import { BrowserRouter, Route } from 'react-router-dom';`

3. Setup w/in `app.js`
  *EXAMPLE:* `const routes = ( 
`    const ThisGuy() => ( <div>some JSX</div>); `
`    const ThatGal() => ( <div>some JSX</div>); `
`    <BrowserRouter> `
`      <div> `  *will eventually replace w/`Switch`
`        <route path="/" component={ThisGuy} exact={true} /> `
`        <route path="/someOther" component={ThatGal} /> `
`      </div> `
`    </BrowserRouter> `
`  ); `
  + `BrowserRouter` is a *component*. As per the API for `BrowserRouter`, you can only have *1 element* in it. 
  + `Route` is also a *component* and so is then used **multiple** times as a `child` of `BrowserRouter`...within a `div` tag (to fulfill the 1 component need).
    + **Route** requires the `component` prop but not the `path` prop. If `path` prop is *not* included, then React-Router assumes a **match**.
  + The `prop` named `exact` w/in *ThisGuy* is there so that the *route* `/` must match exactly or else it will not render – otherwise, when `/someOther` is hit, the devServer will render *both* *ThisGuy* and *ThatGal*.

### Setting up Client-side Routing

4. Will get a 404 if we use the second route, /someOther because we are handling *currently* routing using **server-side** code and *dev-server* cannot find a proper `html` page to render.
  + We need to *tweak* Webpack to tell **devServer** to *always* serve up our `index.html` page for all unknown 404s.
  w/in **webpack.config.js**: 
    ` devServer: { `
    `   contentBase: path.join(__dirname, 'public'), `
    `   historyApiFallback: true`
    `} `
  + This will *change* somewhat in Production.

5. Import **Switch** from React-Router. `Switch` allows React-Router to *stop* when it finds a matching Route (this means that a Route which omits the `path` prop would not run if another matched first).
  + `Switch` replaces the `<div>` tag w/in `BrowserRouter`.
`    <BrowserRouter> `
`      <Switch> `
`        <route path component ...etc> `
`        <route component={NotFoundPage}> `
`      </Switch> `
`    </BrowserRouter> `
  + Using this method, we can place a *component* above the `<Switch>` component so that it is rendered on *every* page. Doing this, we must *conform* to the API's specifications – only 1 element, i.e. add a `<div>`
`    const SomeComponent = () => (<div>...JSX</div>); `
`    <BrowserRouter> `
`      <div> `
`        <SomeComponent /> `
`        <Switch> `
`          <route ...> `
`          <route ...> `
`        </Switch> `
`      </div> `
`    </BrowserRouter> `

6. Change to **client-side** routing by using `Link` and `NavLink` Components provided by React-Router. This allows the page to render *without* needing a page refresh because it simply renders the code we already have in our components (w/in our APP).
  1. import `Link` and `NavLink`components into `src/app.js`
    `import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'; `
  2. Use `Link` in JSX where there would be an `<a>` tag, using the `to="<some path>"`
    *EXAMPLE*: `<Link to="/">Go Home</Link>` 
  3. Use `NavLink` w/page *navigation*. `NavLink` allows for custom styling.
    + Target `.is-active` in SCSS file to style it. There are several values defined in the API which can be used.
      *EXAMPLE*: `<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>`

## Modularizing
1. Create `src/routers/` and `src/routers/AppRouter.js`
2. Place code into `AppRouter.js`
  + Will have to break code out of `const routes` and into `const AppRouter` so it can be *exported*.
  + Will (also) have to move the proper `import`s into this new file so it will work.
3. Import `AppRouter` into `src/app.js`

## Query Strings & URL Params
+ React-router gives us access to *hidden* `props`. See them using a on one of the Component pages when it is rendered, e.g. `console.log(props);`
Some `props` included with `NavLink`:

+ pathname - the current URL
  If URL is `localhost:8080/create` ->
  `Object {location: pathname: "/create"}`
+ search - for query-strings
  w/in URL: `localhost:8080/?query=rent&sort=date` places a value into `Object {location: search: "?query=rent&sort=date"}`
+ hash - like *anchors* in a page
  w/in URL: `localhost:8080/#contact-us` places a value into `Object{location: hash: "#contact-us"}`
+ Can *dynamically* change route and gather than info. W/in `router.js` or wherever your *routes* are set up, add `:id` to a route.
  `<Route path="/edit/:id" component={EditPage} />`
Then w/in the Component, you could use `{props.match.params.id}` to render/use the `id` now stored in `props`.

# Useful Links
[React-Router](reacttraining.com/react-router/web/guides/philosophy)