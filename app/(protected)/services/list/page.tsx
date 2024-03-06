import { getServices } from "@/actions/services";
import Link from "next/link";

export default async function ListServices() {
  const data = await getServices();

  return (
    <div>
      <div className="flex flex-col w-full  p-3">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-300 p-3 rounded-xl mb-5"
          >
            <div className="pb-5">
              <img src={item.image_url} alt={item.title} className="max-w-12" />
            </div>
            <div>
              <div>
                <p className="italic text-xs mb-1">Title:</p>
                <p>{item.title}</p>
              </div>
              <div className="pt-5">
                <p className="italic text-xs mb-1">Description: </p>
                <p>{item.description}</p>
              </div>
              <div className="pt-5">
                <Link
                  href={{
                    pathname: `/services/edit`,
                    query: { id: item.id },
                  }}
                  className="italic hover:text-blue-700 hover: underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
