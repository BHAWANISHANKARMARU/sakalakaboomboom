type Props = {
  accept: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  label: string;
};
export function FileUploader({ accept, multiple, onChange, label }: Props) {
  return (
    <label className="border-line bg-paper text-navy hover:border-blue grid min-h-36 cursor-pointer place-items-center rounded-md border-2 border-dashed p-6 text-center font-bold">
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
