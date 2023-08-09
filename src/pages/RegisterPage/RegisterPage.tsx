import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/Button';
// import Error from "../../components/Error/Error";
import { useAppDispatch } from '../../hooks/redux';
import { registration } from '../../store/actionCreators/actionCreatorsAuth';
import { IUser } from '../../interfaces/user.interface';
import styles from './RegisterPage.module.scss';
import { emailValidator } from '../../constData';
import TextField from '../../ui/TextField/TextField';
import * as Icons from '../../icons/icons'
import Background from "../../ui/Background/Background";

const RegisterPage: FC = () => {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const dispatch = useAppDispatch();

    const onRegisterHandler: SubmitHandler<IUser> = (data: IUser) => {
        if (data) {
            if (!data.email.endsWith("@urfu.me")) data.email += "@urfu.me"
            dispatch(registration(data));
            navigate('/my-courses');
            reset();
        }
    }

    return <>
        <Background />

        <form className={styles.root} onSubmit={handleSubmit(onRegisterHandler)}>
            <h1>Регистрация</h1>
            <TextField
                register={() => register('name', {
                    required: "Введите имя",
                    minLength: {
                        value: 2,
                        message: "Имя должно состоять хотя бы из двух символов"
                    }
                })}
                name='name'
                type='text'
                label='Имя'
                width='256px'
            />
            {errors?.name?.message && <p className={styles.error}>{errors.name.message}</p>}
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
                label='Зарегистрироваться'
                width='256px'
            />
            <Link to={'/auth'}>Войти</Link>
        </form>
    </>
}
export default RegisterPage;