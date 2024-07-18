import { FC, ReactNode } from 'react';
import styles from './container-details.module.css';

type ContainerDetailsProps = {
  children: ReactNode;
  title?: string;
};

export const ContainerDetails: FC<ContainerDetailsProps> = ({
  children,
  title
}) => (
  <div className={styles.container}>
    {title && (
      <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    )}
    {children}
  </div>
);
