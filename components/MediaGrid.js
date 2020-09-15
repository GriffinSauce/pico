const MediaGrid = ({ media, onClickItem }) => {
  return (
    <>
      <section className="grid grid-cols-3 gap-3 mt-6">
        {media.map((item, index) => (
          <figure
            className="block overflow-hidden rounded-md media-item bg-violet-800"
            key={item.url}
          >
            <button
              type="button"
              className="block"
              onClick={() => {
                onClickItem(index);
              }}
            >
              <img
                alt=""
                loading="lazy"
                src={`https://atmsfyzccp.cloudimg.io/v7/${encodeURIComponent(
                  item.url,
                )}?ci_url_encoded=1&width=230&height=230&grey=1`}
              />
            </button>
          </figure>
        ))}
      </section>
    </>
  );
};

export default MediaGrid;
