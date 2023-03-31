import { FC } from "react"
import styles from './Profile.module.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../types/user.interface";
import logo from "../../images/кач.jpg"

const Profile: FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, reset } = useForm<IUser>();

    const saveHandler: SubmitHandler<IUser> = (data: IUser) => {
        console.log(data);
        navigate('/');
        reset();
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(saveHandler)}>
                        <p className={styles.header}>Профиль</p>
                        <img src={logo} alt='ава'></img>
                        <div className={styles.textField}>
                            <Input
                                controlName='name'
                                type='text'
                                placeholder='Имя'
                                className='name'
                                style={{ marginBottom: '16px' }}
                            />
                            <Input
                                controlName='email'
                                type='text'
                                placeholder='Почта'
                                className='email'
                                style={{ marginBottom: '16px' }}
                            />
                            <Input
                                controlName='password'
                                type='text'
                                placeholder='Пароль'
                                className='password'
                                style={{ marginBottom: '16px' }}
                            />
                            <Input
                                controlName='password'
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