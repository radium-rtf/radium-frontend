import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
// import Error from "../../components/Error/Error";
import { emailValidator } from "../../constData";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser, login } from '../../store/actionCreators/actionCreatorsAuth';
import { IUser } from '../../interfaces/user.interface';
import styles from './AuthPage.module.scss';
import TextField from '../../components/TextField/TextField';
import * as Icons from '../../icons/icons'
import { icons } from 'antd/es/image/PreviewGroup';
import Background from "../../components/Background/Background";


const AuthPage: FC = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    const onLoginHandler: SubmitHandler<IUser> = (data: IUser) => {
        dispatch(login(data));
        dispatch(fetchUser(token));
        navigate('/my-courses');
        reset();
    }


    // return (
    //     <>
    //         <div className={styles.wrapper}>
    //             <div className={styles.form}>
    //                 <form onSubmit={handleSubmit(onLoginHandler)}>
    //                     <p className={styles.header}>Вход</p>
    //                     <div className={styles.textField}>
    //                         <TextField
    //                             register={() => register('email', {
    //                                 required: "Email обязательное поле",
    //                                 pattern: {
    //                                     value: emailValidator,
    //                                     message: "Вы ввели не корректный email"
    //                                 }
    //                             })}
    //                             name='email'
    //                             type='email'
    //                             label='Почта'
    //                             postfix='@urfu.me'
    //                             width='256px'
    //                         />
    //                         {/*<Error className={'error'} error={errors?.email} errorMessage={errors.email?.message} />*/}
    //                         <TextField
    //                             register={() => register('password', {
    //                                 required: "Пароль обязательное поле"
    //                             })}
    //                             name='password'
    //                             type={visible ? 'text' : 'password'}
    //                             label='Пароль'
    //                             icon={visible ? Icons.Visible : Icons.Invisible}
    //                             onIconClick={() => setVisible(!visible)}
    //                             width='256px'
    //                         />
    //                         {/*<Error className={'error'} error={errors?.password}*/}
    //                         {/*    errorMessage={errors.password?.message} />*/}
    //                         <Button
    //                             style='accent'
    //                             label='Войти'
    //                             width='256px'
    //                         />
    //                         <Link to={'/reduction'}>
    //                             Забыли пароль?
    //                         </Link>
    //                         <Link to={'/register'}>
    //                             Зарегистрироваться
    //                         </Link>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </>
    // )
    return <>
        <Background />

        <form className={styles.root} onSubmit={handleSubmit(onLoginHandler)}>

        </form>
    </>
}
export default AuthPage;
