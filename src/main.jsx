import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { APIProvider } from '@vis.gl/react-google-maps';


const GMAP_API = import.meta.env.VITE_GMAP_API;

createRoot(document.getElementById('root')).render(
    <APIProvider apiKey={GMAP_API} onLoad={() => console.log('Maps API has loaded.')}>
        <App/>
    </APIProvider>
)
