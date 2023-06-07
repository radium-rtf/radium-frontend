import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { IUser } from '../../interfaces/user.interface';
import styles from './Recovery.module.scss';
import TextField from '../../components/TextField/TextField';

const Recovery: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
        navigate('/auth');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <p className={styles.header}>Восстановление</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textField}>
                        <TextField
                            register={() => register('email')}
                            name='email'
                            type='text'
                            label='Почта'
                        />
                        <Button
                            label='Отправить код'
                            style='accent'
                        />
                        <Button
                            label='Войти'
                            style='destructive'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Recovery;