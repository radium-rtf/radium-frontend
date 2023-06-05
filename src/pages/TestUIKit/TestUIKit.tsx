import {FC, useState} from "react";
import Checkbox from "../../components/a/checkbox/Checkbox";
import RadioButton from "../../components/a/radio/RadioButton";
import Header from "../../components/Header/Header";
import TextField from "../../components/a/text-field/TextField";
import Button from "../../components/a/button/Button";
import * as Icons from "../../icons/icons";
import Switch from "../../components/a/switch/Switch";
import LinearProgress from "../../components/a/linear-progress/LinearProgress";
import RadialProgress from "../../components/a/radial-progress/RadialProgress";

const TestUIKit: FC = () => {
    const [visible, setVisible] = useState(false)

    return (
        <div>
            <Header
                className='header'
                title='Kotlin'
            />
            <Button
                style="accent"
                icon={Icons.Visible}
                label={"ABCDEFabcdef"}
                onClick={() => console.log("huy")}
            />
            <Button
                style="destructive"
                width="256px"
                icon={() => <RadialProgress progress={0.6} />}
                label="ABCDEFabcdef"
                onClick={() => console.log("huy")}
            />
            <Button
                style="outlined"
                icon={Icons.Invisible}
                label={"ABCDEFabcdef"}
                onClick={() => console.log("huy")}
            />

            <Checkbox
                label="hhohohohoh"
                onInput={console.log}
            />

            <Switch
                label="bibibi dododo yjakjdkja"
            />

            <form>
                <RadioButton
                    label="haha yes"
                    name="thing"
                    value="yes"
                />
                <RadioButton
                    label="haha no"
                    name="thing"
                    value="no"
                />
                <RadioButton
                    label="haha maybe"
                    name="thing"
                    value="maybe"
                />
            </form>

            <TextField
                label="OMg omg omg"
                type="email"
                postfix="@urfu.me"
                width="256px"
            />

            <TextField
                label="PASSWORD!!!!!"
                type="password"
                icon={visible ? Icons.Visible : Icons.Invisible}
                width={256}
                onIconClick={() => setVisible(!visible)}
            />

            <LinearProgress
                color="primary"
                progress={0.5}
                showPercentage={true} />

            <RadialProgress progress={0.75} />
        </div>

    )
}

export default TestUIKit;