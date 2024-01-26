import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import MovieSearch from './components/MovieSearch';

export default function App () {
  
    return (
      <Layout>
        <Route exact path='/' component={MovieSearch} />
      </Layout>
    );
}
