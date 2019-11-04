# Redux
+ Used to make *state* centralized so there is no need for long `props` chains between Parents and distant Children.

## Setting up
+ Check out -> **`redux-101.js`**
1. Install Redux
  `$ yarn add redux@4.0.4`
2. Import **`createStore`**
  `import { createStore } from 'redux'; `
3. Set up the **createStore** call; it *requires* a function to be passed in.
  + Do not modify the *state*, instead `return` the new value or the old *state*.
  *EXAMPLE*:
  `  const store = createStore( (state = {someKey: someValue}) => { `
`    return state; `
`  }); `

  *SYNTAX* using `if,,,else`
`  const store = createStore((state = {someKey: someValue}, action) => { `
`    if (action.type === 'ACTION_VALUE') { `
`      return { `
`        someKey: state.someKey + 1  // or whatever `
`      }; `
`    } else { `
`      return state; `
`    } `
`  }); `

  *SYNTAX* using `switch...case`
`  ...code... `
`  switch (action.type) { `
`    case 'INCREMENT': `
`      return { `
`        someKey: state.someKey +1 `
`      }; `
`    default: `
`      return state; `
`  } `

  + There is no access to a *constructor* function, so we set the *default* w/in the argument list.
  ` (state = {someKey: someValue}) => { ...code...};`
  + Get the current *state* using **`.getState()`**
  ` console.log(store.getState()); `

## ACTIONS
+ describe that something *happened*
+ Use **Actions** to change the *state* – it allows us to *communicate* w/the *store*. It is simply an *object* that gets sent to the *store*
+ You "name" Actions by creating an object that uses **`type`** as a *key* and `CAPITALS_HERE` as their value – usually verbs (hence, actions)
  `  { `
  `    type: 'INCREMENT' `
  `  } `
+ You add this to the *store* using **`.dispatch()`** and passing the Action object into it.
` store.dispatch({ `
`   type: 'INCREMENT' `
`   otherValues: ...code `
` }); `
  + `type` and `otherValues` are *all* available on the **action** object which is passed into ->
  `  const store = createStore((state = {someKey: someValue}, action) => ... `
  + Technially, this is both a **create store** function as well as a **Reducer** (see below) as it determines how the *state* changes.
  + Better to use an *action generator* (see below) as it will throw actual **errors** if sth goes wrong.

## Watching for Changes & Sending Info to Store 
+ Watch for Changes to the Store w/ **`store.subscribe()`**
  *SYNTAX*: `store.subscribe( () => {} ); `
  *EXAMPLE*: Logs everytime *state* changes -> occurs when a *dispatch* is called -> 
` store.subscribe(() => { `
`    console.log(store.getState()); `
`  }); `

+ Sending information w/ `store.dispatch()`. *dispatch()* takes an object which requires a **type**. This is passed into the `const store` setup.
`  store.dispatch({ `
`    type: 'CAPITAL_NAME', `
`    otherValues: otherInfo `
`  }); ` 

+ **Unsubscribe** from listening to the *store* by setting `const unsubscribe` to the `return` value of `store.subscribe(..code);` then calling it, i.e. `unsubscribe();` – then placing it wherever you want to stop *notifying*:
`  const unsubscribe = store.subscribe(() => { ...code }); `
`  unsubscribe(); `
  + The *state* still changes, but we are not *notified* since we're using unsubscribe.

## REDUCERS
+ **Reducers** specify how an application's *state* changes in response to an *action*.
+ An example of a *Reducer* is logic that the `const store = createStore((state, action) => {...Switch code});` function dictates. BUT, the **reducer** *should* be split up and passed in.
  *EXAMPLE*:
`  const countReducer = (state, action) => { `
`    ...code `
`  }; `
`  const store = createStore(countReducer); `
  1. Most Apps have more than (1) Reducer.
  2. Reducers are *pure* functions – they do not 1) depend on or 2) mutate *any* outside variables (outside scope of function) but *only* depends on variables **passed in**.
  *EXAMPLE* Pure Function
`   const add = (a, b) => {  `
`    return a + b;  `
`  }; `
    *Not* Pure Function
`  let result; `
`  const add = (a, b) => {  `
`    result = a + b;  `
`  }; `
  3. **NEVER** change State or Action, instead return the State or Action on a new Object.

## Multiple Reducers
+ check out -> **`redux-expensify.js`**
` import { createStore, combineReducers } from 'redux'; `
+ Install **uuid** from npm to generate random *uuid*s.
`  $ yarn add uuid@3.3.3 `

## Action Generators
+ Generate our *dispatches* using an arrow function rather than explicity stating the *dispatch()*. Do this because it 1) allows for actual *errors* to be reported (as it's a function) and 2) allows us to *define* the **action object** once (albeit somewhat more complicated), but allows for DRY code.
`  const incrementCount = () => { `
`    type: 'INCREMENT' `
`  }; `
  Implement by calling it w/in *dispatch()*
`  store.dispatch(incrementCount()); `

+ Pass values into *action generator* w/2 steps. 
  1. Pass an *object* into `incrementCount( { someKey: someValue } ); `
`    store.dispatch(incrementBy({ incrementBy: 1 })); `
  2. Reference that *handler* w/in the *action generator* itself.
    1. First, set the default for `payload`.
    2. Next, move the `typeof` logic (previously w/in the Switch statement) into this arrow function.
`     const incrementCount = (payload = {}) => { `
`       type: 'INCREMENT' `
`        incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1 `
`     }; ` 

## SOME RESTRUCTURE/DESTRUCTURING
+ Can *destructure* Objects & Arrays but also *values* passed into functions.
  *EXAMPLE* 
`  const add = (data) => { `
`    return data.a + data.b; `
`  }; `
`  console.log( add({ a: 2, b: 12 }, c) ); `
    *BECOMES*
`  const add = ({ a, b }, c) => { `
`    return a + b; `
`  }; `
`  console.log(add( { a: 2, b: 12 }, 100 )); `
  + We are *destructuring* the Object passed into `add`; by doing so, we can rid ourselves of the need for `data`.

+ For the following *action generator* code, `payload` has a *default* value of `{}`:
`  const incrementCount = (payload = {}) => { `
`    return { `
`      type: 'INCREMENT', `
`      incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1 `
`    }; `
`  }; `
  + Destructure the `payload` Object by simply referencing `incrementBy`
`  const incrementCount = ( { incrementBy } = {} ) => { `
`    return { `
`      type: 'INCREMENT', `
`      incrementBy: typeof incrementBy === 'number' ? incrementBy : 1 `
`    }; `
`  }; `
  + Set up a *default* value for `incrementBy` which rids the need for explicitly stating it in the key:value pair below
`  const incrementCount = ( { incrementBy = 1 } = {} ) => { `
`    return { `
`      type: 'INCREMENT', `
`      incrementBy: incrementBy `
`    }; `
`  }; `
  + Can simplify it *further* by replacing the `return {..code}` w/ `({..code})` and dropping the second `incrementBy` as the key:value names are the same.
    + This structure **implicitly *returns* an object**.
`  const incrementCount = ( { incrementBy = 1 } = {} ) => ({ `
`    type: 'INCREMENT', `
`    incrementBy `
`  }); `



# Useful Links
[Redux Docs](redux.js.org)