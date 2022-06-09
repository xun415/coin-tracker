import {IoMoon, IoSunny} from "react-icons/io5";
import React from "react";
import {useRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";
import styled from "styled-components";

interface ThemeButtonProp {
    isDarkMode: boolean;
}

const ThemeButton = styled.div<ThemeButtonProp>`
  height: 40px;
  width: 40px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.isDarkMode? 'white':'black'};
`;

function DarkModeButton() {
    const [isDark, setIsDark]  = useRecoilState(isDarkAtom)

    const toggleDarkMode = () => {
        setIsDark((prev) => !prev)
    }

    return (
        <>
            <ThemeButton onClick={toggleDarkMode} isDarkMode={isDark} >

                {isDark? <IoSunny color="black" /> : <IoMoon color="white" />}

            </ThemeButton>
        </>

    )
}

export default DarkModeButton;