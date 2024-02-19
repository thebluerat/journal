import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Calendar from "./components/calendar";

function App() {
    return(
        <>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route>
                            <Route path='/calendar' element={<Calendar/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}
export default App;
