import { AspectRatio } from "../ui/aspect-ratio";

export default function WatchList() {
  return (
    <>
      <div className="pl-11 pt-6">
        <h1 className="pb-4 text-2xl">Watch list</h1>

        <div className="grid grid-cols-3 gap-8 py-6">
          <div className="w-[450px] bg-orange-300">
            <AspectRatio ratio={16 / 9}>
              <img src="" alt="" />
            </AspectRatio>
          </div>

          <div className="w-[450px] bg-orange-300">
            <AspectRatio ratio={16 / 9}>
              <img src="" alt="" />
            </AspectRatio>
          </div>

          <div className="w-[450px] bg-orange-300">
            <AspectRatio ratio={16 / 9}>
              <img src="" alt="" />
            </AspectRatio>
          </div>

          <div className="w-[450px] bg-orange-300">
            <AspectRatio ratio={16 / 9}>
              <img src="" alt="" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </>
  );
}
