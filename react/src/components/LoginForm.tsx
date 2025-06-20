import React, { useEffect, useState } from "react";

const correctLogin = "user@example.com";
const correctPassword = "password123";

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    const validatePassword = (pass: string) => pass.length >= 6;

    useEffect(() => {
        const stored =
            localStorage.getItem("authData") || sessionStorage.getItem("authData");
        if (stored) {
            try {
                const { login, password } = JSON.parse(stored);
                setLogin(login);
                setPassword(password);
                setRemember(!!localStorage.getItem("authData"));
            } catch {
                console.warn("Ошибка чтения данных авторизации");
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setMessage("");

        if (!validateEmail(login)) {
            setMessage("Введите корректный email");
            setError(true);
            return;
        }

        if (!validatePassword(password)) {
            setMessage("Пароль должен быть минимум 6 символов");
            setError(true);
            return;
        }

        if (login === correctLogin && password === correctPassword) {
            setMessage("Успешный вход!");
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem("authData", JSON.stringify({ login, password }));
        } else {
            setMessage("Неверный логин или пароль");
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
                <label htmlFor="login">Логин (email):</label>
                <input
                    type="email"
                    id="login"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Введите email"
                    aria-describedby="loginHelp"
                    required
                />
                <small id="loginHelp" className="help-text">
                    Введите корректный email
                </small>
            </div>

            <div className="input-group">
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    aria-describedby="passwordHelp"
                    required
                    minLength={6}
                />
                <small id="passwordHelp" className="help-text">
                    Минимум 6 символов
                </small>
            </div>

            <div className="input-group checkbox-group">
                <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Запомнить меня</label>
            </div>

            <button type="submit" id="loginBtn">
                Войти
            </button>

            <div className="social-login" aria-label="Социальные сети">
                <button type="button" className="social-btn vk" aria-label="VK">
                    VK
                </button>
                <button type="button" className="social-btn google" aria-label="Google">
                    Google
                </button>
                <button type="button" className="social-btn fb" aria-label="Facebook">
                    Facebook
                </button>
            </div>

            <div
                id="message"
                role="alert"
                aria-live="polite"
                style={{
                    color: error ? "red" : "green",
                    marginTop: "1em",
                    textAlign: "center",
                }}
            >
                {message}
            </div>
        </form>
    );
}
