import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Error from "../../components/Error/Error";
import Input from '../../components/Input/Input';
import { useAppDispatch } from '../../hooks/redux';
import { registration } from '../../store/actionCreators';
import { IUser } from '../../types/user.interface';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const dispatch = useAppDispatch();

    const onRegisterHandler: SubmitHandler<IUser> = (data: IUser) => {
        if (data) {
            dispatch(registration(data));
            navigate('/');
            reset();
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onRegisterHandler)}>
                    <p className={styles.header}>Регистрация</p>
                    <div className={styles.textField}>
                        <Input
                            register={() => register('username')}
                            controlName='username'
                            type="text"
                            placeholder='Имя'
                            style={{ marginBottom: '16px' }}
                            className='name'
                        />
                        <Error error={errors?.username} errorMessage={errors.username?.message} />
                        <p className={styles.info}>
                            Необязательно писать ФИО,
                            просто как хотите, чтобы мы вас называли.
                        </p>
                        <Input
                            register={() => register('email')}
                            controlName='email'
                            type="text"
                            placeholder='Почта'
                            style={{ marginBottom: '16px' }}
                            className='email'
                        />
                        <Error error={errors?.email} errorMessage={errors.email?.message} />
                        <Input
                            register={() => register('password')}
                            controlName='password'
                            type="text"
                            placeholder='Пароль'
                            style={{ marginBottom: '16px' }}
                            className='password'
                        />
                        <Error error={errors?.password} errorMessage={errors.password?.message} />
                        <Button
                            label='Зарегистрироваться'
                            className='btn'
                        />
                        <Link to={'/auth'}>
                            Вспомнили пароль?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterPage;