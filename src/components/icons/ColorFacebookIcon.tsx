import * as React from "react";

const SvgColorFacebookIcon = ({
    color = "currentColor",
    width = "20px",
    height = "20px",
}: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            color={color}
            width={width}
            height={height}
            
           
        >
            <defs>
                <path id="a" d="M.001 0H24v23.854H.001z"></path>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a"></use>
                </mask>
                <path
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12"
                    fill="#1877F2"
                    mask="url(#b)"
                ></path>
                <path
                    d="M16.671 15.469L17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0V15.47h2.796"
                    fill="#FFF"
                ></path>
            </g>
        </svg>
    );
};

export default SvgColorFacebookIcon;
