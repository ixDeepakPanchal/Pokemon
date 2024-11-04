import battleLogo from "../assets/battle-Logo.png"
import redBall from "../assets/pokeball-red.png"
import blueBall from "../assets/pokeball-blue.png"
import { motion as m } from "framer-motion"
import { useEffect, useState } from "react"
import SelectModel from "../models/SelectModel"
import { useGetAllPokemonQuery, useGetPokemonByIdQuery } from "../store/pokemonApi"
import LoadingPage from "./LoadingPage"
import PokemonCard from "./PokemonCard"

type Stat = {
    base_stat: number;
    stat: { name: string; url: string };
};

function BattlePage() {
    const [selectRedPokemon, setSelectRedPokemon] = useState<string>()
    const [selectBluePokemon, setSelectBluePokemon] = useState<string>()
    const [battleResult, setBattleResult] = useState<string>()

    const { isFetching, isLoading, data } = useGetAllPokemonQuery({ limit: 1302, offset: 0 })
    const { isFetching: redDataFetch, isLoading: redDataLoad, data: redData } = useGetPokemonByIdQuery(selectRedPokemon, { skip: !selectRedPokemon })
    const { isFetching: blueDataFetch, isLoading: blueDataLoad, data: blueData } = useGetPokemonByIdQuery(selectBluePokemon, { skip: !selectBluePokemon })

    const getResult = (pokemonRed: Stat[], pokemonBlue: Stat[]): string => {
        let redScore = 0;
        let blueScore = 0;

        for (let i = 0; i < pokemonRed.length; i++) {
            const redStat = pokemonRed[i].base_stat;
            const blueStat = pokemonBlue[i].base_stat;

            if (redStat > blueStat) {
                redScore++;
            } else if (blueStat > redStat) {
                blueScore++;
            }
        }


        if (redScore > blueScore) {
            return "Pokémon Red wins!";
        } else if (blueScore > redScore) {
            return "Pokémon Blue wins!";
        } else {
            return "It's a tie!";
        }
    };

    useEffect(() => {
        setBattleResult("")
    }, [selectBluePokemon, selectRedPokemon])


    const handleBluePokemonChange = (value: string) => {
        setSelectBluePokemon(() => value)

    }
    const handleRedPokemonChange = (value: string) => {
        setSelectRedPokemon(() => value)

    }

    return (isFetching || isLoading || redDataFetch || redDataLoad || blueDataFetch || blueDataLoad) ? <LoadingPage /> :
        <div className="h-full min-h-[520px]  grid grid-cols-1 xl:grid-cols-2 relative  overflow-auto">
            <div className="bg-red-500 relative h-full overflow-hidden ">
                <div className="absolute w-full py-10 flex justify-center"> <SelectModel width="sm:w-1/2 w-full" options={data?.results?.map((item: any) => { return { value: item.name, label: item.name } })} placeHolder="Select Your Pokemon..." handleChangeValue={handleRedPokemonChange} value={selectRedPokemon} /></div>
                <m.div
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4, duration: 1 }}
                    className="absolute size-full   flex justify-center items-center overflow-hidden">
                    <img src={redBall} alt="" className=" relative size-[68%] mt-16"/>
                </m.div>
                {selectRedPokemon && <m.div
                  initial={{ y: "-100vh" }}
                    animate={{ y:0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4, duration: 1 }} className="absolute size-full flex justify-center items-center z-20  pt-24 ">
                    <PokemonCard id={selectRedPokemon} />
                </m.div>}

            </div>
            <div className="bg-blue-500 relative h-full overflow-hidden">
                <div className="absolute  w-full py-10 flex justify-center">
                    <SelectModel width="sm:w-1/2 w-full" options={data?.results?.map((item: any) => { return { value: item.name, label: item.name } })} placeHolder="Select Your Pokemon..." handleChangeValue={handleBluePokemonChange} value={selectBluePokemon} /></div>
                <m.div
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4, duration: 1 }}
                    className="absolute size-full flex justify-center items-center  ">
                    <img src={blueBall} alt="" className=" relative size-[75%]"/>
                </m.div>
                {selectBluePokemon && <m.div
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4, duration: 1 }} className="absolute size-full flex justify-center items-center z-20 backdrop-[4px] pt-40">
                    <PokemonCard id={selectBluePokemon} />
                </m.div>}
            </div>
            <div className="absolute size-full flex flex-col  justify-center items-center gap-6">
                <m.img
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1.5, rotate: 360 }}
                    transition={{
                        duration: 2.5,
                        type: "spring",

                        delay: 1.2,
                    }}
                    onAnimationComplete={(animation: any) => {

                        if (animation.scale === 2) {
                            animation.scale = 1.5;
                        }
                    }}
                    src={battleLogo} className="size-56" alt="" />
                {(selectBluePokemon && selectRedPokemon) &&
                    <m.button
                        initial={{ opacity: 0, y: "100vh" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.2,
                        }}
                        onClick={() => setBattleResult(() => getResult(redData.stats, blueData.stats))}
                        className="p-2 border rounded-lg bg-yellow-700 font-bold text-white z-30">Start Battle</m.button>}
            </div>
            {battleResult && <div className="absolute inset-x-0 text-center bottom-10  text-2xl font-bold text-gray-900 z-30">{battleResult}</div>}

        </div>

}

export default BattlePage
