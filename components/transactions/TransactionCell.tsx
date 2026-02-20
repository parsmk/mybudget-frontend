export const TransactionCell = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return <td className={`p-2`}>{children}</td>;
};
