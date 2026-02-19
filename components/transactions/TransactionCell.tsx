export const TransactionCell = ({
  isHeader = false,
  children,
}: {
  isHeader?: boolean;
  children?: React.ReactNode;
}) => {
  const classes = `p-2`;
  return isHeader ? (
    <th className={classes}>{children}</th>
  ) : (
    <td className={classes}>{children}</td>
  );
};
