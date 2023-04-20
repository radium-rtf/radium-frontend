import { FC, useEffect } from "react"
import styles from './Profile.module.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfile, IUser } from "../../types/user.interface";
import logo from "../../images/кач.jpg"

const Profile: FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, reset, register } = useForm<IProfile>();

    const saveHandler: SubmitHandler<IProfile> = (data: IProfile) => {
        navigate('/');
        reset();
    }
    
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(saveHandler)}>
                        <p className={styles.header}>Профиль</p>
                        <img src={logo} alt='ава' className={styles.profileImg}></img>
                        <div className={styles.textField}>
                            <Input
                                register={() => register('username')}
                                controlName='username'
                                type='text'
                                placeholder='имя'
                                className='name'
                                style={{ marginBottom: '16px' }}
                            />
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
                            <Input
                                register={() => register('confirmPassword')}
                                controlName='confirmPassword'
                                type='text'
                                placeholder='Подтверждение пароля'
                                className='password'
                                style={{ marginBottom: '16px' }}
                            />
                            <Button
                                label='Сохранить'
                                type='submit'
                                className='btn'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Profile;