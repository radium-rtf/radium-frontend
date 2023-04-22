import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Checkbox from "../../components/Checkbox/Checkbox";
import Input from '../../components/Input/Input';
import { IUser } from '../../types/user.interface';
import styles from './AuthPage.module.scss';
import Error from "../../components/Error/Error";
import { emailValidator } from "../../constData";

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: {errors} } = useForm<IUser>();

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
                                register={() => register('email', {
                                    required: "Email обязательное поле",
                                    pattern: {
                                        value: emailValidator,
                                        message: "Вы ввели не корректный email"
                                    }
                                })}
                                controlName='email'
                                type='text'
                                placeholder='Почта'
                                className='email'
                                style={{ marginBottom: '16px' }}
                            />
                            <Error error={errors?.email} errorMessage={errors.email?.message}/>
                            <Input
                                register={() => register('password', {
                                    required: "Пароль обязательное поле"
                                })}
                                controlName='password'
                                type='text'
                                placeholder='Пароль'
                                className='password'
                                style={{ marginBottom: '16px' }}
                            />
                            <Error error={errors?.password} errorMessage={errors.password?.message}/>
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
<<<<<<< HEAD
=======
                            <Checkbox
                                className='customCheckbox'
                                type='checkbox'
                            />
>>>>>>> 42655556f2d6626e6259811125fead969078ec9a
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AuthPage;