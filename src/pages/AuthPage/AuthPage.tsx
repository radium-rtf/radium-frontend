import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/shared/ui/Button/Button';
import { emailValidator } from "../../constData";
import { useAppDispatch, useAppSelector } from '@/shared/api/store';
import { fetchUser, login } from '@/shared/api/actionCreators/actionCreatorsAuth';
import { IUser } from '../../interfaces/user.interface';
import styles from './AuthPage.module.scss';
import TextField from '@/shared/ui/TextField/TextField';
import * as Icons from '../../shared/ui/icons'
import Background from "@/shared/ui/Background/Background";
import {authSlice} from '@/shared/api/slices/authSlice';

const AuthPage: FC = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    const onLoginHandler: SubmitHandler<IUser> = (data: IUser) => {
        // if (!data.email.endsWith("@urfu.me")) data.email += "@urfu.me"
        // dispatch(login(data));
        // dispatch(fetchUser(token));
        // navigate('/my-courses');
        // reset();

        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNmUxNzk5MS1lMDUzLTRlNWItODJiZC0zMDU5YjM4OTQyODYiLCJleHAiOjE2OTE2OTQwNjV9.tZdFOtus9-dapnxjC9OZHxh-Nao_sSUCiHJsB1ecpBU');
        navigate('/my-courses');
    }

    return <>
        <Background />

        <form className={styles.root} onSubmit={handleSubmit(onLoginHandler)}>
            <h1>Вход</h1>
            <TextField
                register={() => register('email', {
                    required: "Введите почту",
                    pattern: {
                        value: emailValidator,
                        message: "Неправильная почта или пароль"
                    }
                })}
                type="text"
                name='email'
                label='Почта'
                postfix='@urfu.me'
                width='256px'
            />
            {errors?.email?.message && <p className={styles.error}>{errors.email.message}</p>}
            <TextField
                register={() => register('password', {
                    required: "Введите пароль"
                })}
                name='password'
                type={visible ? 'text' : 'password'}
                label='Пароль'
                icon={visible ? Icons.Visible : Icons.Invisible}
                onIconClick={() => setVisible(!visible)}
                width='256px'
            />
            {errors?.password?.message && <p className={styles.error}>{errors.password.message}</p>}
            <Button
                color='accent'
                label='Войти'
                width='256px'
            />
            {/*TODO: у нас пока нет возможности реализовать функционал восстановления*/}
            {/*<Link to={'/reduction'}>Забыли пароль?</Link>*/}
            <Link to={'/register'}>Зарегистрироваться</Link>
        </form>
    </>
}
export default AuthPage;
