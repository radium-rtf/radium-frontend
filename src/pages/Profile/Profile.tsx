import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button/Button";
import TextField from "@/shared/ui/TextField/TextField";
import empty from "../../images/empty-profile.png";
import radiumLogo from "../../images/радиум лого.svg";
import { IProfile } from "../../interfaces/user.interface";
import styles from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from "@/shared/api/store";
import Background from "@/shared/ui/Background/Background";
import TopPanel from "@/shared/ui/TopPanel/TopPanel";
import * as Icons from "../../shared/ui/icons";
import List from "@/shared/ui/List/List";
import line from '../../images/Rectangle 11.svg'
import { useDispatch } from "react-redux";
import { fetchUser, updateProfileUser } from "@/shared/api/actionCreators/actionCreatorsAuth";

const Profile: FC = () => {
    const userName = 'андрей'
    const userImg = empty
    const profileMenu = [
        {
            title: 'Профиль',
            items: [
                {
                    title: 'Редактирование',
                    icon: Icons.Edit,
                }
            ]
        }
    ]

    const navigate = useNavigate();
    const { handleSubmit, reset, register } = useForm<IProfile>();
    const profile = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    const saveHandler: SubmitHandler<IProfile> = (data: IProfile) => {
        navigate('/');
        reset();
    }

    const updateImage = (name: string, avatar: string) => {
        dispatch(updateProfileUser(token, name, avatar));
        dispatch(fetchUser(token));
    }

    return (
        <>
            <Background />
            <TopPanel
                image={radiumLogo}
                title='Радиум'
                username={userName}
                profile={userImg}
            />
            <div className={styles.wrapper}>
                <div className={styles.panel}>
                    <List
                        items={profileMenu}
                    />
                </div>
                <div className={styles.form}>
                    <div className={styles.title}>
                        <h1 className={styles.header}>Редактирование</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.imgAndButton}>
                            <img src={profile.avatar || empty} alt='ава' className={styles.profileImg}></img>
                            <Button
                                label='Загрузить новую картинку'
                                width={216}
                                onClick={() => updateImage('', '')}
                            />
                        </div>
                        <form onSubmit={handleSubmit(saveHandler)}>
                            <div className={styles.textField}>
                                <TextField
                                    register={() => register('username')}
                                    name='username'
                                    type='text'
                                    label='Имя'
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
                                    label='Новый пароль'
                                    width='256px'
                                />
                                <img src={line} alt="" className={styles.line}></img>
                                <TextField
                                    register={() => register('confirmPassword')}
                                    name='confirmPassword'
                                    type='text'
                                    label='Пароль'
                                    width='256px'
                                />
                                <Button
                                    label='Подтвердить'
                                    color="accent"
                                    width={256}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;