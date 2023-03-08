import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.interface';
import styles from './Recovery.module.scss';
import { FC } from 'react';
import art from '../../images/art.png';

const Recovery: FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<IUser>();

    return (
        <div className={styles.wrapper}>
            {/* <img src={art} /> */}
            <div className={styles.form}>
                <p className={styles.header}>Восстановление</p>
                <div className={styles.textField}>
                    <input
                        type="text"
                        placeholder='Почта'
                        style={{ marginBottom: '16px' }}
                        className={styles.email}
                    />
                    <button
                        className={styles.btn}
                    >
                        Отправить код
                    </button>
                    <input
                        type="text"
                        placeholder='Код подтверждения'
                        style={{ marginBottom: '16px' }}
                        className={styles.code}
                    />
                    <button
                        className={styles.btnCode}
                        onClick={() => navigate('/auth')}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Recovery;