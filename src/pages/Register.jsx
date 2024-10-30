import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../services/auth';
import { setCookie } from '../utils/cookie';
import { useState } from 'react';
import NotificationModal from '../components/NotificationModal';
import logo from "../assets/logo.png"

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const { mutate: registerUser } = useRegister();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const password = watch('password');

  const onSubmit = (data) => {
    registerUser(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          setCookie('username', data.username);
          navigate('/login');
        },
        onError: (error) => {
          setModalMessage(
            error.response?.data
              ? 'کاربر با این نام کاربری وجود دارد'
              : 'An error occurred. Please try again.'
          );
          setModalOpen(true);
        }
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border flex flex-col justify-center items-center rounded-[40px] px-8 pt-6 pb-8 mb-4 w-[460px]">
        <img src={logo} alt="" className='mt-12 mb-5' />
        <h2 className="text-2xl font-bold mb-24 text-center">فرم ثبت نام</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="نام کاربری"
            className="bg-[#F2F2F2] appearance-none rounded-[15px] w-[400px] h-[53px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="رمز عبور"
            className="bg-[#F2F2F2] appearance-none rounded-[15px] w-[400px] h-[53px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            className="bg-[#F2F2F2] appearance-none rounded-[15px] w-[400px] h-[53px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('confirmPassword', {
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="submit"
            className="w-[400px] h-[53px] bg-[#55A3F0] hover:bg-blue-700 text-white text-xl font-semibold py-2 px-4 rounded-[15px] focus:outline-none focus:shadow-outline"
          >
            ثبت نام
          </button>
        </div>
        <Link to={"/login"} className='w-full mt-4'>حساب کاربری دارید ؟ <span className='text-[#3A8BED]'>ورود</span></Link>
      </form>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}

export default Register;
