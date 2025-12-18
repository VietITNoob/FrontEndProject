type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
      <h2>{title}</h2>
    </header>
  );
}
