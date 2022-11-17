interface ConditionalWrapperProps {
  condition: unknown;
  children: React.ReactElement;
  wrapper: (children: React.ReactElement) => JSX.Element;
}

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
