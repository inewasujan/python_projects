import { getTestimonials } from "@/actions/testimonial";
import Link from "next/link";

export default async function ListTestimonial() {

    const data = await getTestimonials();

    


    return(
        <div>
            <div className="flex flex-col w-full  p-3">
                {
                    data?.map((item: any) => (
                        <div key={item.id} className="flex flex-col border border-gray-300 p-3 rounded-xl mb-5">
                            <div className="pb-5">
                                <img src={item.image_url as string} alt={item.title} className="max-w-12"/>
                            </div>
                            <div>
                                <div>
                                    <p className="italic text-xs mb-1">Full name:</p>
                                    <p>{item.full_name}</p>
                                </div>
                                <div>
                                    <p className="italic text-xs mb-1">Designation:</p>
                                    <p>{item.title}</p>
                                </div>
                                <div className="pt-5">
                                    <p className="italic text-xs mb-1">Testimony: </p>
                                    <p>{item.testimony}</p>
                                </div>
                                <div className="pt-5">
                                    <Link href={
                                        {
                                            pathname: `/testimonial/edit`,
                                            query: { id: item.id }
                                        }
                                    }
                                        className="italic hover:text-blue-700 hover: underline"
                                    >
                                    Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}