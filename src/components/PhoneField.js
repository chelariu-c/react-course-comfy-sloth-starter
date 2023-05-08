import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";

const PhoneField = (props) => {
    const { label, onChange, ...restProps } = props;
    const [phone, setPhone] = useState("");

    const handleChange = (newPhone) => {
        setPhone(newPhone);
    };
    return (
        <Box>
            <MuiTelInput
                label={label}
                value={phone}
                onChange={handleChange}
                defaultCountry="ro"
                type="tel" // Set type to "tel"
                {...restProps}
            />
        </Box>
    );
};

export default PhoneField;
