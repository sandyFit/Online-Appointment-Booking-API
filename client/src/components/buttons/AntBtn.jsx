import React from 'react';
import { Button, ConfigProvider } from "antd";
import "antd/dist/reset.css";

const AntBtn = ({text}) => {
    return (
        <ConfigProvider
        theme={{
            token: {
            colorPrimary: "#6366f1"
            },
            components: {
            // How to change primary type button text color
            // at theme level?
            Button: {
                colorTextLightSolid: "#fff"
            }
            }
        }}
        >
            <Button type="primary">{text}</Button>
    </ConfigProvider>
    )
}

export default AntBtn