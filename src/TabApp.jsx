import React, { useState } from 'react'
import './App.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customer from './components/Customer';
import Training from './components/Training';

function TabApp() {
  const [value, setValue] = useState('one');
  const handleChange = (event, value) => {
      setValue(value);
  };
  
  return (
      <div>
          <Tabs value={value} onChange={handleChange}>
              <Tab value="one" label="CUSTOMER" />
              <Tab value="two" label="TRAINING" />
          </Tabs>
          {value === 'one' && <Customer />}
          {value === 'two' && <Training />}
      </div>
  );
}

export default TabApp
