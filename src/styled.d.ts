import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        fontColor: string;
        bgColor: string;
        accentColor: string;
        authBgColor: string;
        borderColor: string;
    }
}