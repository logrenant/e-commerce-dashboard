import { Link } from 'react-router-dom';
import LeftBarLink from './LeftBarLink';

const LeftBar: React.FC = () => {
    return (
        <div className="flex flex-col justify-between bg-zinc-900 text-white text-2xl font-light py-8 w-fit min-h-screen">
            <div className="flex flex-col gap-20">
                <Link to="/" className="px-8">
                    Naughty Dashboard
                </Link>
                <div className="flex flex-col gap-2 pl-8">
                    <LeftBarLink to="/" label="Dashboard" />
                    <LeftBarLink to="/add-product" label="Add Product" />
                    <LeftBarLink to="/product-list" label="Product List" />
                    <LeftBarLink to="/orders" label="Orders" />
                </div>
            </div>
            <div className="mx-8">
                <button className="px-6 py-2 text-md font-medium bg-zinc-950 text-white w-full transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                    logout
                </button>
            </div>
        </div>
    );
};

export default LeftBar;
