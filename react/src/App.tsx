import React from "react";
import LoginForm from "./components/LoginForm";
import "./styles/style.css";

export default function App() {
    return (
        <>
            <main>
                <section aria-label="Форма авторизации" className="auth-section">
                    <LoginForm />
                </section>
            </main>
            <footer>
                <p>© 2025 Компания какая-то капец вообще крутая</p>
            </footer>
        </>
    );
}
