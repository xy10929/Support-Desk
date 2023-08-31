# Support Desk App

Support ticket application built with the MERN stack.

## Simpler state management

#### Tickets and note state

Our ticket and note state in Redux can be simplified by removing `isLoading`, `isSuccess`, `isError` and `message` from state.

There is no real need for `isLoading` or `isSuccess` as this can be inferred from
presence or absence of data - i.e. If we have tickets then we are not loading and we
successfully got our tickets, if we don't have tickets then we are loading the
tickets. We either have the tickets or we are loading the tickets.
For more advice on if you should use loading booleans or not then [this article
from Kent C Dodds](https://kentcdodds.com/blog/stop-using-isloading-booleans) is
a very informative read.

We also don't need a reset function as we can reset our state in our pending
case that we get from using an AsyncThunk. Relying on state being explicitly
reset with it's own action did cause some bugs for students with redirection and
tickets not showing, so if that sounds like something you are experiencing then
this is likely the fix you need.
It was also a little complex to reason about if and when you needed to
reset state from your components.

For our error and failures to fetch tickets or notes, by using an AsyncThunk we
can [ unwrap ](https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions) the original Promise at component level. This also removes the need
for a useEffect to monitor state and show an error message to the user if for
whatever reason we got a bad response.

We can also unwrap our Promise on form submission when creating a ticket or
note, which again removes the need for a useEffect to watch state. If we
successfully create a ticket then we can redirect the user, if we failed to
create a ticket then we can show the user the error message from our API.
This follows the React advice for [keeping side effects in event handlers where
possible](https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects) i.e. not using a useEffect if you don't have to.

> Changes and detailed notes can be seen in [ticketSlice.js](./frontend/src/features/tickets/ticketSlice.js), [noteSlice.js](./frontend/src/features/notes/noteSlice.js), [Tickets.jsx](./frontend/src/pages/Tickets.jsx) and [Ticket.jsx](./frontend/src/pages/Ticket.jsx)

#### Auth state

Similar to ticket and note state, we don't really need an `isError` or `message`
part to our state as again we can unwrap the Promise from our AsyncThunk at
component level. This allows us to do something when the Promise is resolved -
_like redirecting the user after login and showing a success message with the
users name_, or do something else if the Promise was
rejected - _like showing a toast error message_. Unwrapping our original Promise
also removes the need in our Login and Register components for a useEffect to
watch state as we can handle this all in our `onSubmit` event handlers.
Since the only places we need `isError` or `message` was in Login and Register,
this doesn't really need to be in Redux state.

> Changes can be seen in [authSlice.js](./frontend/src/features/auth/authSlice.js), [Login.jsx](./frontend/src/pages/Login.jsx) and [Register.jsx](./frontend/src/pages/Register.jsx)

## Usage

### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URI and your JWT secret

### Install backend dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```
