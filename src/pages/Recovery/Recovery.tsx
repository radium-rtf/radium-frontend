import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { IUser } from '../../types/user.interface';
import styles from './Recovery.module.scss';

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
                        <Input
                            register={() => register('email')}
                            controlName='email'
                            type='text'
                            placeholder='Почта'
                            style={{ marginBottom: '16px' }}
                            className='email'
                        />
                        <Button
                            label='Отправить код'
                            className='btn'
                        />
                        <Input
                            register={() => register('confirmationСode')}
                            controlName='confirmationСode'
                            type='text'
                            placeholder='Код подтверждения'
                            style={{ marginBottom: '16px' }}
                            className='code'
                        />
                        <Button
                            label='Войти'
                            type='submit'
                            className='btnCode'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Recovery;