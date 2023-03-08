import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.interface';
import styles from './AuthPage.module.scss';
import invisible from '../../images/invisible.png';

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onLoginHandler: SubmitHandler<IUser> = (data: IUser) => {
        navigate('/');
        reset();
    }

    return (
        <>
            <div className={styles.wrapper}>
                {/* <img src={art} /> */}
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(onLoginHandler)}>
                        <p className={styles.header}>Вход</p>
                        <div className={styles.textField}>
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
                                type='submit'
                                className={styles.btn}
                            >
                                Войти
                            </button>
                            <>
                                <Link to={'/reduction'}>
                                    Забыли пароль?
                                </Link>
                                <Link to={'/register'}>
                                    Зарегистрироваться
                                </Link>
                            </>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AuthPage;