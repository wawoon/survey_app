export const FormTitle: React.FC = (props) => {
  return (
    <div style={{ padding: "12px 0", fontSize: 20, fontWeight: "bold" }}>
      {props.children}
    </div>
  );
};
