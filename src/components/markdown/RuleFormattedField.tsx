interface FormattedFieldProps {
  value: any;
}

export const FormattedField: React.FC<FormattedFieldProps> = ({ value }) => {

  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">-</span>;
  }

  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, index) => (
          <li key={index}>
            <FormattedField value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (value instanceof Date) {
    return <time dateTime={value.toISOString()}>
      {value.toLocaleDateString()}
    </time>;
  }

  if (typeof value === "boolean") {
    return value ? <>True</> : <>False</>;
  }

  return <>{value}</>;
};
