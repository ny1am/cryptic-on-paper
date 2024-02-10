import React from 'react';

interface ConditionalWrapperProps {
  condition: boolean;
  children: React.ReactElement;
  wrapper: (children: React.ReactElement) => React.JSX.Element;
}

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
