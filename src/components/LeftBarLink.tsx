import { NavLink } from 'react-router-dom';

interface LeftBarLinkProps {
    to: string;
    label: string;
}

const LeftBarLink: React.FC<LeftBarLinkProps> = ({ to, label }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                `hover:bg-zinc-950 hover:px-4 py-4 rounded-tl-xl rounded-bl-xl transition-all duration-200 ease-in ${isActive ? 'bg-zinc-950 px-4' : ''
                }`
            }
            to={to}
        >
            {label}
        </NavLink>
    );
};

export default LeftBarLink;
