import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Error from "../../components/Error/Error";
import Input from '../../components/Input/Input';
import { useAppDispatch } from '../../hooks/redux';
import { registration } from '../../store/actionCreators/actionCreatorsAuth';
import { IUser } from '../../interfaces/user.interface';
import styles from './RegisterPage.module.scss';
import { emailValidator } from '../../constData';

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
                            register={() => register('username', {
                                required: "Имя обязательное поле",
                                minLength: {
                                    value: 4,
                                    message: "Минимальная длина имени 4 символа"
                                }
                            })}
                            controlName='username'
                            type="text"
                            placeholder='Имя'
                            style={{ marginBottom: '16px' }}
                            className='name'
                        />
                        <Error className={'error'} error={errors?.username} errorMessage={errors.username?.message} />
                        <p className={styles.info}>
                            Необязательно писать ФИО,
                            просто как хотите, чтобы мы вас называли.
                        </p>
                        <Input
                            register={() => register('email', {
                                required: "Email обязательное поле",
                                pattern: {
                                    value: emailValidator,
                                    message: "Вы ввели не корректный email"
                                }
                            })}
                            controlName='email'
                            type="text"
                            placeholder='Почта'
                            style={{ marginBottom: '16px' }}
                            className='email'
                        />
                        <Error className={'error'} error={errors?.email} errorMessage={errors.email?.message} />
                        <Input
                            register={() => register('password', {
                                required: "Поле password обязательное поле",
                                minLength: {
                                    value: 6,
                                    message: "Минимальная длина пароля 6 символов"
                                }
                            })}
                            controlName='password'
                            type="text"
                            placeholder='Пароль'
                            style={{ marginBottom: '16px' }}
                            className='password'
                        />
                        <Error className={'error'} error={errors?.password} errorMessage={errors.password?.message} />
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