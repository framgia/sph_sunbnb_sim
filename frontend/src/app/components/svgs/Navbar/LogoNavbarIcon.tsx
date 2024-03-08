import React from "react";

const LogoNavbarIcon: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={83}
            height={42}
            fill="none"
        >
            <mask
                id="a"
                width={55}
                height={38}
                x={4}
                y={2}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: "luminance"
                }}
            >
                <path fill="#fff" d="M4.259 2.1h53.993v37.77H4.26V2.1Z" />
            </mask>
            <g mask="url(#a)">
                <path
                    fill="#F20"
                    d="M120.802 37.755c.58 0 1.051.476 1.051 1.063 0 .588-.47 1.064-1.051 1.064H12.88a3.744 3.744 0 0 1-2.668-1.122 3.835 3.835 0 0 1-1.108-2.7V22.625H7.23c-.731 0-1.333-.195-1.803-.516a2.633 2.633 0 0 1-1.039-1.432l-.001.001a3.151 3.151 0 0 1-.021-1.684 3.663 3.663 0 0 1 1.144-1.849L21.6 3.106c.771-.671 1.77-1.007 2.757-1.007.988 0 1.987.336 2.757 1.007l10.813 9.466a1.07 1.07 0 0 1 .108 1.496 1.04 1.04 0 0 1-1.479.108L25.744 4.71c-.37-.322-.873-.483-1.386-.483-.512 0-1.016.161-1.386.483L6.882 18.748c-.254.221-.418.495-.487.769-.049.192-.05.379-.003.536H6.39v.005a.533.533 0 0 0 .21.287c.138.094.345.151.63.151h2.924c.58 0 1.05.477 1.05 1.064v14.5c0 .465.19.89.493 1.197a1.66 1.66 0 0 0 1.182.498h107.922Z"
                />
            </g>
            <path
                fill="#F20"
                d="M22.418 23.318c1.357 0 2.622.352 3.796 1.056l-1.008 1.938c-1.14-.623-2.11-.934-2.907-.934-.605 0-.907.213-.907.64 0 .23.166.424.496.58.33.156.735.297 1.214.424s.955.286 1.428.476.875.493 1.205.908c.331.416.497.923.497 1.523 0 .935-.36 1.664-1.078 2.19-.718.524-1.653.787-2.804.787-1.63 0-3.01-.439-4.138-1.315l.94-1.904c1.083.773 2.172 1.16 3.266 1.16.673 0 1.01-.214 1.01-.64 0-.243-.163-.445-.488-.607a6.533 6.533 0 0 0-1.189-.432 12.172 12.172 0 0 1-1.402-.476 2.92 2.92 0 0 1-1.188-.891c-.325-.404-.488-.912-.488-1.523 0-.935.348-1.662 1.043-2.18.696-.52 1.596-.78 2.702-.78ZM36.063 23.457v9.328h-2.958v-1.54c-.627 1.107-1.624 1.66-2.992 1.66-1.003 0-1.804-.322-2.403-.968-.598-.646-.898-1.512-.898-2.596v-5.884h2.959v5.036c0 .554.14.99.418 1.307.28.317.653.475 1.12.475.559-.011.998-.221 1.317-.631.32-.41.479-.938.479-1.584v-4.603h2.958ZM43.654 23.318c1.015 0 1.83.326 2.446.978.615.652.923 1.52.923 2.605v5.884h-2.941V27.73c0-.542-.146-.971-.436-1.289-.291-.317-.687-.476-1.189-.476-.524 0-.954.173-1.29.52-.337.345-.534.801-.59 1.367v4.932h-2.959v-9.328h2.958v1.523c.65-1.085 1.676-1.638 3.078-1.662ZM54.12 23.353c1.3 0 2.345.441 3.137 1.324.793.883 1.189 2.045 1.189 3.487 0 1.42-.388 2.561-1.163 3.427-.775.865-1.807 1.297-3.095 1.297-1.209 0-2.149-.45-2.822-1.35v1.247h-2.958V19.944h2.958v4.742c.684-.889 1.602-1.333 2.754-1.333Zm-.719 7.165c.616 0 1.115-.228 1.496-.684.382-.456.573-1.041.573-1.756 0-.716-.19-1.298-.573-1.748-.381-.45-.88-.675-1.496-.675-.593 0-1.08.225-1.462.675-.382.45-.573 1.032-.573 1.748 0 .726.188 1.315.565 1.765.376.45.866.675 1.47.675ZM65.268 23.318c1.014 0 1.83.326 2.445.978.616.652.923 1.52.923 2.605v5.884h-2.94V27.73c0-.542-.146-.971-.437-1.289-.29-.317-.687-.476-1.188-.476-.525 0-.955.173-1.291.52-.337.345-.533.801-.59 1.367v4.932H59.23v-9.328h2.959v1.523c.65-1.085 1.675-1.638 3.078-1.662ZM75.733 23.353c1.3 0 2.345.441 3.138 1.324.792.883 1.188 2.045 1.188 3.487 0 1.42-.388 2.561-1.163 3.427-.775.865-1.807 1.297-3.095 1.297-1.208 0-2.149-.45-2.821-1.35v1.247H70.02V19.944h2.959v4.742c.684-.889 1.601-1.333 2.753-1.333Zm-.718 7.165c.615 0 1.114-.228 1.496-.684.382-.456.573-1.041.573-1.756 0-.716-.192-1.298-.573-1.748-.382-.45-.88-.675-1.496-.675-.593 0-1.08.225-1.462.675-.382.45-.573 1.032-.573 1.748 0 .726.188 1.315.564 1.765.376.45.866.675 1.47.675ZM24.875 15.22l.039 1.869H23.26l.038-1.869-1.577.954-.827-1.44 1.596-.916-1.596-.876.827-1.499 1.558.974-.02-1.85h1.655l-.02 1.85 1.578-.935.827 1.46-1.635.876 1.635.915-.827 1.48-1.597-.993Z"
            />
        </svg>
    );
};

export default LogoNavbarIcon;
