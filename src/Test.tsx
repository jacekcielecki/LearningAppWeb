import { Counter } from "./Components/Counter";
import Heading from "./Components/Heading";
import { Section } from "./Components/Section";
import { List } from "./Components/List";

const Test = () => {
    return (
        <>
            <Heading title="This is param" />
            <Section>This is some children</Section>
            <Counter></Counter>
            <List items={["test1", "test2", "test3"]} render={(item: string) => (<span className="gold">{item}</span>)}></List>
        </>
    );
}
 
export default Test;