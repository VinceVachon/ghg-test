const colors = {
    white: "#ffffff",
    blueLight: "#428bca",
    blue: "#2B62AE",
    text: "#2E2D30",
    bluePale: "#fafaff",
}

export const ghgSatDefault = {
    control: (provided, state) => {
        // console.log('control', provided, state)
        return ({
            ...provided,
            boxShadow: 'none',
            borderColor: (state.menuIsOpen || state.isFocused) ? colors.blueLight : colors.blue,
            backgroundColor: colors.bluePale,
            '&:hover': {
                borderColor: colors.blue
            }
        })
    },
    option: (provided, state) => {
        return ({
            ...provided,
            borderBottom: `1px solid ${colors.blueLight}`,
            color: (state.isSelected || state.isFocused) ?
                colors.white :
                colors.text,
            backgroundColor:
                (state.isFocused && state.isSelected) ?
                    colors.blueLight :
                    state.isFocused ?
                        colors.blueLight :
                        state.isSelected ?
                            colors.blueLight :
                            colors.bluePale,
            fontSize: '14px',
            transition: 'all 100ms',
            fontFamily: "Roboto",
            '&:hover': {
                color: colors.white,
            },
            '&:active': {
                color: colors.white,
                backgroundColor: colors.blueLight,
            },
            '&:last-child': {
                borderBottom: 'none'
            }
        })
    },
    menu: (provided, state) => {
        // console.log('menu', provided, state)
        return ({
            ...provided,
            marginTop: 0,
            marginBottom: 0,
            border: "1px solid",
            borderColor: colors.blueLight,
        })
    },
};
