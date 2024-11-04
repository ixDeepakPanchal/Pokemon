import { useState } from "react";
import { useGetAllPokemonQuery } from "../store/pokemonApi"
import PokemonCard from "./PokemonCard"
import { Pagination } from "antd";
import LoadingPage from "./LoadingPage";

function PokemonList() {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(16)
    const { isLoading, isFetching, data } = useGetAllPokemonQuery({ limit: pageSize, offset: (currentPage - 1) * pageSize })

    const getId = (item: any) => {
        const id = item.url.split("/").filter(Boolean).pop()
        return id
    }
    return (
        isLoading || isFetching ? <LoadingPage /> : <div className="h-full overflow-auto" >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 p-8 gap-8 justify-items-center">
                {
                    data?.results?.map((item: any) => <PokemonCard key={getId(item)} id={getId(item)} ></PokemonCard>)
                }
            </div>
            <Pagination pageSize={pageSize} current={currentPage} total={data.count} className="justify-center my-8 w-full" pageSizeOptions={[8, 16, 20, 32, 40]} onChange={(page: number, pageSize: number) => {
                setCurrentPage(() => page)
                setPageSize(() => pageSize)
            }} />
        </div>
    )
}

export default PokemonList