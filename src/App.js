import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';


import { Dashboard} from './Components/';

const App = () => {
    toast.configure()

    return (
        <div className="App">
            <Dashboard/>
        </div>
    )

}

export default App;