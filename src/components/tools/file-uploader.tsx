type Props = {
  accept: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  label: string;
  hint?: string;
};
export function FileUploader({
  accept,
  multiple,
  onChange,
  label,
  hint = "Choose files from your device",
}: Props) {
  return (
    <label className="file-uploader">
      <span>
        {label}
        <small className="text-muted mt-1 block font-normal">{hint}</small>
      </span>
      <input
        className="sr-only"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => onChange(Array.from(event.target.files ?? []))}
      />
    </label>
  );
}
