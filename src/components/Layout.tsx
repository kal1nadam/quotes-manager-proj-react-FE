import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AuthModal from './AuthModal';

const Layout: React.FC = () => {
    const [authModalOpened, setAuthModalOpened] = useState(false);
    const [isLogin, setIsLogin] = useState(true);


    return (
        <>
        <Header
            setIsLogin={setIsLogin}
            setAuthModalOpened={setAuthModalOpened}
        />

        <AuthModal
            opened={authModalOpened}
            onClose={() => setAuthModalOpened(false)}
            isLogin={isLogin}
        />

        {/* Outlet renders the nested routes (other pages) */}
        <Outlet />
        </>
    );
};

export default Layout;
