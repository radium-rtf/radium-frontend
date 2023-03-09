import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.interface';
import styles from './RegisterPage.module.scss';
import { FC } from 'react';
import art from '../../images/art.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onRegisterHandler: SubmitHandler<IUser> = (data: IUser) => {
        navigate('/');
        reset();
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
                        <Input
                            register={() => register('password')}
                            controlName='password'
                            type="text"
                            placeholder='Пароль'
                            style={{ marginBottom: '16px' }}
                            className='password'
                        />
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