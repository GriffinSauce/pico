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
              <img alt="" src={`${item.url}-/scale_crop/230x230/center/`} />
            </button>
          </figure>
        ))}
      </section>
    </>
  );
};

export default MediaGrid;
