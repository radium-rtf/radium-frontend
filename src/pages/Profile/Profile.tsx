import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import logo from "../../images/кач.jpg";
import { IProfile } from "../../interfaces/user.interface";
import styles from './Profile.module.scss';

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
                                name='username'
                                type='text'
                                label='имя'
                            />
                            <Input
                                register={() => register('email')}
                                name='email'
                                type='text'
                                label='Почта'
                            />
                            <Input
                                register={() => register('password')}
                                name='password'
                                type='text'
                                label='Пароль'
                            />
                            <Input
                                register={() => register('confirmPassword')}
                                name='confirmPassword'
                                type='text'
                                label='Подтверждение пароля'
                            />
                            <Button
                                label='Сохранить'
                                style="accent"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Profile;