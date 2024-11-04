import { Link, useNavigate } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import logo from "../assets/logo.png"
import { Dropdown, MenuProps } from "antd";

function Navbar() {
    const navigate = useNavigate()


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to={"/"} >Home</Link>,
            extra: '⌘H',
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Link to={"/pokemons"}>Pokédex</Link>,
            extra: '⌘P',
        },
        {
            key: '3',
            label: <Link to={"/category"}>Category</Link>,
            extra: '⌘C',
        },
        {
            key: '4',
            label: <Link to={"/battle"}>Battle</Link>,
            extra: '⌘B',
        },
        {
            key: '5',
            label: <Link to={"/about"}>About</Link>,
            extra: '⌘A',
        },
    ];
    return (
        <div className="min-h-[70px] bg-gray-700 text-white  shadow-lg flex sm:px-16 sm:gap-16 px-5 gap-5">
            <div className="flex items-center"><img src={logo} className="h-[44px] w-full object-cover cursor-pointer" alt="" onClick={() => navigate("/")} /></div>
            <span className="flex items-center text-3xl">|</span>
            <div className="hidden lg:flex gap-8 text-white font-semibold items-center">
                <Link to={"/"} >Home</Link>
                <Link to={"/pokemons"}>Pokédex</Link>
                <Link to={"/category"}>Category</Link>
                <Link to={"/battle"}>Battle</Link>
                <Link to={"/about"}>About</Link>
            </div>
            <div className="lg:hidden flex justify-end items-center grow ">
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <IoMenu color="white" size={30} />
                    </a>
                </Dropdown>

            </div>
        </div>
    )
}

export default Navbar