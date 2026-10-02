type Props = {
  accept: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  label: string;
};
export function FileUploader({ accept, multiple, onChange, label }: Props) {
  return (
    <label className="file-uploader">
      <span>
        {label}
        <small className="text-muted mt-1 block font-normal">
          Choose files from your device
        </small>
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
