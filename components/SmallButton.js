export default props => (
  <>
    <button {...props} />
    <style jsx>{`
      button {
        font-size: 16px;
        font-weight: 500;
        padding: 6px 12px;
        width: initial;
        color: #d900fc;
        background-color: transparent;
        border: 1px solid #d900fc;
        border-radius: 100px;
      }
      button[disabled] {
        border: 1px solid #ddd;
        color: #ddd;
      }
    `}</style>
  </>
);
