import React, { useState } from "react";
import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
    opened: boolean;
    onClose: () => void;
    isLogin: boolean;  // Controls whether the modal is for login or registration
  }

const AuthModal: React.FC<AuthModalProps> = ({opened, onClose, isLogin}) => {
    const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});

    const { login, register } = useAuth();

    const handleSubmit = async () => {
        if (isLogin) {
          await login(form.email, form.password);
        } else {
          await register(form.email, form.password, form.confirmPassword);
        }
        onClose();  // Close the modal after login/register
      };

    return (
        <Modal opened={opened} onClose={onClose} title={isLogin ? 'Login' : 'Register'} centered>
            <TextInput
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <PasswordInput
                label="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {!isLogin && (
                <PasswordInput
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
            )}
            <Button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</Button>
        </Modal>
    )
}

export default AuthModal;