import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {

        textColor: string;
        bgColor: string;
        accentColor: string;
        cardBgColor: string;
        // borderRadius :string;
        //
        // colors: {
        //     main: string;
        //     secondary: string;
        // }
    }
}