import React from 'react';
import Main from './Main';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Main />
    </>
  );
}



