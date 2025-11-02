import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../modulesRoot';
import rootSaga from '../sagas/rootSaga';


const saga = createSagaMiddleware();


export const store = configureStore({
reducer: rootReducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(saga),
});


saga.run(rootSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;