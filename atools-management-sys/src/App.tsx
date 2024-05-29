import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './Style.css'
import Layout from 'antd/lib/layout/layout';
import HeaderMenu from './components/header/HeaderMenu';

function App() {
  return (
    <Layout>
      <HeaderMenu></HeaderMenu>
    </Layout>
  );
}

export default App;
