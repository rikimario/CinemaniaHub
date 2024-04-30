import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TvInfoPoster from "./TvInfoPoster";
import TvInfoSection from "./TvInfoSection";
import TvInfoButtons from "./TvInfoButtons";
export default function TvInfo() {
  const { user } = useContext(AuthContext);
  const [series, setSeries] = useState({});
  const { id: seriesId } = useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TV_DATABASE_URL}/${seriesId}?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not Found!");
        }
        return res.json();
      })
      .then(setSeries);
  }, [seriesId]);
  return (
    <div className="px-44 pb-10">
      <div className="flex rounded-lg bg-neutral-900 p-2">
        <TvInfoPoster user={user} series={series} />
        <TvInfoSection series={series} />
        {user && <TvInfoButtons user={user} series={series} />}
      </div>
    </div>
  );
}
