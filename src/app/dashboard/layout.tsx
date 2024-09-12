import React from 'react'
import Sidebar from './Sidebar';


const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='bg-slate-100 h-screen'>
            <div className='md:w-64 hidden md:block fixed'>
                <Sidebar />
            </div>
                {children}
        </div>
    )
}

export default Layout