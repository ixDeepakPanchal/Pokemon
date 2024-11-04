import { useParams } from "react-router-dom"
import PokemonCard from "./PokemonCard"
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { useGetPokemonByIdQuery, useGetPokemonEvolutionQuery, useGetPokemonSpeciesQuery } from "../store/pokemonApi"
import LoadingPage from "./LoadingPage"
import { Progress } from "antd";
import { Fragment, useEffect, useState } from "react";


function PokemonDetailPage() {
    const { id } = useParams();
    const [evolutionChainList, setEvolutionChainList] = useState<(number | null)[]>([]);
    const [evolutionId, setEvolutionId] = useState<number>()
    const [evolveBabyId, setEvolveBabyId] = useState<number>()


    const { isLoading: pokemonDataLoad, isFetching: pokemonDataFetch, data: pokemonData } = useGetPokemonByIdQuery(id);

    const { isLoading: speciesDataLoad, isFetching: speciesDataFetch, data: speciesData } = useGetPokemonSpeciesQuery(id);
    const { isLoading: evolutionDataLoad, isFetching: evolutionDataFetch, data: evolutionData } = useGetPokemonEvolutionQuery(evolutionId, {
        skip: !evolutionId
    })

    useEffect(() => {
        if (speciesData?.evolution_chain?.url) {
            const evolutionChainId = getId(speciesData.evolution_chain.url);
            console.log(evolutionChainId, 'evo'

            )
            if (evolutionChainId) setEvolutionId(evolutionChainId);
        }
    }, [speciesData]);

    const getId = (url: string): any => {
        const id = url.split("/").filter(Boolean).pop();
        return id ? parseInt(id, 10) : null
    };

    const evolutionChain = (evolution: any) => {
        if
            (!evolution) {
            return
        }
        if (evolution.length) {
            setEvolutionChainList((pre) => [...pre, getId(evolution[0].species.url)])
            evolutionChain(evolution[0].evolves_to)
            return
        }
        else { return }
    }


    useEffect(() => {
        if (!!evolutionData) {
            setEvolveBabyId(() => getId(evolutionData?.chain?.species?.url))
            setEvolutionChainList(() => [])
            evolutionChain(evolutionData?.chain?.evolves_to)
        }
    }, [id, evolutionData])


    return (
        (pokemonDataLoad || speciesDataFetch || speciesDataLoad || evolutionDataFetch || evolutionDataLoad || pokemonDataFetch) ? <LoadingPage /> :
            <div className="p-8 grid grid-cols-1 gap-6 h-full overflow-auto">
                <div className="grid lg:grid-cols-2 gap-6">
                    <PokemonCard id={id ? id : ""} width="w-[full] h-full"></PokemonCard>
                    <div className=" rounded-lg flex flex-col gap-3 text-gray-700">
                        <div className="p-3 px-6 text-lg font-bold bg-gray-50 rounded-lg border shadow-md">
                            {speciesData?.flavor_text_entries[Math.round(Math.random() * speciesData.flavor_text_entries.length - 1)]?.flavor_text}
                        </div>
                        <div className=""></div>
                        <div className="grow border rounded-lg grid sm:grid-cols-2 gap-6 bg-gray-50  p-6 px-16 text-lg shadow-md">
                            <div className="size-full grid grid-cols-1 gap-3">
                                <div>
                                    <p className="font-bold">Height</p>
                                    <p>{pokemonData?.height / 10} Meter</p>
                                </div>
                                <div>
                                    <p className="font-bold">Weight</p>
                                    <p>{Math.round(pokemonData?.weight / 10)} Kg.</p>
                                </div>
                                <div><p className="font-bold">Experience</p>
                                    <p>{pokemonData?.base_experience} Battle</p>
                                </div>

                            </div>
                            <div className="size-full grid grid-cols-1  gap-3">
                                <div>
                                    <p className="font-bold">Capture Rate</p>
                                    <p>{speciesData?.capture_rate}  </p>
                                </div>
                                <div>
                                    <p className="font-bold">Ability</p>
                                    <p className="flex gap-2">{pokemonData?.abilities.map((item: any) => <span key={`${id}-${item.ability.name}`} className="bg-blue-400  px-1 rounded-md">{item.ability.name}</span>
                                    )} </p>
                                </div>
                                <div><p className="font-bold">Hebitat</p>
                                    <p>{speciesData?.habitat?.name} </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-md p-6 border">
                    <div className="text-2xl text-gray-800 font-bold ">State Overview</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 py-6">{pokemonData?.stats?.map((item: any, index: number) => <div key={`state-${index}`} className="grid grid-cols-1 justify-items-center gap-2"> <Progress
                        type="dashboard"
                        percent={item.base_stat}
                        trailColor="rgba(0,0,0,0.06)"
                        steps={50}
                        strokeWidth={20}
                    />
                        <div className="text-sm font-bold text-gray-700 ">{item.stat.name.toUpperCase()}</div></div>)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-md p-6 grid grid-cols-1 gap-6 border">
                    <div className="text-2xl text-gray-800 font-bold ">Evolution To</div>
                    <div className="flex flex-wrap justify-around  items-center">
                        {evolveBabyId && <PokemonCard id={evolveBabyId} width="w-[full]"></PokemonCard>}
                        {evolutionChainList?.map((chainId: any, index: number
                        ) => <Fragment key={`${index}`} >
                                <span><BsFillArrowRightCircleFill size={40} className="text-blue-500" /></span>
                                <PokemonCard key={`evolution-${index}`} id={chainId} width={`w-[full] border-2 ${(id != chainId) && (id && id < chainId) && "border-blue-400"}`}></PokemonCard>

                            </Fragment>)}
                    </div>
                </div>

            </div >
    )
}

export default PokemonDetailPage





