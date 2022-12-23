import { TextBlock } from '@/components/TextBlock';

type Props = {
  title: string;
  text: string;
};

export function LogItem({ title, text }: Props) {
  return (
    <section className="flex flex-col gap-y-1">
      <h3 className="flex text-sm">{title}:</h3>
      <TextBlock text={text} />
    </section>
  );
}
