import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../services/auth';
import { setCookie } from '../utils/cookie';
import Modal from '../components/NotificationModal';
import { useState } from 'react';
import logo from "../assets/logo.png"

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { mutate: loginUser } = useLogin();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onSubmit = (data) => {
    loginUser(
      { username: data.username, password: data.password },
      {
        onSuccess: (response) => {
          setCookie('token', response.token);
          navigate('/dashboard');
        },
        onError: (error) => {
          if (error.response?.data) {
            setModalMessage('نام کاربری یا رمز عبور اشتباه است');
          } else {
            setModalMessage('An error occurred. Please try again.');
          }
          setModalOpen(true);
        }
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border flex flex-col justify-center items-center rounded-[40px] px-8 pt-6 pb-8 mb-4 w-[460px]">
        <img src={logo} alt="" className='mt-12 mb-5' />
        <h2 className="text-2xl font-bold mb-24 text-center">فرم ورود</h2>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />

        <div className="mb-4">
          <input
            type="text"
            placeholder="نام کاربری"
            className="bg-[#F2F2F2] appearance-none rounded-[15px] w-[400px] h-[53px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('username', { required: 'نام کاربری ضروری است' })}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="رمز عبور "
            className="bg-[#F2F2F2] appearance-none rounded-[15px] w-[400px] h-[53px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'رمز عبور حداقل باید 6 رقم باشد' } })}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="submit"
            className="w-[400px] h-[53px] bg-[#55A3F0] hover:bg-blue-700 text-white text-xl font-semibold py-2 px-4 rounded-[15px] focus:outline-none focus:shadow-outline"
          >
            ورود
          </button>
        </div>
          <Link to={"/register"} className='w-full mt-4'>حساب کاربری ندارید ؟ <span className='text-[#3A8BED]'>ثبت نام</span></Link>
      </form>
    </div>
  );
}

export default Login;
