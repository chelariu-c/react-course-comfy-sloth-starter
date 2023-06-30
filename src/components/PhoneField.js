import React from "react";
import Box from "@mui/material/Box";
import { MuiTelInput } from "mui-tel-input";

const PhoneField = (props) => {
    const { label, value, onChange, ...restProps } = props;

    const handleChange = (newValue) => {
        onChange(newValue);
    };
    return (
        <Box>
            <MuiTelInput
                label={label}
                value={value}
                onChange={handleChange}
                defaultCountry="ro"
                type="tel"
                {...restProps}
            />
        </Box>
    );
};

export default PhoneField;
