import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {ref} from 'firebase/database'
import rootReducer from './reducers'

const store = (ref: any) => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunkMiddleware,
      /*receives the store, then original dispatch, the action attached to the original dispatch*/
      store => dispatch => {
        ref.on('child_added', (snap: any) => {
          console.log('child added')
          return dispatch(snap.val())
        })
        return action => action.doNotSync ? dispatch(action) : ref.push(action)
      }
    )
  )
)

export default store;