import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Home from './components/Home';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function App() {
    const [ value, setValue ] = React.useState('one');
    const handleChange = (event, value ) => {
      setValue(value);
    }
    return (
      <div className="App">
        <Box sx={{ width: '100%' }}>
         <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Personal trainer App
            </Typography>
          </Toolbar>
          
           <Tabs
            value={value}
            onChange={handleChange}
            textColor="White"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            position= 'right'
            >
              <Tab value='home' label='Home' />
              <Tab value='customerlist' label='Customers' />
              <Tab value='traininglist' label='Training' />
          </Tabs>
          </AppBar>
        {value === 'home' && <Home />}
				{value === 'customerlist' && <Customerlist />}
				{value === 'traininglist' && <Trainingslist />}
        </Box>
      </div>
    );
  }
  
  export default App;
  