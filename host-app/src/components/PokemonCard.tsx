
import { Avatar, Card } from "antd";
import { motion as m } from "framer-motion"
import { useGetPokemonByIdQuery } from "../store/pokemonApi";
import { useNavigate } from "react-router-dom";

interface prop {
    id: any;
    width?: string;
}
function PokemonCard({ id, width }: prop) {
    const navigate = useNavigate()
    const { isLoading: pokemonDataLoad, isFetching: pokemonDataFetch, data: pokemonData } = useGetPokemonByIdQuery(id, { skip: !id });

    const getTypeColor = (type: string) => {
        switch (type) {
            case "fire":
                return "bg-[#E96303]"; // Burnt Orange-Red
            case "flying":
                return "bg-[#758CBD]"; // Sky Blue
            case "water":
                return "bg-[#4F77BE]"; // Blue
            case "poison":
                return "bg-[#AC6ACA]"; // Purple
            case "electric":
                return "bg-[#D4BC34]"; // Yellow
            case "ground":
                return "bg-[#CE8056]"; // Earthy Brown
            case "fairy":
                return "bg-[#D8A5C6]"; // Soft Pink
            case "grass":
                return "bg-[#73B861]"; // Green
            case "bug":
                return "bg-[#A5C56C]"; // Lime Green
            case "normal":
                return "bg-[#909090]"; // Neutral Gray
            case "rock":
                return "bg-[#84BEB3]"; // Brownish Yellow
            case "ghost":
                return "bg-[#5F506B]"; // Dark Purple
            case "dragon":
                return "bg-[#2C6AC1]"; // Indigo
            case "ice":
                return "bg-[#71BAAC]"; // Teal Blue
            case "steel":
                return "bg-[#6594A1]"; // Metallic Gray
            case "psychic":
                return "bg-[#EB8B85]"; // Muted Pink
            case "dark":
                return "bg-[#595761]"; // Dark Gray
            case "fighting":
                return "bg-[#C44D61]"; // Red-Brown
            default:
                return "bg-[#3F5DB3]"; // Default Gray
        }
    };

    const getCapitalizedName = (name: string) => {
        if (!name) {
            return ""
        }
        const captilizedName = name[0].toUpperCase() + name.slice(1, pokemonData?.species?.name.length)
        return captilizedName
    }


    return (
        <Card
            loading={pokemonDataLoad || pokemonDataFetch}
            className={`${width ? width : "w-[300px]"} h-[400px]   justify-center shadow-md ${!(pokemonDataLoad || pokemonDataFetch) && ""} hover:filter hover:drop-shadow-[0_0px_10px_rgba(0,0,0,.25)] cursor-pointer`}
            onClick={() => navigate(`/pokemons/${id}`)}
        >   <div className="text-center mb-8">
                <div className="text-xl font-bold text-gray-700">{getCapitalizedName(pokemonData?.species?.name)}</div>
            </div>
            <Card.Meta
                avatar={<Avatar
                    shape="circle"
                    size={200}
                    className={`bg-white border relative overflow-visible ${getTypeColor(pokemonData?.types[0]?.type?.name)} bg-opacity-30`}
                    icon={
                        <m.img
                            // whileTap={{ scale: 10 }}
                            animate={
                                { opacity: 1, y: [-25, 25] }
                            }
                            transition={
                                { duration: .8, repeat: Infinity }
                            }

                            src={pokemonData?.sprites.other?.dream_world?.front_default
                            }
                            alt={getCapitalizedName(pokemonData?.species?.name || "")}
                            className="!absolute !size-[85%] !object-fill  mx-auto filter    transition-all duration-300 !z-[999]"
                            style={{
                                filter: `drop-shadow(0 0px 6px #000)`,

                            }}
                            loading="lazy"
                        />
                    }

                />}
                description={
                    <div className={`w-100  flex  ${pokemonData?.types?.length == 1 ? "justify-center" : "justify-between"} mt-8`}>
                        {pokemonData?.types?.map((item: any, index: number) => {
                            return (
                                <div
                                    key={`card-${index}`}
                                    className={`shadow-sm text-center text-xl text-white font-extrabold px-3 py-2 rounded-md  ${pokemonData.types.length == 1 ? "w-[45%]" : "w-[45%]"} ${getTypeColor(item.type.name)}`}
                                >
                                    <p className="">{getCapitalizedName(item?.type?.name)}</p>
                                </div>
                            );
                        })}
                    </div>}
            />
        </ Card>
    )
}

export default PokemonCard