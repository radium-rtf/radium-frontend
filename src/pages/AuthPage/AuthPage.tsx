import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.interface';
import styles from './AuthPage.module.scss';
import invisible from '../../images/invisible.svg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from "../../components/Checkbox/Checkbox";

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onLoginHandler: SubmitHandler<IUser> = (data: IUser) => {
        console.log(data);
        navigate('/');
        reset();
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(onLoginHandler)}>
                        <p className={styles.header}>Вход</p>
                        <div className={styles.textField}>
                            <Input
                                register={() => register('email')}
                                controlName='email'
                                type='text'
                                placeholder='Почта'
                                className='email'
                                style={{ marginBottom: '16px' }}
                            />
                            <Input
                                register={() => register('password')}
                                controlName='password'
                                type='text'
                                placeholder='Пароль'
                                className='password'
                                style={{ marginBottom: '16px' }}
                            />
                            <Button
                                label='Войти'
                                type='submit'
                                className='btn'
                            />
                            <Link to={'/reduction'}>
                                Забыли пароль?
                            </Link>
                            <Link to={'/register'}>
                                Зарегистрироваться
                            </Link>
                            <Checkbox
                                className='customCheckbox'
                                type='checkbox'
                                text='Чекбокс'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AuthPage;