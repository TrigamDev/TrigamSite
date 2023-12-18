import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './css/globals.css'
import PageWrapper from './components/layout/PageWrapper.tsx'
import Home from './pages/Home.tsx'
import Projects from './pages/Projects.tsx'
import Art from './pages/Art.tsx'
import Blog from './pages/Blog.tsx'

const MainRouter = () => {
    return (
        <BrowserRouter>
            <PageWrapper>
                <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/projects' element={<Projects/>}/>
                <Route path='/art' element={<Art/>}/>
                <Route path='/blog' element={<Blog/>}/>
            </Routes>
            </PageWrapper>
        </BrowserRouter>
        
    )
}

let Router = MainRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router></Router>
    </React.StrictMode>
)
