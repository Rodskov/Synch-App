// components/Layout.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastLayout = ({ children }) => (
  <div>
    {children}
    <ToastContainer />
  </div>
);

export default ToastLayout;
