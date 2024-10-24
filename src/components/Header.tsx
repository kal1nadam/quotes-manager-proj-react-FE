import { Container, Group, Button } from '@mantine/core';
import classes from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomLogo from "../assets/my_logo.png";

interface HeaderProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    setAuthModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}


const Header: React.FC<HeaderProps> = ({setIsLogin, setAuthModalOpened}) => {
    const navigate = useNavigate();

    const { isLoggedIn, logout } = useAuth();

    const handleLoginClick = () => {
        setIsLogin(true);
        setAuthModalOpened(true);
    }

    const handleRegisterClick = () => {
        setIsLogin(false);
        setAuthModalOpened(true);
    }

    return (
        <header className={classes.header}>
        <Container size="md" className={classes.inner}>
            <img src={CustomLogo} alt="Logo" style={{ width: 40, height: 40 }} />
            <Group gap={5} visibleFrom="xs">
            {!isLoggedIn ? (
                <>
                <Button onClick={handleLoginClick}>Login</Button>
                <Button onClick={handleRegisterClick}>Register</Button>
                </>
            ) : (
                <Button onClick={logout}>Logout</Button>
            )}
            <Button onClick={() => navigate('/my-quotes')} disabled={!isLoggedIn}>My Quotes</Button>
            </Group>

        </Container>
        </header>
    );
}


export default Header;