import { ReactElement } from "react";

type HeadingProps = { title: string }

const Heading = ({ title }: HeadingProps): ReactElement => {
    return (
        <h3>{title}</h3>
      );
}
 
export default Heading;