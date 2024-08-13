"use client"
import qs from "query-string"
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data:(Size | Color)[];
    name: string;
    valueKey: string 
}

const Filter: React.FC<FilterProps> = ({data, name, valueKey}) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    
    const selectedValue = searchParams.get(valueKey)

    //Este código se utiliza para gestionar los parámetros de búsqueda en la URL. Cuando se hace clic en un elemento, actualiza el valor del parámetro de búsqueda correspondiente en la URL. Si el parámetro ya tiene el valor del id clicado, lo elimina (lo establece en null), de lo contrario, lo actualiza con el nuevo id. Luego, utiliza el enrutador de Next.js para navegar a la nueva URL.
    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id  
        }

        if(current[valueKey] === id){
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true})

        router.push(url)
    }

    return (  
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4"/>
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                selectedValue === filter.id && "bg-black text-white"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name} 
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Filter;