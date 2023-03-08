import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.interface';
import styles from './RegisterPage.module.scss';
import { FC } from 'react';
import art from '../../images/art.png';

const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onRegisterHandler: SubmitHandler<IUser> = (data: IUser) => {
        navigate('/');
        reset();
    }

    return (
        <div className={styles.wrapper}>
            {/* <img src={art} /> */}
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onRegisterHandler)}>
                    <p className={styles.header}>Регистрация</p>
                    <div className={styles.textField}>
                        <input
                            {...register('username')}
                            type="text"
                            placeholder='Имя'
                            style={{ marginBottom: '16px' }}
                            className={styles.name}
                        />
                        <p className={styles.info}>
                            Необязательно писать ФИО,
                            просто как хотите, чтобы мы вас называли.
                        </p>
                        <input
                            {...register('email')}
                            type="text"
                            placeholder='Почта'
                            style={{ marginBottom: '16px' }}
                            className={styles.email}
                        />
                        <input
                            {...register('password')}
                            type="text"
                            placeholder='Пароль'
                            style={{ marginBottom: '16px' }}
                            className={styles.password}
                        />
                        <button
                            className={styles.btn}
                        >
                            Зарегистрироваться
                        </button>
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