import {FC} from "react"
import styles from "./ProfilePicture.module.scss"
import empty from "../../../images/empty-profile.png"

interface ProfilePictureProps {
    image?: string,
    size?: number | string,
}

const ProfilePicture: FC<ProfilePictureProps> = ({
    image,
    size,
}) => <img
    src={image || empty}
    className={styles["pfp"]}
    style={{
        width: size,
        height: size,
    }}
/>

export default ProfilePicture