import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import GarageView from '../pages/garage/GarageView';
import WinnersView from '../pages/winners/WinnersView';
import { Provider } from 'react-redux';
import store from '../redux/store';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<GarageView />} />
            <Route path="garage" element={<Navigate replace to="/" />} />
            <Route path="winners" element={<WinnersView />} />
          </Route>
          <Route
            path="*"
            element={<div className="not-found-page">404: Not Found</div>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
