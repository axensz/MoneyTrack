import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen'; // Pantalla de carga
import Login from "./components/login"; 
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/home";
import Transactions from "./components/Transactions";
import Account from "./components/account";
import AccountConfig from "./components/accountConfig";
import CreateAccount from "./components/createBankAccount";
import CreateTransaction from "./components/createTransaction";
import BankAccount from './components/bankAccount';



function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de carga inicial */}
        <Route path="/" element={<LoadingScreen />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        {/*Ruta de Olvidaste tu contraseña */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Ruta de restablecimiento de contraseña */}
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Ruta de inicio */}
        <Route path="/home" element={<Home />} />

        {/* Ruta de transacciones */}
        <Route path="/transactions" element={<Transactions />} />

        {/* Ruta de configuración de cuenta*/}
        <Route path="/account" element={<Account />} />

        {/* Ruta de configuración de cuenta*/}
        <Route path="/accountConfig" element={<AccountConfig />} />

        {/* Ruta de creacion cuentas bancarias */}
        <Route path="/createaccount" element={<CreateAccount />} />

        {/* Ruta de cuenta bancaria */}
        <Route path="/account/:bankName" element={<BankAccount/>} />

        {/* Ruta de creacion de transacciones */}
        <Route path="/createtransaction" element={<CreateTransaction />} />

        {/* Agrega más rutas según sea necesario (ej: registro, inicio, etc.) */}
      </Routes>
    </Router>
  );
}

export default App;