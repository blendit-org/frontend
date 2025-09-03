
import Footer from './Footer';
import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface IProps{
    children: ReactNode;
}

const CommonLayout = ({children}:IProps) => {
    return (
        <div>
            <Navbar />
            <div>{children}</div>
            <Footer/>
        </div>
    );
};

export default CommonLayout;