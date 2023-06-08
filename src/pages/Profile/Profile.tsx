import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import empty from "../../images/empty-profile.png";
import { IProfile } from "../../interfaces/user.interface";
import styles from './Profile.module.scss';
import { useAppSelector } from "../../hooks/redux";

const Profile: FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, reset, register } = useForm<IProfile>();
    const profile = useAppSelector(state => state.profile)

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
                        <img src={profile.avatar || empty} alt='ава' className={styles.profileImg}></img>
                        <div className={styles.textField}>
                            <TextField
                                register={() => register('username')}
                                name='username'
                                type='text'
                                label='имя'
                                width='256px'
                            />
                            <TextField
                                register={() => register('email')}
                                name='email'
                                type='text'
                                label='Почта'
                                width='256px'
                            />
                            <TextField
                                register={() => register('password')}
                                name='password'
                                type='text'
                                label='Пароль'
                                width='256px'
                            />
                            <TextField
                                register={() => register('confirmPassword')}
                                name='confirmPassword'
                                type='text'
                                label='Подтверждение пароля'
                                width='256px'
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