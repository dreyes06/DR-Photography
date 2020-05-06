import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import Header from './Components/Header/Header'
import './App.css';
import routes from './routes';

class App extends Component{
  render() {
    return(
      
      <div className='header' >
        <Link to='/' className='drp' style={{color: 'rgb(100, 156, 240)'}}><h1>DR Photography</h1></Link>
        {/* <img src='https://lh3.googleusercontent.com/8cf3Kjc8Fz9JICE315FiiuEMTa3UwdE9cU4XZdtc471D6SdPN6BOBbYx5tnP9sB1wpBjSimIGNmgMF1S0j5oTz--Ml9p1Zg8R8bh7PwhuSKfObriXVF-HzlNr3_PwMKs7YnxPKyn2KfEjIziN5FOlufiBcl84YOB4rw7vomO0GPuc5QSY747LHVV0rn9d1AV-7SI1XIaqIr5DdBPSsb8aVP6emSntOB9wemjP1cG9BIznT5k7GxlgHTyihh6FJq5kB7Eco0pq6Uxa8kH0yMHQzV99u2et1yq0_BF_Phw2AHuIO0b3YzZ2hvLcBMBpBjn-MxKSFiLes_xc1j4iBIX8QdPbMKAU0p8PVdvjR3-QlRkYIDye_Rv5VeEsD3e-gTEa_G7rkWe4y3ofUHgoVgSuDpOGsWQRnTY-2zfxXVkGEpk1LZzAXB-zGcp9k48CqCaziMTAgt-f1GN663KU9WtEZsesI-Km8mAzv-aE0CthcRfD4S9n6Kbc-Z82Hl77V-649pVdEA7-iyl85X05nP0toptFdXt5qKdQ8Yrg0TN48KA7dV96mt25rHc5i6cSNrO_m8aTrjkigkhSUf-GCQEnifHYzyzOS8iiosy7SH1yHjZk_SrDrkWF6ENBa5ePIPaia4_057svvdnPKGsdlUBYEUogwZr9RgXRaAjsj0NVzPocx5L7p2IQr03j3Jhmw=w1036-h969-no' alt='logo' className='logo' /> */}
        <Header/>
            
        {routes}
      </div>
    )
  }
}

export default App;
