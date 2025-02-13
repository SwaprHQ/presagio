import { PropsWithChildren } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

interface MarkdownRendererProps extends PropsWithChildren {
  className?: string;
}

interface MarkdownStyles {
  heading: {
    h1: string;
    h2: string;
    h3: string;
  };
  paragraph: string;
  list: string;
  listItem: string;
  a: string;
}

const markdownStyles: MarkdownStyles = {
  heading: {
    h1: 'text-4xl font-bold my-4',
    h2: 'text-3xl font-bold my-3',
    h3: 'text-2xl font-bold my-2',
  },
  paragraph: 'my-2',
  list: 'list-disc list-inside my-2',
  listItem: 'ml-4',
  a: 'text-surface-primary-main hover:underline font-medium',
};

const components: Components = {
  h1: ({ children }) => <h1 className={markdownStyles.heading.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={markdownStyles.heading.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={markdownStyles.heading.h3}>{children}</h3>,
  p: ({ children }) => <p className={markdownStyles.paragraph}>{children}</p>,
  ul: ({ children }) => <ul className={markdownStyles.list}>{children}</ul>,
  li: ({ children }) => <li className={markdownStyles.listItem}>{children}</li>,
  a: ({ children, href }) => (
    <a className={markdownStyles.a} href={href as string}>
      {children}
    </a>
  ),
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{children?.toString()}</ReactMarkdown>
    </div>
  );
};
