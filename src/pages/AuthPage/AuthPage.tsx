import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Checkbox from "../../components/Checkbox/Checkbox";
import Input from '../../components/Input/Input';
import { IUser } from '../../types/user.interface';
import styles from './AuthPage.module.scss';
import RadioButton from "../../components/RadioButton/RadioButton";

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
                                register={() => register('email', {
                                    required: "Email обязательное поле",
                                })}
                                // error = error, errormessage
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
                            />
                            <RadioButton
                                className='customRadioButton'
                                type='radio'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AuthPage;