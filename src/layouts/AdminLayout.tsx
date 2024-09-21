import React, { ReactNode } from 'react';
import LeftBar from '../components/LeftBar';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <LeftBar />
            <div className='flex flex-col w-full'>
                <main className="flex-grow text-white bg-zinc-950 px-20 py-12">
                    {children}
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default AdminLayout;
