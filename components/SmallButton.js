export default props => (
  <>
    <button {...props} />
    <style jsx>{`
      button {
        font-size: 16px;
        font-weight: 500;
        padding: 6px 12px;
        width: initial;
        border: 1px solid #d900fc;
        background-color: transparent;
        color: #d900fc;
      }
      button[disabled] {
        border: 1px solid #ddd;
        color: #ddd;
      }
    `}</style>
  </>
);
