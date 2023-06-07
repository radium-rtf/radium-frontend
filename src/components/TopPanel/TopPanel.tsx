import {FC, useState, useEffect} from "react"
import styles from "./TopPanel.module.scss"
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import MenuItem from "../MenuItem/MenuItem";
import * as Icons from "../../icons/icons"
import {useNavigate} from "react-router-dom";

interface TopPanelProps {
    image?: string
    title?: string
    username?: string
    profile?: string
}

const TopPanel: FC<TopPanelProps> = ({
    image,
    title,
    username,
    profile,
}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const weight = Math.max(0, Math.min(scrollPosition / 64, 1));
    const size = 48 - (weight * 16);
    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY)
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return <>
        <div style={{width: "100%", height: 128}} />
        <div
            className={styles["panel"]}
            style={{
                height: (128 - weight * 64),
                borderBottomColor: `rgba(255, 255, 255, ${weight * 0.1})`,
                background: `rgba(34, 37, 38, ${weight})`,
                paddingTop: 48 - (weight * 34),
                paddingBottom: 32 - (weight * 18),
            }}
        >
            <img
                src={image}
                style={{width: size, height: size, borderRadius: 8}}
            />
            <h2 style={{fontSize: 32 - (weight * 12)}}>{title}</h2>
            <MenuItem
                icon={<ProfilePicture
                    image={profile}
                    size={size}
                />}
                iconSize="large"
                label={username}
                style={{
                    marginRight: -24,
                    flexDirection: "row-reverse",
                }}
                onClick={() => setMenuOpen(true)}
            />
            {isMenuOpen && <>
                <div
                    style={{position: "fixed", inset: 0}}
                    onClick={() => setMenuOpen(false)}
                />
                <menu
                    className={styles["menu"]}
                    style={{top: 112 - weight * 50}}
                >
                    <MenuItem
                        icon={Icons.Profile}
                        iconSize="small"
                        label="Профиль"
                        onClick={() => navigate('/profile')}
                    />
                    <MenuItem
                        icon={Icons.Course}
                        iconSize="small"
                        label="Мои курсы"
                        onClick={() => navigate('/my-courses')}
                    />
                    <MenuItem
                        icon={Icons.Group}
                        iconSize="small"
                        label="Мои группы"
                    />
                    <MenuItem
                        icon={Icons.Exit}
                        iconSize="small"
                        label="Выйти"
                    />
                </menu>
            </>}
        </div>
    </>
}

export default TopPanel