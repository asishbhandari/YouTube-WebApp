import { useEffect, useState } from "react";
import VideoCard from "../Components/VideoCard/VideoCard";
import { useParams } from "react-router-dom";
import { fetchSearchResult } from "../utils/Api/fetchSearchResult";

const SearchResultPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { searchTerm } = useParams();

  // runs every time the search term changes to fetch the searched team related videos
  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetchSearchResult(searchTerm);
        setSearchResult(response);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [searchTerm]);

  return (
    <div className="grow h-full w-[calc(100%-240px)] overflow-y-auto bg-white">
      <div className="grid grid-cols-1 gap-2 p-5">
        {searchResult.map((video, k) => (
          <VideoCard
            key={k}
            video={video?.video}
            views={video?.video?.stats?.views}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
