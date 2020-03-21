import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configStore } from './store';
import Body from './layout/Body';
import moment from 'moment'
import itLocale from 'moment/locale/it'

moment.locale('it', itLocale)
const store = configStore()

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
