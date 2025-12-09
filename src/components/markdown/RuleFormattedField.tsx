interface FormattedFieldProps {
  fKey: string;
  value: any;
  short?: boolean;
}

export const FormattedField: React.FC<FormattedFieldProps> = ({ fKey, value, short }) => {

  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">-</span>;
  }

  if (fKey === 'edit_list') {
    if (value === "TODO") {
      return <span className="text-muted-foreground">TODO</span>;
    }
    const display = short ? 'Link' : value
    return <a href={value} target="_blank" rel="noopener noreferrer">{display}</a>;
  }

  if (fKey === 'relevant_tag_id') {
    return <a href={`https://vocadb.net/T/${value}`} target="_blank" rel="noopener noreferrer">{value}</a>;
  }

  if (fKey === 'entry_status') {
    return <span className={`entry-status-badge entry-status-${value.toLowerCase()}`}>{value}</span>;
  }

  if (Array.isArray(value)) {
    return <>{value.join(", ")}</>;
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
