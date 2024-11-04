import { TbGhost2Filled } from "react-icons/tb";
import { MdCatchingPokemon } from "react-icons/md";
import { GiPoisonGas } from "react-icons/gi";
import { CgShapeCircle } from "react-icons/cg";
import { GiFeatheredWing } from "react-icons/gi";
import { PiNutFill } from "react-icons/pi";
import { GiHighGrass } from "react-icons/gi";
import { LiaHandRockSolid } from "react-icons/lia";
import { MdWaterDrop } from "react-icons/md"
import { GiClayBrick } from "react-icons/gi";
import { IoIosBug } from "react-icons/io";
import { CgDarkMode } from "react-icons/cg";
import { TbMichelinStar } from "react-icons/tb";
import { FaBoltLightning } from "react-icons/fa6";
import { MdOutlineCyclone } from "react-icons/md";
import { GiSeaDragon } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { FaLeaf } from "react-icons/fa6";
import { FaSnowflake } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useGetAllPokemonQuery, useGetPokemonTypeQuery } from "../store/pokemonApi";
import PokemonCard from "./PokemonCard";
import { Pagination } from "antd";
import LoadingPage from "./LoadingPage";
import SelectModel from "../models/SelectModel";


function PokemonType() {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>("All");
    const [typeId, setTypeId] = useState<number | string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const typePage = useRef<HTMLDivElement>(null)

    const { data, isFetching, isLoading } = useGetAllPokemonQuery(
        { limit: 1302, offset: 0 },
        { skip: selectedType !== "All" }
    );
    const { data: typeData, isFetching: typeDataFetching, isLoading: typeDataLoading } = useGetPokemonTypeQuery(
        typeId,
        { skip: !selectedType || selectedType === "All" || !typeId }
    );

    useEffect(() => {
        setLoading(true);
        let pokemon;
        console.log(selectedType, typeId, "inside usestate")

        if (selectedType !== "All" && typeData) {
            pokemon = typeData?.pokemon?.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            );
            console.log("dataload")
            setPokemonList(pokemon || []);
        } else if (data && selectedType === "All") {
            pokemon = data?.results?.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            );
            setPokemonList(pokemon || []);
        }

        setLoading(false);
    }, [selectedType, typeData, data, currentPage, pageSize, typeId]);

    const getId = (url: string | undefined): number | null => {
        if (!url) return null;
        const id = url.split("/").filter(Boolean).pop();
        return id ? parseInt(id, 10) : null;
    };

    const getTypeColor = (type: string, isSelected: boolean) => {
        const colors: { [key: string]: string } = {
            All: isSelected ? "!text-[#E96303]" : "hover:text-[#E96303]",
            Fire: isSelected ? "!text-[#D96303]" : "hover:text-[#E96303]",
            Flying: isSelected ? "!text-[#658CBD]" : "hover:text-[#758CBD]",
            Water: isSelected ? "!text-[#3F77BE]" : "hover:text-[#4F77BE]",
            Poison: isSelected ? "!text-[#9C6ACA]" : "hover:text-[#AC6ACA]",
            Electric: isSelected ? "!text-[#C4BC34]" : "hover:text-[#D4BC34]",
            Ground: isSelected ? "!text-[#BE8056]" : "hover:text-[#CE8056]",
            Fairy: isSelected ? "!text-[#C8A5C6]" : "hover:text-[#D8A5C6]",
            Grass: isSelected ? "!text-[#63B861]" : "hover:text-[#73B861]",
            Bug: isSelected ? "!text-[#95C56C]" : "hover:text-[#A5C56C]",
            Normal: isSelected ? "!text-[#808080]" : "hover:text-[#909090]",
            Rock: isSelected ? "!text-[#74BEB3]" : "hover:text-[#84BEB3]",
            Ghost: isSelected ? "!text-[#4F506B]" : "hover:text-[#5F506B]",
            Dragon: isSelected ? "!text-[#1C6AC1]" : "hover:text-[#2C6AC1]",
            Ice: isSelected ? "!text-[#61BAAC]" : "hover:text-[#71BAAC]",
            Steel: isSelected ? "!text-[#5594A1]" : "hover:text-[#6594A1]",
            Psychic: isSelected ? "!text-[#DB8B85]" : "hover:text-[#EB8B85]",
            Dark: isSelected ? "!text-[#495761]" : "hover:text-[#595761]",
            Fighting: isSelected ? "!text-[#B44D61]" : "hover:text-[#C44D61]",
        };
        return colors[type] || (isSelected ? "!text-[#2F5DB3]" : "hover:text-[#3F5DB3]");
    };

    const categoryList = [
        { type: "All", typeId: "", icon: <MdCatchingPokemon size={24} className="mx-[3px]" /> },
        { type: "Normal ", typeId: "1", icon: <CgShapeCircle size={30} /> },
        { type: "Fighting", typeId: "2", icon: <LiaHandRockSolid size={28} /> },
        { type: "Flying", typeId: "3", icon: <GiFeatheredWing size={22} className="mx-[3px]" /> },
        { type: "Poison", typeId: "4", icon: <GiPoisonGas size={22} className="mx-[3px]" /> },
        { type: "Ground", typeId: "5", icon: <GiHighGrass size={20} className="mx-[3px]" /> },
        { type: "Rock", typeId: "6", icon: <GiClayBrick size={24} className="mx-[2px]" /> },
        { type: "Bug", typeId: "7", icon: <IoIosBug size={22} className="mx-[3px]" /> },
        { type: "Ghost", typeId: "8", icon: <TbGhost2Filled size={20} className="mx-[3px]" /> },
        { type: "Steel", typeId: "9", icon: <PiNutFill size={20} className="mx-[3px]" /> },
        { type: "Fire", typeId: "10", icon: <ImFire size={18} className="mx-[4px]" /> },
        { type: "Water", typeId: "11", icon: <MdWaterDrop size={20} className="mx-[3px]" /> },
        { type: "Grass", typeId: "12", icon: <FaLeaf size={18} className="mx-[3px]" /> },
        { type: "Electric", typeId: "13", icon: <FaBoltLightning size={18} className="mx-[3px]" /> },
        { type: "Psychic", typeId: "14", icon: <MdOutlineCyclone size={24} /> },
        { type: "Ice", typeId: "15", icon: <FaSnowflake size={20} className="mx-[3px]" /> },
        { type: "Dragon", typeId: "16", icon: <GiSeaDragon size={22} className="mx-[2px]" /> },
        { type: "Dark", typeId: "17", icon: <CgDarkMode size={24} className="mx-[1px]" /> },
        { type: "Fairy", typeId: "18", icon: <TbMichelinStar size={24} className="mx-[1px]" /> },
    ]

    const handleSelectType = (value: string) => {
        setSelectedType(() => value)
        const data = categoryList.filter((item) => item.type === value)
        setTypeId(() => data[0].typeId)
    }


    return (
        <div className="h-full w-full flex">
            <div className="w-[300px] md:w-[200px] lg:w-[300px] h-full sm:grid grid-cols-1 gap-6 overflow-auto p-6 hidden">
                {categoryList.map((category) => (
                    <div
                        key={category.type}
                        className={`flex items-center gap-3 p-1 text-[#c5c3c6] ${getTypeColor(category.type, selectedType === category.type)} cursor-pointer`}
                        onClick={() => {
                            setSelectedType(category.type);
                            setTypeId(category.typeId);
                        }}
                    >
                        <span>{category.icon}</span>
                        <span className="font-semibold">{category.type}</span>
                    </div>
                ))}
            </div>
            {isFetching || isLoading || typeDataFetching || typeDataLoading || loading ? (
                <div className="size-full overflow-auto"><LoadingPage /></div>
            ) : (
                <div ref={typePage} className="size-full overflow-auto">
                    <div className={`p-7 flex items-center gap-4 ${getTypeColor(selectedType, true)}`}>
                        <MdCatchingPokemon size={26} />
                        <span className="text-xl font-bold">{selectedType != "All" ? typeData?.pokemon?.length : data?.results?.length}</span>
                    </div>
                    <div className="flex justify-center mb-8 sm:hidden">
                        <SelectModel width="w-1/2" options={categoryList?.map((category: any) => {
                            return {
                                value: category.type, label: <div
                                    key={category.type}
                                    className={`flex items-center gap-3 p-1 text-[#c5c3c6] ${getTypeColor(category.type, selectedType === category.type)}`}
                                >
                                    <span>{category.icon}</span>
                                    <span className="font-semibold">{category.type}</span>
                                </div>
                            }
                        })} placeHolder="Select Your Pokemon..." handleChangeValue={handleSelectType} value={selectedType} />
                    </div>
                    <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  justify-items-center  gap-8 px-6">
                        {pokemonList.map((item) => (
                            <PokemonCard key={getId(item.url || item.pokemon?.url)} id={getId(item.url || item.pokemon?.url)} />
                        ))}
                    </div>
                    <Pagination
                        pageSize={pageSize}
                        current={currentPage}
                        total={selectedType != "All" ? typeData?.pokemon?.length : data?.results?.length}
                        className="justify-center my-8 w-full"
                        pageSizeOptions={[9, 18, 27, 36, 40]}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                            typePage.current?.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default PokemonType;
