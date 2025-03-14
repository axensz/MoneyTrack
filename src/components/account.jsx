import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import logoMonogram from "../assets/logoMonogram.svg"; // Asegurar que la ruta es correcta
import { logout } from "../utils/auth"; // Importar la función de logout
import "../styles/account.scss";
import Header from "../components/Header";


const Account = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Eliminar datos de sesión del localStorage
        navigate("/login"); // Redirigir a la pantalla de inicio de sesión
    };

    return (
        <>
            <div className="mas-container">

            <Header />
                
                {/* Título */}
                <h1 className="page-title">Más Acciones</h1>

                {/* Contenedor de opciones */}
                <div className="options-container">
                    <div className="option" onClick={() => navigate("/accountConfig")}> 
                        <img src="/src/assets/user.svg" alt="Cuenta y privacidad" />
                        <span>Cuenta y privacidad</span>
                    </div>
                    <div className="option" onClick={handleLogout}> 
                        <img src="/src/assets/exit.svg" alt="Cerrar sesión" />
                        <span>Cerrar sesión</span>
                    </div>
                </div>
            </div>
            
            {/* Barra de navegación inferior */}
            <Navbar />
        </>
    );
};

export default Account;
