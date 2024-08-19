interface InputLabelProps {
  icon: React.ReactNode;
  text: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  icon,
  text,
}: InputLabelProps) => (
  <div className="flex flex-row gap-2 items-center">
    {icon}
    <p className="text-neutral-500 text-lg">{text}</p>
  </div>
);

export default InputLabel;
