import {FC} from "react"
import styles from "./Comment.module.scss"
import ProfilePicture from "../profile-picture/ProfilePicture";

interface CommentProps {
    image: string,
    name: string,
    comment: string,
}

const Comment: FC<CommentProps> = ({
    image,
    name,
    comment,
}) => <div className={styles["comment"]}>
    <div className={styles["user"]}>
        <ProfilePicture image={image} size="24px" />
        <label>{name}</label>
    </div>
    <p>{comment}</p>
</div>

export default Comment