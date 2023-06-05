import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Error from "../../components/Error/Error";
import { useAppDispatch } from '../../hooks/redux';
import { registration } from '../../store/actionCreators/actionCreatorsAuth';
import { IUser } from '../../interfaces/user.interface';
import styles from './RegisterPage.module.scss';
import { emailValidator } from '../../constData';
import Input from '../../components/Input/Input';
import * as Icons from '../../icons/icons'

const RegisterPage: FC = () => {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const dispatch = useAppDispatch();

    const onRegisterHandler: SubmitHandler<IUser> = (data: IUser) => {
        if (data) {
            dispatch(registration(data));
            navigate('/my-courses');
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
                            register={() => register('name', {
                                required: "Имя обязательное поле",
                                minLength: {
                                    value: 4,
                                    message: "Минимальная длина имени 4 символа"
                                }
                            })}
                            name='name'
                            type='text'
                            label='Имя'
                            width='256px'
                        />
                        <Error className={'error'} error={errors?.name} errorMessage={errors.name?.message} />
                        {/* <p className={styles.info}>
                            Необязательно писать ФИО,
                            просто как хотите, чтобы мы вас называли.
                        </p> */}
                        <Input
                            register={() => register('email', {
                                required: "Email обязательное поле",
                                pattern: {
                                    value: emailValidator,
                                    message: "Вы ввели не корректный email"
                                }
                            })}
                            name='email'
                            type='email'
                            label='Почта'
                            postfix='@urfu.me'
                            width='256px'
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
                            name='password'
                            type={visible ? 'text' : 'password'}
                            label='Пароль'
                            icon={visible ? Icons.Visible : Icons.Invisible}
                            onIconClick={() => setVisible(!visible)}
                            width='256px'
                        />
                        <Error className={'error'} error={errors?.password} errorMessage={errors.password?.message} />
                        <Button
                            style="accent"
                            label='Зарегистрироваться'
                            onClick={() => console.log('')}
                            width='256px'
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